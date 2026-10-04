import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, useCountUp, useMagnetic, useSpotlight, useTilt } from '../../lib/motion'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/* -------------------------------------------------------------------------
   Reveal — scroll-triggered entrance wrapper
   ------------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 34,
  blur = true,
  className = '',
  as = 'div',
  once = true,
}) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(6px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/* -------------------------------------------------------------------------
   SectionHeading — eyebrow + gradient accent title + description
   ------------------------------------------------------------------------- */
export function SectionHeading({ eyebrow, index, title, accent, description, align = 'center' }) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <div className={`mb-6 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          {/* mono index chip — the retro "section marker" */}
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
            {String(index).padStart(2, '0')}
          </span>
          <span className="h-px w-8 bg-edge" />
          <span className="label-mono">{eyebrow}</span>
        </div>
      </Reveal>

      <h2 className="font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl md:text-5xl">
        <Reveal delay={0.08}>
          {title}{' '}
          {accent && <span className="text-gradient">{accent}</span>}
        </Reveal>
      </h2>

      {description && (
        <Reveal delay={0.16}>
          <p className="mt-6 text-[15px] leading-relaxed text-fg-dim">{description}</p>
        </Reveal>
      )}

      {/* hairline rule closes the header block */}
      <Reveal delay={0.22}>
        <div className={`mt-8 h-px bg-edge ${centered ? 'mx-auto max-w-[120px]' : 'max-w-[120px]'}`} />
      </Reveal>
    </div>
  )
}

/* -------------------------------------------------------------------------
   MagneticButton — pill button that leans toward the cursor
   ------------------------------------------------------------------------- */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'neon',
  className = '',
  icon = null,
  external = true,
  ...rest
}) {
  const ref = useMagnetic(variant === 'neon' ? 0.28 : 0.22)
  const isExternal = Boolean(href?.startsWith('http'))
  const base =
    variant === 'neon'
      ? 'btn-neon shine px-5 py-2.5 text-[12px] uppercase tracking-[0.1em]'
      : 'btn-ghost shine px-5 py-2.5 text-[12px] uppercase tracking-[0.1em]'
  const cls = `${base} ${className}`

  const inner = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
      {icon}
    </span>
  )

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={cls}
        target={isExternal && external ? '_blank' : undefined}
        rel={isExternal && external ? 'noreferrer noopener' : undefined}
        {...rest}
      >
        {inner}
      </a>
    )
  }

  return (
    <motion.button ref={ref} onClick={onClick} whileTap={{ scale: 0.94 }} className={cls} {...rest}>
      {inner}
    </motion.button>
  )
}

/* -------------------------------------------------------------------------
   TiltCard — 3D tilt on a single element + cursor spotlight via CSS vars
   ------------------------------------------------------------------------- */
export function TiltCard({ children, className = '', max = 8, spotlight = true }) {
  const tiltRef = useTilt(max)
  const spotRef = useSpotlight()

  const setRef = useCallback(
    (node) => {
      tiltRef.current = node
      if (spotlight) spotRef.current = node
    },
    [tiltRef, spotRef, spotlight]
  )

  return (
    <div
      ref={setRef}
      className={`${spotlight ? 'card-spotlight' : ''} ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------
   Marquee — infinite horizontal ticker (content duplicated for a seamless loop)
   ------------------------------------------------------------------------- */
export function Marquee({
  items,
  duration = 34,
  reverse = false,
  separator = '·',
  className = '',
  itemClassName = '',
}) {
  const doubled = [...items, ...items]
  return (
    <div className={`mask-fade-x flex overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex shrink-0 items-center"
        style={{ '--dur': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span
              className={`px-6 font-display text-sm font-medium whitespace-nowrap text-body-dim transition-colors duration-300 hover:text-neon sm:text-base ${itemClassName}`}
            >
              {item}
            </span>
            <span className="select-none text-neon/40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   TextScramble — decodes scrambled glyphs into real text
   ------------------------------------------------------------------------- */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#01'

export function TextScramble({ text, className = '', delay = 0, duration = 1300 }) {
  const [out, setOut] = useState(text)

  useIsoLayoutEffect(() => {
    let frame = 0
    let timer = 0

    const timerId = setTimeout(() => {
      const start = performance.now()
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const revealed = Math.floor(p * text.length)
        let s = ''
        for (let i = 0; i < text.length; i++) {
          s += i < revealed || text[i] === ' ' ? text[i] : GLYPHS[(i * 7 + Math.floor(p * 40)) % GLYPHS.length]
        }
        setOut(s)
        if (p < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }, delay * 1000)

    timer = timerId
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [text, delay, duration])

  return <span className={className}>{out}</span>
}

/* -------------------------------------------------------------------------
   Counter — animated number that counts up when scrolled into view
   ------------------------------------------------------------------------- */
export function Counter({ value, suffix = '', prefix = '', duration = 1800, className = '' }) {
  const [ref, current] = useCountUp(value, { duration })
  return (
    <span ref={ref} className={className}>
      {prefix}
      {current}
      {suffix}
    </span>
  )
}

/* -------------------------------------------------------------------------
   BlueprintGrid — faint technical grid, the retro substitute for glow blobs
   ------------------------------------------------------------------------- */
export function BlueprintGrid({ className = '', cells = '48px' }) {
  return (
    <div
      aria-hidden
      className={`grid-bg pointer-events-none absolute inset-0 ${className}`}
      style={{ backgroundSize: `${cells} ${cells}`, opacity: 0.5 }}
    />
  )
}

/* -------------------------------------------------------------------------
   SectionShell — consistent section padding + id anchor
   ------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
   SectionShell — consistent section padding + id anchor
   ------------------------------------------------------------------------- */
export function SectionShell({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative px-5 py-24 sm:px-8 md:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}