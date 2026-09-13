import { describe, expect, it } from 'vitest';
import { health } from '../src/health.js';

describe('lot 0 : squelette', () => {
  it('répond ok', () => {
    expect(health()).toBe('ok');
  });
});
