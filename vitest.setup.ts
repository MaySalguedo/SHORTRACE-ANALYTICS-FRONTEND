import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

const animateMock = vi.fn().mockImplementation(() => ({
  finished: Promise.resolve(),
  play: vi.fn(),
  pause: vi.fn(),
  cancel: vi.fn(),
  reverse: vi.fn(),
  commitStyles: vi.fn(),
  effect: null,
  replaceState: vi.fn(),
}));

Object.defineProperty(window.HTMLElement.prototype, 'animate', {
  writable: true,
  configurable: true,
  value: animateMock
});

import { cleanup } from '@testing-library/svelte';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

vi.spyOn(window.HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => ({
  createLinearGradient: vi.fn(() => ({
    addColorStop: vi.fn()
  }))
}) as any);