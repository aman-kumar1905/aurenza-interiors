import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { useInView } from './useInView'

let observedCallback
class MockIntersectionObserver {
  constructor(callback) {
    observedCallback = callback
  }
  observe() {}
  disconnect() {}
}

function TestComponent({ onValue }) {
  const [ref, isInView] = useInView()
  onValue(isInView)
  return <div ref={ref}>target</div>
}

describe('useInView', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts false and becomes true once the target intersects', () => {
    const values = []
    render(<TestComponent onValue={(v) => values.push(v)} />)

    expect(values[values.length - 1]).toBe(false)

    act(() => {
      observedCallback([{ isIntersecting: true }])
    })

    expect(values[values.length - 1]).toBe(true)
  })

  it('falls back to true immediately when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const values = []
    render(<TestComponent onValue={(v) => values.push(v)} />)

    expect(values[values.length - 1]).toBe(true)
  })
})
