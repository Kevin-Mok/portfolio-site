#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  measureBottomWhitespace,
  parsePdfInfo,
  runPdfCommand,
} from './lib/pdf-layout-metrics.mjs';
import {
  expectedWhitespacePointsForPageHeight,
  loadResumeLayoutBaseline,
} from './lib/resume-layout-baseline.mjs';
import { resumePdfVariants } from './lib/resume-pdf-variants.mjs';

const cssPath = path.join(process.cwd(), 'app', 'styles', '13-resume-latex.css');
const pdfDir = path.join(process.cwd(), 'public', 'resume');

function formatPoints(value) {
  return `${value.toFixed(3)}pt`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value) {
  return Number(value.toFixed(3)).toString();
}

function parseArgs(argv) {
  let maxIterations = 8;
  let skipBuildFirst = false;
  let dryRun = false;
  let noBuild = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--max-iterations') {
      const value = Number(argv[index + 1]);
      if (!Number.isInteger(value) || value <= 0) {
        throw new Error('Expected a positive integer after --max-iterations');
      }
      maxIterations = value;
      index += 1;
      continue;
    }

    if (arg === '--skip-build-first') {
      skipBuildFirst = true;
      continue;
    }

    if (arg === '--dry-run') {
      dryRun = true;
      continue;
    }

    if (arg === '--no-build') {
      noBuild = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      console.log(
        [
          'Usage:',
          '  node scripts/calibrate-resume-layout.mjs [--max-iterations <n>] [--skip-build-first] [--dry-run] [--no-build]',
          '',
          'What it does:',
          '  1) Build + regenerate resume PDFs',
          '  2) Measure each resume PDF against legacy baseline',
          '  3) Update per-variant print variables in app/styles/13-resume-latex.css',
          '  4) Repeat until all variants pass or max iterations reached',
          '',
          'Defaults:',
          '  - max iterations: 8',
          '  - build each iteration after CSS updates',
          '',
          'Flags:',
          '  --skip-build-first   Use existing generated PDFs for iteration 1',
          '  --dry-run            Measure and report without writing CSS',
          '  --no-build           Never run build; useful only when PDFs are already generated',
        ].join('\n')
      );
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    maxIterations,
    skipBuildFirst,
    dryRun,
    noBuild,
  };
}

function sleepMs(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // Busy wait is acceptable here because calibration is an explicit CLI workflow.
  }
}

function runCommand(command, args, env, label) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    env,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (result.error) {
    throw new Error(`${label} failed to start: ${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`${label} failed with exit code ${result.status ?? 'unknown'}`);
  }
}

function buildFailureHint(message) {
  if (/listen EPERM|operation not permitted/i.test(message)) {
    return (
      '\nHint: build-time PDF generation starts a local server. ' +
      'Ensure this command can bind localhost ports in your environment.'
    );
  }

  if (/No Chrome\/Chromium executable found/i.test(message)) {
    return (
      '\nHint: install Chrome/Chromium or set CHROME_BIN to a valid executable path.'
    );
  }

  return '';
}

function runNpmBuild() {
  const attempts = 2;
  let lastErrorMessage = '';

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    // Avoid intermittent port collisions with other local processes.
    const dynamicPort = String(3300 + Math.floor(Math.random() * 1200));
    const env = {
      ...process.env,
      RESUME_PDF_PORT: dynamicPort,
    };

    try {
      runCommand('npm', ['run', 'build'], env, `npm run build (RESUME_PDF_PORT=${dynamicPort})`);
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      lastErrorMessage = message;
    }

    if (attempt < attempts) {
      console.warn(
        `[calibrate] Build attempt ${attempt} failed. Retrying once...`
      );
      sleepMs(1500);
      continue;
    }
  }

  throw new Error(`npm run build failed after ${attempts} attempts.${buildFailureHint(lastErrorMessage)}`);
}

/**
 * Locate a CSS class block and return its offsets.
 *
 * This parser only needs to handle flat CSS blocks used in this stylesheet.
 */
function findClassBlock(cssText, className) {
  const classIndex = cssText.indexOf(className);
  if (classIndex === -1) {
    throw new Error(`Missing CSS class block: ${className}`);
  }

  const braceStart = cssText.indexOf('{', classIndex);
  if (braceStart === -1) {
    throw new Error(`Malformed CSS block for ${className}: missing "{"`);
  }

  let depth = 0;
  for (let index = braceStart; index < cssText.length; index += 1) {
    const char = cssText[index];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return {
          start: classIndex,
          end: index + 1,
          block: cssText.slice(classIndex, index + 1),
        };
      }
    }
  }

  throw new Error(`Malformed CSS block for ${className}: missing closing "}"`);
}

function parseCssVariable(blockText, variableName, unit = '') {
  const escaped = variableName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = unit
    ? new RegExp(`${escaped}\\s*:\\s*(-?[0-9.]+)${unit}\\s*;`)
    : new RegExp(`${escaped}\\s*:\\s*(-?[0-9.]+)\\s*;`);
  const match = blockText.match(pattern);
  if (!match) {
    return null;
  }

  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function setCssVariable(blockText, variableName, value, unit = '') {
  const escaped = variableName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const valueText = unit ? `${formatNumber(value)}${unit}` : formatNumber(value);
  const pattern = unit
    ? new RegExp(`(${escaped}\\s*:\\s*)(-?[0-9.]+)${unit}(\\s*;)`)
    : new RegExp(`(${escaped}\\s*:\\s*)(-?[0-9.]+)(\\s*;)`);

  if (pattern.test(blockText)) {
    return blockText.replace(pattern, `$1${valueText}$3`);
  }

  const insertion = `  ${variableName}: ${valueText};\n`;
  return blockText.replace(/\}\s*$/, `${insertion}}`);
}

function readVariantPrintSettings(cssText, variantId) {
  const className = `.resume-variant-${variantId}`;
  const block = findClassBlock(cssText, className);

  const scale = parseCssVariable(block.block, '--resume-print-scale');
  const leading =
    parseCssVariable(block.block, '--resume-print-leading') ?? 1;
  const topOffsetPts =
    parseCssVariable(block.block, '--resume-print-top-offset', 'pt') ?? 0;

  if (!Number.isFinite(scale)) {
    throw new Error(`Missing --resume-print-scale for ${className}`);
  }

  return {
    className,
    start: block.start,
    end: block.end,
    block: block.block,
    scale,
    leading,
    topOffsetPts,
  };
}

function writeVariantPrintSettings(cssText, variantId, nextSettings) {
  const current = readVariantPrintSettings(cssText, variantId);
  let nextBlock = current.block;
  nextBlock = setCssVariable(nextBlock, '--resume-print-scale', nextSettings.scale);
  nextBlock = setCssVariable(nextBlock, '--resume-print-leading', nextSettings.leading);
  nextBlock = setCssVariable(nextBlock, '--resume-print-top-offset', nextSettings.topOffsetPts, 'pt');

  return (
    cssText.slice(0, current.start) +
    nextBlock +
    cssText.slice(current.end)
  );
}

function measureVariant(variant, baselineRatio, tolerancePts) {
  const pdfPath = path.join(pdfDir, variant.fileName);
  const pdfInfo = parsePdfInfo(runPdfCommand('pdfinfo', [pdfPath]));
  const layout = measureBottomWhitespace(pdfPath);

  const expectedPts = expectedWhitespacePointsForPageHeight(
    layout.pageHeightPts,
    baselineRatio
  );
  const deltaPts = layout.bottomWhitespacePts - expectedPts;

  return {
    id: variant.id,
    fileName: variant.fileName,
    pdfPath,
    pages: pdfInfo.pages ?? 0,
    expectedPts,
    actualPts: layout.bottomWhitespacePts,
    deltaPts,
    pageHeightPts: layout.pageHeightPts,
    pass: pdfInfo.pages === 1 && Math.abs(deltaPts) <= tolerancePts,
  };
}

/**
 * Compute next print settings from current measurements.
 *
 * Strategy:
 * - If a variant spills to multiple pages, shrink scale and reduce top offset.
 * - If a variant is 1-page but outside tolerance:
 *   - For moderate error, adjust top offset in points for fast convergence.
 *   - For large error, adjust scale using content-height ratio.
 */
function computeNextSettings(
  currentSettings,
  measurement,
  tolerancePts,
  previousObservation
) {
  if (previousObservation) {
    const previousScale = previousObservation.settings.scale;
    const previousLeading = previousObservation.settings.leading;
    const previousTopOffset = previousObservation.settings.topOffsetPts;
    const previousDelta = previousObservation.measurement.deltaPts;
    const previousPages = previousObservation.measurement.pages;

    const scaleChanged = Math.abs(currentSettings.scale - previousScale) > 0.0005;
    const leadingChanged = Math.abs(currentSettings.leading - previousLeading) > 0.0005;
    const topOffsetChanged =
      Math.abs(currentSettings.topOffsetPts - previousTopOffset) > 0.05;

    const crossedDeltaSign =
      previousPages === 1 &&
      measurement.pages === 1 &&
      Math.sign(previousDelta) !== Math.sign(measurement.deltaPts);
    const crossedPageBoundary = previousPages !== measurement.pages;

    if (
      (crossedDeltaSign || crossedPageBoundary) &&
      (scaleChanged || leadingChanged || topOffsetChanged)
    ) {
      const midpointScale = scaleChanged
        ? (currentSettings.scale + previousScale) / 2
        : currentSettings.scale;
      const midpointLeading = leadingChanged
        ? (currentSettings.leading + previousLeading) / 2
        : currentSettings.leading;
      const midpointTopOffset = topOffsetChanged
        ? (currentSettings.topOffsetPts + previousTopOffset) / 2
        : currentSettings.topOffsetPts;

      return {
        scale: clamp(midpointScale, 0.9, 1.35),
        leading: clamp(midpointLeading, 0.9, 1.2),
        topOffsetPts: clamp(midpointTopOffset, -12, 28),
        strategy: 'midpoint-bracket',
      };
    }
  }

  let nextScale = currentSettings.scale;
  let nextLeading = currentSettings.leading;
  let nextTopOffset = currentSettings.topOffsetPts;

  if (measurement.pages > 1) {
    // Multi-page is a hard failure; contract text density and trim top offset.
    nextScale = currentSettings.scale * 0.97;
    nextLeading = currentSettings.leading * 0.99;
    nextTopOffset = currentSettings.topOffsetPts - 1.5;
  } else {
    const delta = measurement.deltaPts;
    const absDelta = Math.abs(delta);

    if (absDelta > tolerancePts) {
      const currentContentHeight = measurement.pageHeightPts - measurement.actualPts;
      const targetContentHeight = measurement.pageHeightPts - measurement.expectedPts;
      const ratio = targetContentHeight / currentContentHeight;

      // Split correction across scale + leading to avoid harsh wrap threshold jumps.
      const dampedScaleRatio = 1 + (ratio - 1) * 0.65;
      const dampedLeadingRatio = 1 + (ratio - 1) * 0.35;
      nextScale = currentSettings.scale * dampedScaleRatio;
      nextLeading = currentSettings.leading * dampedLeadingRatio;

      const offsetStep =
        absDelta <= 3
          ? clamp(absDelta * 0.6, 0.25, 1.5)
          : clamp(absDelta * 0.08, 0.15, 1.2);
      nextTopOffset =
        delta > 0
          ? currentSettings.topOffsetPts + offsetStep
          : currentSettings.topOffsetPts - offsetStep;
    }
  }

  return {
    scale: clamp(nextScale, 0.9, 1.35),
    leading: clamp(nextLeading, 0.9, 1.2),
    topOffsetPts: clamp(nextTopOffset, -12, 28),
    strategy: 'gradient-step',
  };
}

function printIterationReport(iteration, results) {
  console.log(`\n[calibrate] Iteration ${iteration}`);
  for (const result of results) {
    const status = result.pass ? 'OK ' : 'FAIL';
    console.log(
      `${status} ${result.fileName} pages=${result.pages} expected=${formatPoints(
        result.expectedPts
      )} actual=${formatPoints(result.actualPts)} delta=${formatPoints(result.deltaPts)}`
    );
  }
}

const options = parseArgs(process.argv.slice(2));
const baseline = loadResumeLayoutBaseline();
const previousByVariant = new Map();

if ((options.noBuild || options.dryRun) && options.maxIterations > 1) {
  console.warn(
    '[calibrate] max-iterations > 1 requested without rebuild/write progression. Using single-pass mode.'
  );
  options.maxIterations = 1;
}

for (let iteration = 1; iteration <= options.maxIterations; iteration += 1) {
  const shouldBuild =
    !options.noBuild &&
    !options.dryRun &&
    (!options.skipBuildFirst || iteration > 1);
  if (shouldBuild) {
    console.log(`\n[calibrate] Running build (iteration ${iteration})...`);
    runNpmBuild();
  }

  const cssBefore = readFileSync(cssPath, 'utf8');
  const measurements = resumePdfVariants.map((variant) =>
    measureVariant(variant, baseline.ratio, baseline.tolerancePts)
  );
  const settingsByVariant = new Map();
  for (const result of measurements) {
    settingsByVariant.set(result.id, readVariantPrintSettings(cssBefore, result.id));
  }

  printIterationReport(iteration, measurements);

  const failing = measurements.filter((result) => !result.pass);
  if (failing.length === 0) {
    console.log('\n[calibrate] All variants meet page-count + baseline whitespace constraints.');
    process.exit(0);
  }

  if (options.dryRun) {
    console.log('\n[calibrate] Dry run mode: no CSS updates were written.');
    process.exit(1);
  }

  if (options.noBuild) {
    console.log(
      '\n[calibrate] --no-build mode: stopping after one measurement pass with existing PDFs.'
    );
    process.exit(1);
  }

  let cssAfter = cssBefore;
  for (const result of failing) {
    const currentSettings = settingsByVariant.get(result.id);
    if (!currentSettings) {
      throw new Error(`Missing settings snapshot for variant "${result.id}"`);
    }

    const previousObservation = previousByVariant.get(result.id);
    const nextSettings = computeNextSettings(
      currentSettings,
      result,
      baseline.tolerancePts,
      previousObservation
    );

    cssAfter = writeVariantPrintSettings(cssAfter, result.id, nextSettings);

    const strategySuffix = nextSettings.strategy ? ` [${nextSettings.strategy}]` : '';
    console.log(
      `[calibrate] ${result.id}: scale ${formatNumber(currentSettings.scale)} -> ${formatNumber(
        nextSettings.scale
      )}, leading ${formatNumber(currentSettings.leading)} -> ${formatNumber(
        nextSettings.leading
      )}, top-offset ${formatNumber(currentSettings.topOffsetPts)}pt -> ${formatNumber(
        nextSettings.topOffsetPts
      )}pt${strategySuffix}`
    );
  }

  for (const result of measurements) {
    const settingsSnapshot = settingsByVariant.get(result.id);
    if (!settingsSnapshot) {
      continue;
    }

    previousByVariant.set(result.id, {
      measurement: {
        pages: result.pages,
        deltaPts: result.deltaPts,
      },
      settings: {
        scale: settingsSnapshot.scale,
        leading: settingsSnapshot.leading,
        topOffsetPts: settingsSnapshot.topOffsetPts,
      },
    });
  }

  if (cssAfter === cssBefore) {
    console.error('\n[calibrate] No CSS changes applied; stopping to avoid infinite loop.');
    process.exit(1);
  }

  writeFileSync(cssPath, cssAfter, 'utf8');
}

console.error(
  `\n[calibrate] Reached max iterations (${options.maxIterations}) before convergence.\nRun "npm run verify:resume-layout" to inspect remaining deltas.`
);
process.exit(1);
