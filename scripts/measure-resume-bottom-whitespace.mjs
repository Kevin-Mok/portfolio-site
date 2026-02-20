#!/usr/bin/env node

import path from 'node:path';
import { existsSync } from 'node:fs';
import {
  assertPdfToolsAvailable,
  formatPoints,
  measureBottomWhitespace,
} from './lib/pdf-layout-metrics.mjs';
import { resumePdfVariants } from './lib/resume-pdf-variants.mjs';

function printUsage() {
  console.log(
    [
      'Usage:',
      '  node scripts/measure-resume-bottom-whitespace.mjs --pdf <path> [--json]',
      '  node scripts/measure-resume-bottom-whitespace.mjs --all-generated [--json]',
    ].join('\n')
  );
}

function parseArgs(argv) {
  let pdfPath = null;
  let measureAllGenerated = false;
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

    if (arg === '--all-generated') {
      measureAllGenerated = true;
      continue;
    }

    if (arg === '--json') {
      outputJson = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      printUsage();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if ((pdfPath ? 1 : 0) + (measureAllGenerated ? 1 : 0) !== 1) {
    throw new Error('Provide exactly one target: either --pdf <path> or --all-generated');
  }

  return {
    pdfPath,
    measureAllGenerated,
    outputJson,
  };
}

function resolveTargets(options) {
  if (options.pdfPath) {
    const resolved = path.resolve(options.pdfPath);
    return [resolved];
  }

  const outputDir = path.join(process.cwd(), 'public', 'resume');
  return resumePdfVariants.map((variant) => path.join(outputDir, variant.fileName));
}

function formatRatio(ratio) {
  return `${(ratio * 100).toFixed(4)}%`;
}

let options;
try {
  options = parseArgs(process.argv.slice(2));
  assertPdfToolsAvailable(['pdftotext']);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  printUsage();
  process.exit(1);
}

const targets = resolveTargets(options);
const results = [];
let hasFailures = false;

for (const target of targets) {
  if (!existsSync(target)) {
    hasFailures = true;
    results.push({ pdfPath: target, error: 'PDF file does not exist' });
    continue;
  }

  try {
    const metrics = measureBottomWhitespace(target);
    results.push({
      pdfPath: target,
      ...metrics,
    });
  } catch (error) {
    hasFailures = true;
    const message = error instanceof Error ? error.message : String(error);
    results.push({ pdfPath: target, error: message });
  }
}

if (options.outputJson) {
  console.log(JSON.stringify({ count: results.length, results }, null, 2));
} else {
  for (const result of results) {
    if (result.error) {
      console.error(`FAIL ${result.pdfPath}`);
      console.error(`  - ${result.error}`);
      continue;
    }

    console.log(`OK ${result.pdfPath}`);
    console.log(`  - pageHeight: ${formatPoints(result.pageHeightPts)}`);
    console.log(`  - lastContentY: ${formatPoints(result.lastContentYMaxPts)}`);
    console.log(`  - bottomWhitespace: ${formatPoints(result.bottomWhitespacePts)}`);
    console.log(`  - bottomWhitespaceRatio: ${formatRatio(result.bottomWhitespaceRatio)}`);
  }
}

if (hasFailures) {
  process.exit(1);
}
