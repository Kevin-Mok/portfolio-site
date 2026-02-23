#!/usr/bin/env node

import path from 'node:path';
import { existsSync } from 'node:fs';
import {
  assertPdfToolsAvailable,
  formatPoints,
  measureBottomWhitespace,
} from './lib/pdf-layout-metrics.mjs';
import {
  loadResumeLayoutBaseline,
} from './lib/resume-layout-baseline.mjs';
import { resumePdfVariants } from './lib/resume-pdf-variants.mjs';

function parseArgs(argv) {
  let pdfPath = null;
  let outputJson = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--pdf') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) {
        throw new Error('Missing value for --pdf');
      }
      pdfPath = value;
      index += 1;
      continue;
    }

    if (arg === '--json') {
      outputJson = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      console.log(
        [
          'Usage:',
          '  node scripts/verify-resume-layout.mjs',
          '  node scripts/verify-resume-layout.mjs --pdf <path>',
          '  node scripts/verify-resume-layout.mjs [--json]',
        ].join('\n')
      );
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return { pdfPath, outputJson };
}

function resolveTargets(pdfPathArg) {
  if (pdfPathArg) {
    return [path.resolve(pdfPathArg)];
  }

  const outputDir = path.join(process.cwd(), 'public', 'resume');
  return resumePdfVariants.map((variant) => path.join(outputDir, variant.fileName));
}

function formatRatio(ratio) {
  return `${(ratio * 100).toFixed(4)}%`;
}

let args;
let baseline;
const CAP_SOURCE_VARIANT_ID = 'web-dev';

try {
  args = parseArgs(process.argv.slice(2));
  assertPdfToolsAvailable(['pdftotext']);
  baseline = loadResumeLayoutBaseline();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}

const targets = resolveTargets(args.pdfPath);
const outputDir = path.join(process.cwd(), 'public', 'resume');
const capSourceVariant = resumePdfVariants.find((variant) => variant.id === CAP_SOURCE_VARIANT_ID);
if (!capSourceVariant) {
  console.error(`Missing cap-source variant "${CAP_SOURCE_VARIANT_ID}" in scripts/lib/resume-pdf-variants.mjs`);
  process.exit(1);
}

const capSourcePdfPath = path.join(outputDir, capSourceVariant.fileName);
if (!existsSync(capSourcePdfPath)) {
  console.error(`Cap-source PDF does not exist: ${capSourcePdfPath}\nRun "npm run build" first.`);
  process.exit(1);
}

const capMetrics = measureBottomWhitespace(capSourcePdfPath);
const results = [];
let hasFailures = false;

for (const pdfPath of targets) {
  if (!existsSync(pdfPath)) {
    hasFailures = true;
    results.push({ pdfPath, status: 'fail', error: 'PDF file does not exist' });
    continue;
  }

  try {
    const metrics = measureBottomWhitespace(pdfPath);
    const topDeficitPts = capMetrics.topWhitespacePts - metrics.topWhitespacePts;
    const bottomDeficitPts = capMetrics.bottomWhitespacePts - metrics.bottomWhitespacePts;
    const withinTolerance =
      topDeficitPts <= baseline.tolerancePts && bottomDeficitPts <= baseline.tolerancePts;

    if (!withinTolerance) {
      hasFailures = true;
    }

    results.push({
      pdfPath,
      status: withinTolerance ? 'ok' : 'fail',
      expectedTopWhitespacePts: capMetrics.topWhitespacePts,
      expectedBottomWhitespacePts: capMetrics.bottomWhitespacePts,
      actualTopWhitespacePts: metrics.topWhitespacePts,
      actualBottomWhitespacePts: metrics.bottomWhitespacePts,
      topDeficitPts,
      bottomDeficitPts,
      tolerancePts: baseline.tolerancePts,
      pageHeightPts: metrics.pageHeightPts,
      topWhitespaceRatio: metrics.topWhitespaceRatio,
      bottomWhitespaceRatio: metrics.bottomWhitespaceRatio,
    });
  } catch (error) {
    hasFailures = true;
    const message = error instanceof Error ? error.message : String(error);
    results.push({ pdfPath, status: 'fail', error: message });
  }
}

if (args.outputJson) {
  console.log(
    JSON.stringify(
      {
        referencePdfPath: baseline.referencePdfPath,
        baselineRatio: baseline.ratio,
        tolerancePts: baseline.tolerancePts,
        capSourcePdfPath,
        topWhitespaceMinPts: capMetrics.topWhitespacePts,
        bottomWhitespaceMinPts: capMetrics.bottomWhitespacePts,
        count: results.length,
        results,
      },
      null,
      2
    )
  );
} else {
  console.log(
    `Whitespace minima source: ${capSourcePdfPath} (top=${formatPoints(
      capMetrics.topWhitespacePts
    )}, bottom=${formatPoints(capMetrics.bottomWhitespacePts)}, tolerance=${formatPoints(
      baseline.tolerancePts
    )})`
  );

  for (const result of results) {
    if (result.status === 'ok') {
      console.log(
        `OK ${path.basename(result.pdfPath)} expected=${formatPoints(
          result.expectedBottomWhitespacePts
        )} actual=${formatPoints(result.actualBottomWhitespacePts)} bottomDeficit=${formatPoints(
          result.bottomDeficitPts
        )} topDeficit=${formatPoints(result.topDeficitPts)} ratio=${formatRatio(
          result.bottomWhitespaceRatio
        )}`
      );
      continue;
    }

    console.error(`FAIL ${path.basename(result.pdfPath)}`);
    if (result.error) {
      console.error(`  - ${result.error}`);
      continue;
    }

    const topMinAllowedPts = result.expectedTopWhitespacePts - result.tolerancePts;
    const bottomMinAllowedPts = result.expectedBottomWhitespacePts - result.tolerancePts;
    console.error(
      `  - whitespace below minimum: top actual ${formatPoints(
        result.actualTopWhitespacePts
      )} (min ${formatPoints(topMinAllowedPts)}), bottom actual ${formatPoints(
        result.actualBottomWhitespacePts
      )} (min ${formatPoints(bottomMinAllowedPts)}), topDeficit ${formatPoints(
        result.topDeficitPts
      )}, bottomDeficit ${formatPoints(result.bottomDeficitPts)}`
    );
  }
}

if (hasFailures) {
  process.exit(1);
}

if (!args.outputJson) {
  console.log('All checked resume PDFs meet top/bottom whitespace minimums.');
}
