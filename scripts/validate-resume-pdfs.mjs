#!/usr/bin/env node

import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  assertPdfToolsAvailable,
  extractFontFamilies,
  formatPoints,
  hasBoldFont,
  measureBottomWhitespace,
  parsePdfFonts,
  parsePdfInfo,
  runPdfCommand,
} from './lib/pdf-layout-metrics.mjs';
import {
  expectedWhitespacePointsForPageHeight,
  loadResumeLayoutBaseline,
} from './lib/resume-layout-baseline.mjs';
import { resumePdfFileNames } from './lib/resume-pdf-variants.mjs';

const allowedFontFamilies = new Set(['CMUSerif']);
const expectedBoldFamilyPrefix = 'CMUSerif';
const pdfDir = path.join(process.cwd(), 'public', 'resume');

function formatPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function validateGeneratedPdfsExist() {
  const missingPdfs = resumePdfFileNames.filter((fileName) =>
    !existsSync(path.join(pdfDir, fileName))
  );

  if (missingPdfs.length === 0) {
    return;
  }

  throw new Error(
    [
      `Missing generated resume PDF(s): ${missingPdfs.join(', ')}`,
      'Run "npm run build" (or "npm run generate-resume-pdfs") before validation.',
    ].join('\n')
  );
}

let baseline;

try {
  assertPdfToolsAvailable(['pdfinfo', 'pdffonts', 'pdftotext']);
  validateGeneratedPdfsExist();
  baseline = loadResumeLayoutBaseline();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}

let hasFailures = false;

for (const fileName of resumePdfFileNames) {
  const pdfPath = path.join(pdfDir, fileName);
  const failures = [];

  try {
    const pdfInfo = parsePdfInfo(runPdfCommand('pdfinfo', [pdfPath]));
    const fonts = parsePdfFonts(runPdfCommand('pdffonts', [pdfPath]));
    const fontFamilies = extractFontFamilies(fonts);
    const whitespace = measureBottomWhitespace(pdfPath);

    if (pdfInfo.pages !== 1) {
      failures.push(`expected exactly 1 page, got ${pdfInfo.pages ?? 'unknown'}`);
    }

    if (!pdfInfo.size || !pdfInfo.size.toLowerCase().includes('(letter)')) {
      failures.push(`expected US Letter page size, got "${pdfInfo.size ?? 'unknown'}"`);
    }

    const disallowedFamilies = [...fontFamilies].filter(
      (family) => !allowedFontFamilies.has(family)
    );
    if (disallowedFamilies.length > 0) {
      failures.push(`unexpected font families: ${disallowedFamilies.join(', ')}`);
    }

    if (!hasBoldFont(fonts, expectedBoldFamilyPrefix)) {
      failures.push('missing bold font face (expected CMUSerif-Bold subset)');
    }

    const expectedWhitespacePts = expectedWhitespacePointsForPageHeight(
      whitespace.pageHeightPts,
      baseline.ratio
    );
    const deltaPts = whitespace.bottomWhitespacePts - expectedWhitespacePts;
    if (Math.abs(deltaPts) > baseline.tolerancePts) {
      failures.push(
        [
          `bottom whitespace mismatch`,
          `expected=${formatPoints(expectedWhitespacePts)}`,
          `actual=${formatPoints(whitespace.bottomWhitespacePts)}`,
          `delta=${formatPoints(deltaPts)}`,
          `tolerance=${formatPoints(baseline.tolerancePts)}`,
        ].join(' ')
      );
    }

    if (failures.length > 0) {
      hasFailures = true;
      console.error(`FAIL ${fileName}`);
      for (const failure of failures) {
        console.error(`  - ${failure}`);
      }
      continue;
    }

    console.log(
      [
        `OK ${fileName}`,
        'pages=1',
        'size=Letter',
        `fonts=${[...fontFamilies].join(',')}`,
        `bottomWhitespace=${formatPoints(whitespace.bottomWhitespacePts)}`,
        `target=${formatPoints(expectedWhitespacePts)}`,
        `ratio=${formatPercent(whitespace.bottomWhitespaceRatio)}`,
      ].join(' ')
    );
  } catch (error) {
    hasFailures = true;
    const message = error instanceof Error ? error.message : String(error);
    console.error(`FAIL ${fileName}`);
    console.error(`  - validator error: ${message}`);
  }
}

if (hasFailures) {
  process.exit(1);
}

console.log(
  [
    'All resume PDFs passed validation.',
    `Baseline source: ${baseline.referencePdfPath}`,
    `Bottom-whitespace lock: ratio=${formatPercent(baseline.ratio)} tolerance=${formatPoints(
      baseline.tolerancePts
    )}`,
  ].join(' ')
);
