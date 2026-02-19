#!/usr/bin/env node

import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';

const variants = [
  'kevin-mok-resume.pdf',
  'kevin-mok-resume-web-dev.pdf',
  'kevin-mok-resume-aws.pdf',
  'kevin-mok-resume-python.pdf',
  'kevin-mok-resume-aws-web-dev.pdf',
  'kevin-mok-resume-aws-python.pdf',
  'kevin-mok-resume-web-dev-django.pdf',
  'kevin-mok-resume-it-support.pdf',
  'kevin-mok-resume-it-support-aws.pdf',
  'kevin-mok-resume-sales.pdf',
  'kevin-mok-resume-call-centre.pdf',
];

const minBottomWhitespaceRatio = 0.02;
const maxBottomWhitespaceRatio = 0.09;
const allowedFontFamilies = new Set(['CMUSerif']);
const pdfDir = path.join(process.cwd(), 'public', 'resume');
const requiredTools = ['pdfinfo', 'pdffonts', 'pdftohtml'];

function commandExists(command) {
  const result = spawnSync(command, ['--version'], { stdio: 'ignore' });
  if (result.error) {
    return false;
  }

  return true;
}

function validateDependencies() {
  const missingTools = requiredTools.filter((tool) => !commandExists(tool));
  if (missingTools.length === 0) {
    return;
  }

  throw new Error(
    [
      `Missing required PDF tool(s): ${missingTools.join(', ')}`,
      'Install poppler-utils and rerun validation.',
      'Ubuntu/Debian: sudo apt install -y poppler-utils',
    ].join('\n')
  );
}

function validateGeneratedPdfs() {
  const missingPdfs = variants.filter((fileName) => !existsSync(path.join(pdfDir, fileName)));
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

function run(command, args) {
  return execFileSync(command, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function parsePdfInfo(output) {
  const pagesMatch = output.match(/^Pages:\s+(\d+)$/m);
  const sizeMatch = output.match(/^Page size:\s+([^\n]+)$/m);

  return {
    pages: pagesMatch ? Number(pagesMatch[1]) : null,
    size: sizeMatch ? sizeMatch[1].trim() : null,
  };
}

function parseFontFamilies(output) {
  const families = new Set();
  const lines = output.split('\n').slice(2).map((line) => line.trim()).filter(Boolean);

  for (const line of lines) {
    const fontName = line.split(/\s+/)[0];
    if (!fontName) {
      continue;
    }

    const noSubsetPrefix = fontName.replace(/^[A-Z]+\+/, '');
    const family = noSubsetPrefix.split('-')[0];
    if (family) {
      families.add(family);
    }
  }

  return families;
}

function parseBottomWhitespaceRatio(pdfPath) {
  const tempDir = mkdtempSync(path.join(tmpdir(), 'resume-validate-'));
  const xmlPath = path.join(tempDir, `${path.basename(pdfPath)}.xml`);

  try {
    run('pdftohtml', ['-xml', '-nodrm', '-i', '-noframes', pdfPath, xmlPath]);
    const xml = readFileSync(xmlPath, 'utf8');

    const pageMatch = xml.match(/<page\b[^>]*height="(\d+)"/);
    if (!pageMatch) {
      throw new Error('Unable to read page height from pdftohtml XML output.');
    }

    const pageHeight = Number(pageMatch[1]);
    if (!Number.isFinite(pageHeight) || pageHeight <= 0) {
      throw new Error(`Invalid page height parsed from XML: ${pageMatch[1]}`);
    }

    let maxBottom = 0;
    const textTagRegex = /<text\b[^>]*>/g;
    let textTagMatch = textTagRegex.exec(xml);
    while (textTagMatch) {
      const tag = textTagMatch[0];
      const topMatch = tag.match(/\btop="(\d+)"/);
      const heightMatch = tag.match(/\bheight="(\d+)"/);
      if (topMatch && heightMatch) {
        const bottom = Number(topMatch[1]) + Number(heightMatch[1]);
        if (bottom > maxBottom) {
          maxBottom = bottom;
        }
      }
      textTagMatch = textTagRegex.exec(xml);
    }

    const whitespaceRatio = (pageHeight - maxBottom) / pageHeight;
    return {
      pageHeight,
      maxBottom,
      whitespaceRatio,
    };
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

function formatPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

let hasFailures = false;

try {
  validateDependencies();
  validateGeneratedPdfs();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}

for (const fileName of variants) {
  const pdfPath = path.join(pdfDir, fileName);
  const failures = [];

  try {
    const pdfInfo = parsePdfInfo(run('pdfinfo', [pdfPath]));
    const fontFamilies = parseFontFamilies(run('pdffonts', [pdfPath]));
    const whitespace = parseBottomWhitespaceRatio(pdfPath);

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

    if (whitespace.whitespaceRatio < minBottomWhitespaceRatio) {
      failures.push(
        `bottom whitespace too small (${formatPercent(whitespace.whitespaceRatio)} < ${formatPercent(minBottomWhitespaceRatio)})`
      );
    }

    if (whitespace.whitespaceRatio > maxBottomWhitespaceRatio) {
      failures.push(
        `bottom whitespace too large (${formatPercent(whitespace.whitespaceRatio)} > ${formatPercent(maxBottomWhitespaceRatio)})`
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
      `OK ${fileName} pages=1 size=Letter fonts=${[...fontFamilies].join(',')} bottomWhitespace=${formatPercent(whitespace.whitespaceRatio)}`
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

console.log('All resume PDFs passed validation.');
