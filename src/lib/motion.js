import { useEffect, useRef, useState } from 'react'

/* Shared easing curves — kept in JS so framer-motion and CSS stay in sync */
export const EASE = [0.16, 1, 0.3, 1]
export const SPRING = [0.34, 1.56, 0.64, 1]

/* Standard scroll-reveal variants ---------------------------------------- */
export const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE },
  },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/* Word-by-word headline reveal ------------------------------------------- */
export const wordReveal = {
  hidden: { opacity: 0, y: '0.5em', rotateX: -55 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: EASE } },
}

/* --------------------------------------------------------------------- */
/*  Prefers reduced motion                                                 */
/* --------------------------------------------------------------------- */
export function useReducedMotionSafe() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/* --------------------------------------------------------------------- */
/*  Magnetic — element leans toward the cursor                            */
/* --------------------------------------------------------------------- */
export function useMagnetic(strength = 0.35, radius = 90) {
  const ref = useRef(null)
  const reduced = useReducedMotionSafe()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let raf = 0
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius + Math.max(r.width, r.height) / 2) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.transform = 'translate(0,0)'
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [strength, radius, reduced])

  return ref
}

/* --------------------------------------------------------------------- */
/*  Tilt — 3D card tilt that follows the cursor                           */
/* --------------------------------------------------------------------- */
export function useTilt(max = 9, scale = 1.015) {
  const ref = useRef(null)
  const reduced = useReducedMotionSafe()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let raf = 0
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateY(${(px - 0.5) * max * 2}deg) rotateX(${
          (0.5 - py) * max * 2
        }deg) scale(${scale})`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [max, scale, reduced])

  return ref
}

/* --------------------------------------------------------------------- */
/*  Spotlight — writes --mx / --my for the radial hover glow             */
/* --------------------------------------------------------------------- */
export function useSpotlight() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [])
  return ref
}

/* --------------------------------------------------------------------- */
/*  Pointer position, throttled through rAF (for parallax + glow)          */
/* --------------------------------------------------------------------- */
export function usePointerParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const raw = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let raf = 0
    const onMove = (e) => {
      raw.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setPos(raw.current))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return pos
}

/* --------------------------------------------------------------------- */
/*  Active section observer for nav highlighting                           */
/* --------------------------------------------------------------------- */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

/* --------------------------------------------------------------------- */
/*  Count-up number with IntersectionObserver trigger                     */
/* --------------------------------------------------------------------- */
export function useCountUp(target, { duration = 1800, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return
        done.current = true
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 4)
          setValue(Number((target * eased).toFixed(decimals)))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration, decimals])

  return [ref, value]
}