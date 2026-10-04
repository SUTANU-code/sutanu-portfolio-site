import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../lib/motion'

const BOOT_LINES = [
  'init  portfolio.sys',
  'load java · spring-boot · react',
  'mount agent-layer (python · langgraph)',
  'link repositories',
  'resolve  paulsutanu66@gmail.com',
  'ready.',
]

/* -------------------------------------------------------------------------
   Preloader — a short terminal boot sequence, then the curtain lifts.
   ------------------------------------------------------------------------- */
export function Preloader({ onDone }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(BOOT_LINES.length)
      setDone(true)
      onDone?.()
      return
    }

    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setStep(i + 1), 190 + i * 200)
    )
    const finish = setTimeout(() => {
      setDone(true)
      onDone?.()
    }, 190 + BOOT_LINES.length * 200 + 380)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finish)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center px-6"
          style={{ background: 'var(--color-void)' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* scanline sweep */}
          <motion.div
            className="absolute inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg,transparent,var(--color-navy-3),transparent)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }}
          />

          <div className="w-full max-w-sm">
            {/* wordmark */}
            <motion.div
              className="mb-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-navy-3 bg-navy font-display text-[13px] font-extrabold text-neon-soft">
                SP
              </span>
              <div>
                <p className="font-display text-sm font-bold text-fg">Sutanu Paul</p>
                <p className="font-mono text-[10px] tracking-[0.18em] text-fg-faint uppercase">
                  Java · Agentic AI
                </p>
              </div>
            </motion.div>

            {/* boot log */}
            <div className="min-h-[132px] border-l border-edge pl-4">
              {BOOT_LINES.slice(0, step).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-[11px] leading-[1.9]"
                  style={{ color: i === BOOT_LINES.length - 1 ? 'var(--color-neon)' : 'var(--color-fg-faint)' }}
                >
                  <span className="mr-2 opacity-60">&gt;</span>
                  {line}
                  {i === step - 1 && step < BOOT_LINES.length && (
                    <span className="animate-blink ml-0.5 inline-block h-3 w-[6px] translate-y-0.5 bg-current" />
                  )}
                </motion.p>
              ))}
            </div>

            {/* progress */}
            <div className="mt-6">
              <div className="flex h-[3px] gap-[2px]">
                {BOOT_LINES.map((l, i) => (
                  <span
                    key={l}
                    className="h-full flex-1 transition-colors duration-300"
                    style={{ background: i < step ? 'var(--color-neon)' : 'var(--color-edge)' }}
                  />
                ))}
              </div>
              <p className="mt-3 flex justify-between font-mono text-[9px] tracking-[0.2em] text-fg-faint uppercase">
                <span>booting</span>
                <span>{String(Math.round((step / BOOT_LINES.length) * 100)).padStart(3, '0')}%</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}