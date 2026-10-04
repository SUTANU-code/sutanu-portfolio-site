import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* -------------------------------------------------------------------------
   CustomCursor — trailing ring + solid dot, scales over interactive targets
   ------------------------------------------------------------------------- */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState('default') // default | link | view
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.55 })
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.55 })

  const labelRef = useRef(null)

  useEffect(() => {
    // only run on fine pointers, and never on touch devices
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const over = (e) => {
      const el = e.target.closest('a, button, [data-cursor], input, textarea, select, [role="button"]')
      if (el) {
        const custom = el.getAttribute('data-cursor')
        if (custom) {
          setVariant('view')
          setLabel(custom)
        } else {
          setVariant('link')
          setLabel('')
        }
      } else {
        setVariant('default')
        setLabel('')
      }
    }

    const down = () => setVariant((v) => (v === 'link' ? 'link' : 'down'))
    const up = () => setVariant((v) => (v === 'down' ? 'default' : v))

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const ringSize = variant === 'view' ? 92 : variant === 'link' ? 56 : 38
  const ringColor = variant === 'view' ? 'var(--color-neon)' : 'var(--color-ink)'

  return (
    <>
      {/* trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: ringColor,
          backgroundColor:
            variant === 'view' ? 'color-mix(in srgb, var(--color-neon) 14%, transparent)' : 'transparent',
          opacity: variant === 'down' ? 0.65 : 1,
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
      >
        <span
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: ringColor, borderWidth: 1.5 }}
        />
        <span
          ref={labelRef}
          className="font-mono text-[9px] font-medium tracking-widest text-neon uppercase"
        >
          {variant === 'view' ? label : ''}
        </span>
      </motion.div>

      {/* solid dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-neon"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: variant === 'default' ? 1 : 0, opacity: variant === 'default' ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </>
  )
}

/* -------------------------------------------------------------------------
   ScrollProgress — gradient bar pinned to the top of the viewport
   ------------------------------------------------------------------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScrollProgress()

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 left-0 z-[9990] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg,var(--color-neon),var(--color-cyan),var(--color-iris-soft))',
        boxShadow: '0 0 14px color-mix(in srgb, var(--color-neon) 70%, transparent)',
      }}
    />
  )
}

function useScrollProgress() {
  const [progress, setProgress] = useState({ scrollYProgress: 0 })

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight
        const p = h > 0 ? window.scrollY / h : 0
        setProgress({ scrollYProgress: p })
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return progress
}

/* -------------------------------------------------------------------------
   BackToTop — appears after the first viewport
   ------------------------------------------------------------------------- */
export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0.5,
        pointerEvents: show ? 'auto' : 'none',
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="btn-neon fixed right-5 bottom-5 z-[9980] h-12 w-12 rounded-full"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  )
}