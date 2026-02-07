import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextEncoder, TextDecoder });

configure({});

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = global.IntersectionObserver || class IntersectionObserver {
  constructor() {
    this.observe = () => {};
    this.unobserve = () => {};
  }

  observe() {
    return;
  }

  unobserve() {
    return;
  }

  disconnect() {
    return;
  }
};
