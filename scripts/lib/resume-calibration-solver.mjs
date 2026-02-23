const SCALE_MIN = 0.9;
const SCALE_MAX = 1.35;
const LEADING_MIN = 0.9;
const LEADING_MAX = 1.2;
const TOP_OFFSET_MIN = -12;
const TOP_OFFSET_MAX = 28;

export const CALIBRATION_LIMITS = Object.freeze({
  scaleMin: SCALE_MIN,
  scaleMax: SCALE_MAX,
  leadingMin: LEADING_MIN,
  leadingMax: LEADING_MAX,
  topOffsetMin: TOP_OFFSET_MIN,
  topOffsetMax: TOP_OFFSET_MAX,
});

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function midpoint(a, b) {
  return (a + b) / 2;
}

function toFixedNumber(value) {
  return Number(value.toFixed(6));
}

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

function cloneSettings(settings) {
  return {
    scale: settings.scale,
    leading: settings.leading,
    topOffsetPts: settings.topOffsetPts,
  };
}

function cloneMeasurement(measurement) {
  return {
    pages: measurement.pages,
    expectedPts: measurement.expectedPts,
    actualPts: measurement.actualPts,
    deltaPts: measurement.deltaPts,
    pageHeightPts: measurement.pageHeightPts,
    pass: measurement.pass,
  };
}

function nearlyEqual(a, b, epsilon) {
  return Math.abs(a - b) <= epsilon;
}

function settingsEqual(a, b) {
  return (
    nearlyEqual(a.scale, b.scale, 0.0005) &&
    nearlyEqual(a.leading, b.leading, 0.0005) &&
    nearlyEqual(a.topOffsetPts, b.topOffsetPts, 0.05)
  );
}

function withClampedSettings(settings) {
  return {
    scale: clamp(settings.scale, SCALE_MIN, SCALE_MAX),
    leading: clamp(settings.leading, LEADING_MIN, LEADING_MAX),
    topOffsetPts: clamp(settings.topOffsetPts, TOP_OFFSET_MIN, TOP_OFFSET_MAX),
  };
}

function pagePenalty(pages) {
  if (pages === 1) {
    return 0;
  }
  return 1000 + Math.abs(pages - 1) * 250;
}

function updateBracket(state, observation) {
  if (observation.measurement.pages !== 1) {
    return;
  }

  const delta = observation.measurement.deltaPts;
  if (!isFiniteNumber(delta) || Math.abs(delta) < 0.0001) {
    return;
  }

  if (delta < 0) {
    if (
      !state.bracket.negative ||
      Math.abs(delta) < Math.abs(state.bracket.negative.measurement.deltaPts)
    ) {
      state.bracket.negative = observation;
    }
    return;
  }

  if (
    !state.bracket.positive ||
    Math.abs(delta) < Math.abs(state.bracket.positive.measurement.deltaPts)
  ) {
    state.bracket.positive = observation;
  }
}

function topOffsetStep(absDelta, nonImprovingSteps) {
  const scaled =
    absDelta > 7
      ? clamp(absDelta * 0.2, 0.8, 2.8)
      : clamp(absDelta * 0.55, 0.25, 1.8);

  if (nonImprovingSteps < 2) {
    return scaled;
  }

  return clamp(scaled * 1.25, 0.25, 3.2);
}

function midpointFromBracket(state) {
  const negative = state.bracket.negative;
  const positive = state.bracket.positive;

  if (!negative || !positive) {
    return null;
  }

  return midpoint(negative.settings.topOffsetPts, positive.settings.topOffsetPts);
}

export function scoreMeasurement(measurement, tolerancePts) {
  const delta = Math.abs(measurement.deltaPts);
  const overflow = Math.max(0, delta - tolerancePts);
  return pagePenalty(measurement.pages) + delta + overflow * 5;
}

export function createVariantSolverState() {
  return {
    previousObservation: null,
    lastObservation: null,
    bestObservation: null,
    bracket: {
      negative: null,
      positive: null,
    },
    nonImprovingSteps: 0,
  };
}

export function registerObservation(state, { measurement, settings, tolerancePts, iteration }) {
  const observation = {
    iteration,
    measurement: cloneMeasurement(measurement),
    settings: cloneSettings(settings),
    score: scoreMeasurement(measurement, tolerancePts),
  };

  state.previousObservation = state.lastObservation;
  state.lastObservation = observation;

  if (!state.bestObservation || observation.score < state.bestObservation.score) {
    state.bestObservation = observation;
  }

  if (state.previousObservation) {
    const improvedBy = state.previousObservation.score - observation.score;
    if (improvedBy < 0.2) {
      state.nonImprovingSteps += 1;
    } else {
      state.nonImprovingSteps = 0;
    }
  } else {
    state.nonImprovingSteps = 0;
  }

  updateBracket(state, observation);
}

export function computeNextSettings({
  state,
  currentSettings,
  measurement,
  tolerancePts,
}) {
  if (measurement.pages === 1 && Math.abs(measurement.deltaPts) <= tolerancePts) {
    return {
      ...withClampedSettings(currentSettings),
      strategy: 'already-within-tolerance',
    };
  }

  const previous = state.previousObservation;
  let next = cloneSettings(currentSettings);
  const strategyParts = [];

  if (measurement.pages > 1) {
    if (previous && previous.measurement.pages === 1) {
      next.scale = midpoint(currentSettings.scale, previous.settings.scale);
      next.leading = midpoint(currentSettings.leading, previous.settings.leading);
      next.topOffsetPts =
        midpoint(currentSettings.topOffsetPts, previous.settings.topOffsetPts) - 0.4;
      strategyParts.push('page-boundary-midpoint');
    } else {
      const shrinkFactor = state.nonImprovingSteps >= 2 ? 0.988 : 0.992;
      next.scale = currentSettings.scale * shrinkFactor;
      next.leading = currentSettings.leading * 0.996;
      const overflowStep = clamp(Math.abs(measurement.deltaPts) * 0.05 + 0.65, 0.6, 2.4);
      next.topOffsetPts = currentSettings.topOffsetPts - overflowStep;
      strategyParts.push('page-fit-contraction');
    }

    if (state.bestObservation && state.bestObservation.measurement.pages === 1) {
      next.scale = midpoint(next.scale, state.bestObservation.settings.scale);
      next.leading = midpoint(next.leading, state.bestObservation.settings.leading);
      next.topOffsetPts = midpoint(next.topOffsetPts, state.bestObservation.settings.topOffsetPts);
      strategyParts.push('bias-best-single-page');
    }
  } else {
    const delta = measurement.deltaPts;
    const absDelta = Math.abs(delta);
    const midpointTopOffset = midpointFromBracket(state);
    let usedBracketStrategy = false;

    if (midpointTopOffset !== null) {
      next.topOffsetPts = midpointTopOffset;
      strategyParts.push('top-offset-bracket-midpoint');
      usedBracketStrategy = true;

      if (Math.abs(midpointTopOffset - currentSettings.topOffsetPts) < 0.05) {
        const nudgeStep = clamp(topOffsetStep(absDelta, state.nonImprovingSteps) * 0.35, 0.15, 0.8);
        next.topOffsetPts =
          delta > 0
            ? currentSettings.topOffsetPts + nudgeStep
            : currentSettings.topOffsetPts - nudgeStep;
        strategyParts.push('top-offset-bracket-nudge');
      }
    } else {
      const step = topOffsetStep(absDelta, state.nonImprovingSteps);
      next.topOffsetPts =
        delta > 0
          ? currentSettings.topOffsetPts + step
          : currentSettings.topOffsetPts - step;
      strategyParts.push('top-offset-step');

      if (
        previous &&
        previous.measurement.pages === 1 &&
        Math.sign(previous.measurement.deltaPts) !== Math.sign(delta) &&
        Math.sign(previous.measurement.deltaPts) !== 0 &&
        Math.sign(delta) !== 0
      ) {
        next.topOffsetPts = midpoint(currentSettings.topOffsetPts, previous.settings.topOffsetPts);
        strategyParts.push('sign-cross-midpoint');
      }
    }

    if (usedBracketStrategy) {
      // Keep scale/leading fixed while refining a one-page bracket.
      next.scale = currentSettings.scale;
      next.leading = currentSettings.leading;
    }

    const atTopOffsetMax = next.topOffsetPts >= TOP_OFFSET_MAX - 0.001;
    const atTopOffsetMin = next.topOffsetPts <= TOP_OFFSET_MIN + 0.001;
    if ((delta > 0 && atTopOffsetMax) || (delta < 0 && atTopOffsetMin)) {
      const ratio = clamp(absDelta * 0.0025, 0.002, 0.012);
      const direction = delta > 0 ? 1 : -1;
      next.scale = currentSettings.scale * (1 + ratio * direction);
      next.leading = currentSettings.leading * (1 + ratio * 0.5 * direction);
      strategyParts.push('boundary-density-step');
    }
  }

  const clamped = withClampedSettings(next);
  if (settingsEqual(clamped, currentSettings)) {
    const nudge =
      measurement.pages > 1
        ? -0.3
        : measurement.deltaPts > 0
          ? 0.2
          : -0.2;
    clamped.topOffsetPts = clamp(
      clamped.topOffsetPts + nudge,
      TOP_OFFSET_MIN,
      TOP_OFFSET_MAX
    );
    strategyParts.push('safety-nudge');
  }

  return {
    scale: toFixedNumber(clamped.scale),
    leading: toFixedNumber(clamped.leading),
    topOffsetPts: toFixedNumber(clamped.topOffsetPts),
    strategy: strategyParts.join('+'),
  };
}
