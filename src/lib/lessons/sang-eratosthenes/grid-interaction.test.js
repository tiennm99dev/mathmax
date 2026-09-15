import { describe, it, expect } from 'vitest';
import { createGridState } from './grid-interaction.svelte.js';

/** Minimal announcement builder; the tests only care that it was called. */
const build = (/** @type {number} */ p, /** @type {number[]} */ mults) =>
  `${p}: ${mults.length}`;

describe('createGridState — marking primes', () => {
  it('a prime with no multiple left on the grid does not lock it', () => {
    const grid = createGridState(build);

    // 53 is prime and 2×53 = 106 is off the 100-cell grid, so there is
    // nothing to cross out.
    grid.handleCellActivate(53);
    expect(grid.rippling).toBe(false);
    expect(grid.markedPrimes).toContain(53);
    expect(grid.announcement).toBe('53: 0');

    // The grid must still accept the next prime.
    grid.handleCellActivate(59);
    expect(grid.markedPrimes).toContain(59);
  });

  it('every prime above 50 leaves the grid usable', () => {
    const grid = createGridState(build);
    for (const p of [53, 59, 61, 67, 71, 73, 79, 83, 89, 97]) {
      grid.handleCellActivate(p);
      expect(grid.rippling).toBe(false);
    }
    expect(grid.markedPrimes).toHaveLength(10);
  });

  it('a prime with multiples enters ripple mode and blocks further clicks', () => {
    const grid = createGridState(build);
    grid.handleCellActivate(7); // 14, 21, … are on the grid
    expect(grid.rippling).toBe(true);

    grid.handleCellActivate(11);
    expect(grid.markedPrimes).not.toContain(11);
  });

  it('a composite is rejected and marks no prime', () => {
    const grid = createGridState(build);
    grid.handleCellActivate(9);
    expect(grid.markedPrimes).toHaveLength(0);
    expect(grid.shakeIndex).toBe(8);
  });

  it('the same prime cannot be marked twice', () => {
    const grid = createGridState(build);
    grid.handleCellActivate(53);
    grid.handleCellActivate(53);
    expect(grid.markedPrimes).toEqual([53]);
  });

  it('reset clears marks and unlocks the grid', () => {
    const grid = createGridState(build);
    grid.handleCellActivate(7);
    expect(grid.rippling).toBe(true);
    grid.handleReset();
    expect(grid.rippling).toBe(false);
    expect(grid.markedPrimes).toHaveLength(0);
    expect(grid.announcement).toBe('');
  });
});
