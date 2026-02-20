import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';

export const pdfDependencyTools = ['pdfinfo', 'pdffonts', 'pdftotext'];

export function commandExists(command) {
  const result = spawnSync(command, ['--version'], { stdio: 'ignore' });
  return !result.error;
}

export function assertPdfToolsAvailable(tools = pdfDependencyTools) {
  const missingTools = tools.filter((tool) => !commandExists(tool));
  if (missingTools.length === 0) {
    return;
  }

  throw new Error(
    [
      `Missing required PDF tool(s): ${missingTools.join(', ')}`,
      'Install poppler-utils and rerun.',
      'Ubuntu/Debian: sudo apt install -y poppler-utils',
    ].join('\n')
  );
}

export function runPdfCommand(command, args) {
  return execFileSync(command, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

export function parsePdfInfo(output) {
  const pagesMatch = output.match(/^Pages:\s+(\d+)$/m);
  const sizeMatch = output.match(/^Page size:\s+([^\n]+)$/m);

  return {
    pages: pagesMatch ? Number(pagesMatch[1]) : null,
    size: sizeMatch ? sizeMatch[1].trim() : null,
  };
}

export function parsePdfFonts(output) {
  const lines = output
    .split('\n')
    .slice(2)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines
    .map((line) => {
      const fields = line.split(/\s+/);
      if (fields.length < 7) {
        return null;
      }

      const [name, type, encoding, emb, sub, uni, objectId] = fields;
      return { name, type, encoding, emb, sub, uni, objectId };
    })
    .filter(Boolean);
}

export function extractFontFamilies(fonts) {
  const families = new Set();

  for (const font of fonts) {
    const noSubsetPrefix = font.name.replace(/^[A-Z]+\+/, '');
    const family = noSubsetPrefix.split('-')[0];
    if (family) {
      families.add(family);
    }
  }

  return families;
}

export function hasBoldFont(fonts, expectedFamilyPrefix) {
  return fonts.some((font) => {
    const noSubsetPrefix = font.name.replace(/^[A-Z]+\+/, '');
    return (
      noSubsetPrefix.startsWith(expectedFamilyPrefix) &&
      /bold/i.test(noSubsetPrefix)
    );
  });
}

/**
 * Measure bottom whitespace for the first page in a PDF.
 *
 * The metric uses `pdftotext -bbox-layout` and reads the maximum `yMax`
 * across all <word> entries. Bottom whitespace is the distance (in points)
 * from that final rendered word box to the page bottom.
 */
export function measureBottomWhitespace(pdfPath) {
  const tempDir = mkdtempSync(path.join(tmpdir(), 'resume-layout-'));
  const xmlPath = path.join(tempDir, `${path.basename(pdfPath)}.xml`);

  try {
    runPdfCommand('pdftotext', ['-bbox-layout', pdfPath, xmlPath]);
    const xml = readFileSync(xmlPath, 'utf8');

    const pageMatch = xml.match(/<page\s+width="([0-9.]+)"\s+height="([0-9.]+)"/);
    if (!pageMatch) {
      throw new Error('Unable to parse page dimensions from pdftotext XML output.');
    }

    const pageWidthPts = Number(pageMatch[1]);
    const pageHeightPts = Number(pageMatch[2]);
    if (!Number.isFinite(pageHeightPts) || pageHeightPts <= 0) {
      throw new Error(`Invalid page height parsed from XML: ${pageMatch[2]}`);
    }

    let lastContentYMaxPts = 0;
    for (const match of xml.matchAll(/<word\b[^>]*\byMax="([0-9.]+)"/g)) {
      const yMax = Number(match[1]);
      if (Number.isFinite(yMax) && yMax > lastContentYMaxPts) {
        lastContentYMaxPts = yMax;
      }
    }

    if (lastContentYMaxPts === 0) {
      throw new Error('Unable to find any word bounding boxes in pdftotext XML output.');
    }

    const bottomWhitespacePts = pageHeightPts - lastContentYMaxPts;
    const bottomWhitespaceRatio = bottomWhitespacePts / pageHeightPts;

    return {
      pageWidthPts,
      pageHeightPts,
      lastContentYMaxPts,
      bottomWhitespacePts,
      bottomWhitespaceRatio,
    };
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

export function formatPoints(value) {
  return `${value.toFixed(3)}pt`;
}
