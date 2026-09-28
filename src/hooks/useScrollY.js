import { useEffect, useRef, useState } from 'react'

export function useScrollY() {
  const [scrollY, setScrollY] = useState(() => window.scrollY)
  const ticking = useRef(false)

  useEffect(() => {
    function handleScroll() {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
