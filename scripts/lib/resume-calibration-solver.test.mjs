import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeNextSettings,
  createVariantSolverState,
  registerObservation,
} from './resume-calibration-solver.mjs';

function measurement(overrides = {}) {
  return {
    pages: 1,
    expectedPts: 29.482,
    actualPts: 40,
    deltaPts: 10.518,
    pageHeightPts: 792,
    pass: false,
    ...overrides,
  };
}

function settings(overrides = {}) {
  return {
    scale: 1.12,
    leading: 1.03,
    topOffsetPts: 20,
    ...overrides,
  };
}

test('contracts density when variant spills to multiple pages', () => {
  const state = createVariantSolverState();
  const currentSettings = settings();
  const currentMeasurement = measurement({ pages: 2, deltaPts: 24, pass: false });

  registerObservation(state, {
    measurement: currentMeasurement,
    settings: currentSettings,
    tolerancePts: 1,
    iteration: 1,
  });

  const next = computeNextSettings({
    state,
    currentSettings,
    measurement: currentMeasurement,
    tolerancePts: 1,
  });

  assert.ok(next.scale < currentSettings.scale);
  assert.ok(next.leading < currentSettings.leading);
  assert.ok(next.topOffsetPts < currentSettings.topOffsetPts);
});

test('uses bracket midpoint when one-page deltas cross signs', () => {
  const state = createVariantSolverState();
  const tolerancePts = 1;

  const negativeSettings = settings({ topOffsetPts: 18 });
  const negativeMeasurement = measurement({ deltaPts: -4, actualPts: 25 });
  registerObservation(state, {
    measurement: negativeMeasurement,
    settings: negativeSettings,
    tolerancePts,
    iteration: 1,
  });

  const positiveSettings = settings({ topOffsetPts: 20 });
  const positiveMeasurement = measurement({ deltaPts: 3.5, actualPts: 33 });
  registerObservation(state, {
    measurement: positiveMeasurement,
    settings: positiveSettings,
    tolerancePts,
    iteration: 2,
  });

  const next = computeNextSettings({
    state,
    currentSettings: positiveSettings,
    measurement: positiveMeasurement,
    tolerancePts,
  });

  assert.equal(next.topOffsetPts, 19);
  assert.ok(next.strategy.includes('top-offset-bracket-midpoint'));
});

test('retains best observation even after worse iterations', () => {
  const state = createVariantSolverState();
  const tolerancePts = 1;

  const bestSettings = settings({ topOffsetPts: 19.4 });
  const bestMeasurement = measurement({ deltaPts: 0.8, actualPts: 30.282, pass: true });
  registerObservation(state, {
    measurement: bestMeasurement,
    settings: bestSettings,
    tolerancePts,
    iteration: 1,
  });

  const worseSettings = settings({ topOffsetPts: 21.5 });
  const worseMeasurement = measurement({ pages: 2, deltaPts: 35, pass: false });
  registerObservation(state, {
    measurement: worseMeasurement,
    settings: worseSettings,
    tolerancePts,
    iteration: 2,
  });

  assert.equal(state.bestObservation.iteration, 1);
  assert.equal(state.bestObservation.settings.topOffsetPts, 19.4);
  assert.equal(state.lastObservation.iteration, 2);
});

test('nudges top offset when bracket midpoint is unchanged', () => {
  const state = createVariantSolverState();
  const tolerancePts = 1;
  const currentSettings = settings({ scale: 1.163, leading: 1.013, topOffsetPts: 21.059 });

  registerObservation(state, {
    measurement: measurement({ deltaPts: -6.2, actualPts: 23.282 }),
    settings: settings({ scale: 1.163, leading: 1.013, topOffsetPts: 21.059 }),
    tolerancePts,
    iteration: 1,
  });

  registerObservation(state, {
    measurement: measurement({ deltaPts: 10.1, actualPts: 39.582 }),
    settings: settings({ scale: 1.161, leading: 1.011, topOffsetPts: 21.059 }),
    tolerancePts,
    iteration: 2,
  });

  const next = computeNextSettings({
    state,
    currentSettings,
    measurement: measurement({ deltaPts: 10.1, actualPts: 39.582 }),
    tolerancePts,
  });

  assert.ok(next.topOffsetPts > currentSettings.topOffsetPts);
  assert.equal(next.scale, currentSettings.scale);
  assert.equal(next.leading, currentSettings.leading);
  assert.ok(next.strategy.includes('top-offset-bracket-nudge'));
});

test('returns unchanged settings for already passing measurements', () => {
  const state = createVariantSolverState();
  const currentSettings = settings({ topOffsetPts: 19.1 });
  const passingMeasurement = measurement({ deltaPts: 0.4, pass: true });

  registerObservation(state, {
    measurement: passingMeasurement,
    settings: currentSettings,
    tolerancePts: 1,
    iteration: 1,
  });

  const next = computeNextSettings({
    state,
    currentSettings,
    measurement: passingMeasurement,
    tolerancePts: 1,
  });

  assert.equal(next.scale, currentSettings.scale);
  assert.equal(next.leading, currentSettings.leading);
  assert.equal(next.topOffsetPts, currentSettings.topOffsetPts);
  assert.equal(next.strategy, 'already-within-tolerance');
});

test('applies density step when top-offset bound is reached', () => {
  const state = createVariantSolverState();
  const currentSettings = settings({ scale: 1.161, leading: 1.012, topOffsetPts: 28 });
  const failingMeasurement = measurement({ deltaPts: 4.2, actualPts: 33.682, pass: false });

  registerObservation(state, {
    measurement: failingMeasurement,
    settings: currentSettings,
    tolerancePts: 1,
    iteration: 1,
  });

  const next = computeNextSettings({
    state,
    currentSettings,
    measurement: failingMeasurement,
    tolerancePts: 1,
  });

  assert.ok(next.scale > currentSettings.scale);
  assert.ok(next.leading > currentSettings.leading);
  assert.ok(next.strategy.includes('boundary-density-step'));
});
