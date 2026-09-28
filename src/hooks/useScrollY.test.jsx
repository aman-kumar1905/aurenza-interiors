import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollY } from './useScrollY'

describe('useScrollY', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts at 0 and updates after a scroll event via rAF', () => {
    vi.stubGlobal('requestAnimationFrame', (cb) => {
      cb()
      return 1
    })

    const { result } = renderHook(() => useScrollY())
    expect(result.current).toBe(0)

    act(() => {
      window.scrollY = 240
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(240)
  })
})
