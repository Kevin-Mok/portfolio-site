#!/usr/bin/env node

import path from 'node:path';
import { existsSync } from 'node:fs';
import {
  assertPdfToolsAvailable,
  formatPoints,
  measureBottomWhitespace,
} from './lib/pdf-layout-metrics.mjs';
import {
  expectedWhitespacePointsForPageHeight,
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
    const expectedPts = expectedWhitespacePointsForPageHeight(
      metrics.pageHeightPts,
      baseline.ratio
    );
    const deltaPts = metrics.bottomWhitespacePts - expectedPts;
    const withinTolerance = Math.abs(deltaPts) <= baseline.tolerancePts;

    if (!withinTolerance) {
      hasFailures = true;
    }

    results.push({
      pdfPath,
      status: withinTolerance ? 'ok' : 'fail',
      expectedBottomWhitespacePts: expectedPts,
      actualBottomWhitespacePts: metrics.bottomWhitespacePts,
      deltaPts,
      tolerancePts: baseline.tolerancePts,
      pageHeightPts: metrics.pageHeightPts,
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
        count: results.length,
        results,
      },
      null,
      2
    )
  );
} else {
  console.log(
    `Reference baseline: ${baseline.referencePdfPath} (ratio=${formatRatio(baseline.ratio)}, tolerance=${formatPoints(
      baseline.tolerancePts
    )})`
  );

  for (const result of results) {
    if (result.status === 'ok') {
      console.log(
        `OK ${path.basename(result.pdfPath)} expected=${formatPoints(
          result.expectedBottomWhitespacePts
        )} actual=${formatPoints(result.actualBottomWhitespacePts)} delta=${formatPoints(
          result.deltaPts
        )} ratio=${formatRatio(result.bottomWhitespaceRatio)}`
      );
      continue;
    }

    console.error(`FAIL ${path.basename(result.pdfPath)}`);
    if (result.error) {
      console.error(`  - ${result.error}`);
      continue;
    }

    console.error(
      `  - bottom whitespace mismatch: expected ${formatPoints(
        result.expectedBottomWhitespacePts
      )}, actual ${formatPoints(result.actualBottomWhitespacePts)}, delta ${formatPoints(
        result.deltaPts
      )}, tolerance ${formatPoints(result.tolerancePts)}`
    );
  }
}

if (hasFailures) {
  process.exit(1);
}

if (!args.outputJson) {
  console.log('All checked resume PDFs match the baseline bottom whitespace.');
}
