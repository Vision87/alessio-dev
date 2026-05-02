import '@testing-library/jest-dom'

// Required by Framer Motion's useReducedMotion hook
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Required by Framer Motion's whileInView / viewport feature
global.IntersectionObserver = class {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds: readonly number[] = []
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
  takeRecords = jest.fn(() => [])
} as unknown as typeof IntersectionObserver
