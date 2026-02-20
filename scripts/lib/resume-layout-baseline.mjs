import { readFileSync } from 'node:fs';
import path from 'node:path';

const baselinePath = path.join(process.cwd(), 'docs', 'resume-layout-baseline.json');

export function loadResumeLayoutBaseline() {
  let raw;
  try {
    raw = readFileSync(baselinePath, 'utf8');
  } catch {
    throw new Error(
      `Missing baseline file at ${baselinePath}\nRun the baseline setup workflow in docs/resume-generation-spec.md.`
    );
  }

  let baseline;
  try {
    baseline = JSON.parse(raw);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to parse ${baselinePath}: ${message}`);
  }

  const ratio = baseline?.reference?.bottomWhitespaceRatio;
  const tolerancePts = baseline?.enforcement?.tolerancePts;
  const mode = baseline?.enforcement?.mode;
  const referencePdfPath = baseline?.reference?.pdfPath;

  if (!Number.isFinite(ratio) || ratio <= 0) {
    throw new Error(`Invalid baseline ratio in ${baselinePath}. Expected a positive number.`);
  }

  if (!Number.isFinite(tolerancePts) || tolerancePts < 0) {
    throw new Error(`Invalid tolerancePts in ${baselinePath}. Expected a non-negative number.`);
  }

  if (mode !== 'normalized_ratio') {
    throw new Error(
      `Unsupported enforcement mode "${String(mode)}" in ${baselinePath}. Expected "normalized_ratio".`
    );
  }

  if (typeof referencePdfPath !== 'string' || referencePdfPath.length === 0) {
    throw new Error(`Invalid reference.pdfPath in ${baselinePath}.`);
  }

  return {
    ratio,
    tolerancePts,
    mode,
    referencePdfPath,
    raw: baseline,
    baselinePath,
  };
}

export function expectedWhitespacePointsForPageHeight(pageHeightPts, baselineRatio) {
  return baselineRatio * pageHeightPts;
}
