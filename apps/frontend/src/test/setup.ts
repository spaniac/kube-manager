import '@testing-library/jest-dom';

// Configure React Testing Library
configure({
  testIdAttribute: 'data-testid', // Default attribute
  throwSuggestions: true, // Throw errors for deprecated methods
});

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
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
