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
  loadResumeLayoutBaseline,
} from './lib/resume-layout-baseline.mjs';
import { resumePdfFileNames, resumePdfVariants } from './lib/resume-pdf-variants.mjs';

const allowedFontFamilies = new Set(['CMUSerif']);
const expectedBoldFamilyPrefix = 'CMUSerif';
const pdfDir = path.join(process.cwd(), 'public', 'resume');
const CAP_SOURCE_VARIANT_ID = 'web-dev';

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
let capMetrics;

try {
  assertPdfToolsAvailable(['pdfinfo', 'pdffonts', 'pdftotext']);
  validateGeneratedPdfsExist();
  baseline = loadResumeLayoutBaseline();

  const capSourceVariant = resumePdfVariants.find((variant) => variant.id === CAP_SOURCE_VARIANT_ID);
  if (!capSourceVariant) {
    throw new Error(
      `Missing cap-source variant "${CAP_SOURCE_VARIANT_ID}" in scripts/lib/resume-pdf-variants.mjs.`
    );
  }

  const capSourcePdfPath = path.join(pdfDir, capSourceVariant.fileName);
  if (!existsSync(capSourcePdfPath)) {
    throw new Error(
      `Cap-source PDF missing at ${capSourcePdfPath}\nRun "npm run build" before validation.`
    );
  }

  capMetrics = {
    ...measureBottomWhitespace(capSourcePdfPath),
    sourcePdfPath: capSourcePdfPath,
  };
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

    const topDeficitPts = capMetrics.topWhitespacePts - whitespace.topWhitespacePts;
    const bottomDeficitPts = capMetrics.bottomWhitespacePts - whitespace.bottomWhitespacePts;
    const failsWhitespaceMinimums =
      topDeficitPts > baseline.tolerancePts || bottomDeficitPts > baseline.tolerancePts;
    if (failsWhitespaceMinimums) {
      const topMinAllowedPts = capMetrics.topWhitespacePts - baseline.tolerancePts;
      const bottomMinAllowedPts = capMetrics.bottomWhitespacePts - baseline.tolerancePts;
      failures.push(
        [
          `whitespace below minimum`,
          `expectedTopMin=${formatPoints(topMinAllowedPts)}`,
          `expectedBottomMin=${formatPoints(bottomMinAllowedPts)}`,
          `actualTop=${formatPoints(whitespace.topWhitespacePts)}`,
          `actualBottom=${formatPoints(whitespace.bottomWhitespacePts)}`,
          `topDeficit=${formatPoints(topDeficitPts)}`,
          `bottomDeficit=${formatPoints(bottomDeficitPts)}`,
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
        `topWhitespace=${formatPoints(whitespace.topWhitespacePts)}`,
        `bottomWhitespace=${formatPoints(whitespace.bottomWhitespacePts)}`,
        `targetTopMin=${formatPoints(capMetrics.topWhitespacePts)}`,
        `targetBottomMin=${formatPoints(capMetrics.bottomWhitespacePts)}`,
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
    `Whitespace minima source: ${capMetrics.sourcePdfPath}`,
    `Top min=${formatPoints(capMetrics.topWhitespacePts)} Bottom min=${formatPoints(
      capMetrics.bottomWhitespacePts
    )} tolerance=${formatPoints(baseline.tolerancePts)}`,
  ].join(' ')
);
