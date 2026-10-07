import { motion } from 'framer-motion'
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react'
import { profile, stackLine as stack, stats } from '../data/portfolio'
import { EASE, usePointerParallax, useTilt, wordReveal } from '../lib/motion'
import { Counter, MagneticButton, Marquee, TextScramble } from './ui/Primitives'
import { GithubIcon } from './ui/BrandIcons'

const HEADLINE = ['Java', 'Backend', 'Developer']

/* The three things he actually builds with */
const STACK_READOUT = [
  { k: 'Java', v: 'core & advanced' },
  { k: 'Spring Boot', v: 'secured apis' },
  { k: 'Agentic AI', v: 'python · langgraph' },
]

/* Rotating badge labels that orbit the portrait card */
const ORBIT_BADGES = [
  { label: 'Spring Boot', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', delay: 0 },
  { label: 'React', pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2', delay: 1.4 },
  { label: 'Spring AI', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', delay: 2.8 },
]

export function Hero() {
  const pointer = usePointerParallax()
  const tiltRef = useTilt(14, 1.03)

  const goWork = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-32 md:pt-36">
      {/* ---------- ambient layers ---------- */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      {/* cursor-following light */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: glowGradient(pointer),
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* ---------- copy ---------- */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.div
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-edge bg-panel/70 px-4 py-2"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neon animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            <TextScramble
              text={profile.availability}
              delay={0.5}
              className="font-mono text-[11px] tracking-[0.16em] text-neon uppercase"
            />
          </motion.div>

          {/* headline */}
          <h1 className="font-display text-[2.7rem] leading-[0.98] font-extrabold tracking-tight text-fg sm:text-6xl md:text-7xl">
            {HEADLINE.map((word, i) => (
              <span key={word} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  variants={wordReveal}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.25 + i * 0.11, duration: 0.9, ease: EASE }}
                >
                  {i === 1 ? (
                    <span className="relative inline-block">
                      <span className="text-gradient">{word}</span>
                      <motion.span
                        className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                        style={{ background: 'linear-gradient(90deg,var(--color-neon),var(--color-cyan))' }}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
                      />
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
            <span className="mt-1 block overflow-hidden pb-1">
              <motion.span
                className="block font-medium text-fg-dim"
                variants={wordReveal}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.58, duration: 0.9, ease: EASE }}
              >
                building <span className="text-fg">agentic AI</span> on top
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-body-dim sm:text-lg lg:mx-0"
            initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          >
            {profile.tagline}
          </motion.p>

          {/* location + stack line */}
          <motion.div
            className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-body-dim">
              <MapPin size={13} className="text-fg" /> {profile.location}
            </span>
            <span className="hidden h-3 w-px bg-edge sm:block" />
            <span className="font-mono text-xs text-body-dim">{profile.subtitle}</span>
          </motion.div>

          {/* stack line, not job titles */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.9 } } }}
          >
            {stack.map((s) => (
              <motion.span
                key={s}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
                }}
                className="rounded-sm border border-edge bg-navy px-3 py-1.5 font-mono text-[10px] tracking-wide text-fg-dim"
              >
                {s}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
          >
            <MagneticButton onClick={goWork} icon={<ArrowRight size={15} />}>
              View My Work
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              href={profile.socials.github}
              icon={<GithubIcon size={15} />}
            >
              GitHub
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              href={profile.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              icon={<Download size={15} />}
            >
              Résumé
            </MagneticButton>
          </motion.div>

          {/* stats */}
          <motion.div
            className="mt-12 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4 lg:mx-0"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 1.1 } } }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
                className="card-spotlight squircle border border-edge bg-panel/50 px-4 py-4 text-center"
              >
                <p className="font-display text-2xl font-extrabold text-fg">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[11px] leading-tight text-body-dim">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ---------- portrait ---------- */}
        <motion.div
          className="order-1 flex justify-center lg:order-2"
          initial={{ opacity: 0, scale: 0.86, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
        >
          <div className="perspective relative w-full max-w-[340px]">
            {/* rotating conic halo */}
            <div
              className="absolute -inset-8 animate-spin-slow rounded-full opacity-45 blur-2xl"
              style={{
                background:
                  'conic-gradient(from 0deg, var(--color-neon), var(--color-cyan), var(--color-iris), var(--color-neon))',
              }}
              aria-hidden
            />

            <motion.div
              ref={tiltRef}
              className="preserve-3d relative rounded-lg border border-edge bg-panel/80 p-2.5"
              style={{
                boxShadow:
                  '0 40px 90px -30px color-mix(in srgb, var(--color-neon) 45%, transparent), 0 0 0 1px rgba(255,255,255,0.03) inset',
                transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* scanning sheen */}
              <div
                className="pointer-events-none absolute inset-x-3 top-0 h-24 animate-scan rounded-t-[1.6rem] opacity-40"
                style={{
                  background: 'linear-gradient(180deg,transparent,color-mix(in srgb,var(--color-neon) 26%,transparent),transparent)',
                }}
                aria-hidden
              />

              <div className="relative aspect-square overflow-hidden rounded-md bg-ink">
                <img
                  src={profile.avatar}
                  alt={`${profile.name} portrait`}
                  className="h-full w-full object-cover"
                  width="720"
                  height="720"
                  /* Sits high in the frame so the crop keeps the face
                     rather than the middle of the torso. */
                  style={{ objectPosition: 'center 22%' }}
                  fetchPriority="high"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 45%, color-mix(in srgb, var(--color-void) 78%, transparent) 100%)',
                  }}
                  aria-hidden
                />
              </div>

              {/* name plate */}
              <div className="preserve-3d relative px-4 py-4" style={{ transform: 'translateZ(40px)' }}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-bold text-fg">{profile.name}</p>
                    <p className="font-mono text-[11px] text-neon">@{profile.handle}</p>
                  </div>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'linear-gradient(140deg,var(--color-neon),var(--color-cyan))', color: '#05050a' }}
                  >
                    <Sparkles size={15} />
                  </span>
                </div>

                {/* stack readout */}
                <div className="mt-3 overflow-hidden rounded-md border border-edge bg-void px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-lime/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neon/70" />
                    <span className="ml-1.5 font-mono text-[9px] text-fg-faint">sutanu.stack</span>
                  </div>

                  <ul className="mt-1.5 space-y-[3px]">
                    {STACK_READOUT.map((line, i) => (
                      <motion.li
                        key={line.k}
                        className="flex items-baseline gap-1.5"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.05 + i * 0.16, duration: 0.4, ease: EASE }}
                      >
                        <span className="font-mono text-[9px] text-fg-faint">&gt;</span>
                        <span className="font-mono text-[10px] text-neon">{line.k}</span>
                        <span className="font-mono text-[9px] text-fg-faint">// {line.v}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* floating orbit badges */}
            {ORBIT_BADGES.map((b) => (
              <motion.span
                key={b.label}
                className={`absolute ${b.pos} animate-float rounded-full border border-edge bg-panel/90 px-3 py-1.5 font-mono text-[10px] whitespace-nowrap text-neon shadow-lg`}
                style={{ animationDelay: `${b.delay}s` }}
                aria-hidden
              >
                {b.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ---------- bottom ticker ---------- */}
      <motion.div
        className="relative z-10 mt-16 border-y border-edge bg-panel/40 py-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.9, ease: EASE }}
      >
        <Marquee items={STACK_TICKER} duration={38} />
      </motion.div>
    </section>
  )
}

const STACK_TICKER = [
  'Java',
  'Spring Boot',
  'Agentic AI',
  'Python',
  'LangGraph',
  'React',
  'Spring AI',
  'Gemini AI',
  'MySQL',
  'Docker',
  'JWT',
  'RAG',
]

/* Builds the radial cursor-follow gradient */
function glowGradient(pointer) {
  const { x, y } = pointer
  return `radial-gradient(520px circle at ${50 + x * 22}% ${35 + y * 20}%, color-mix(in srgb, var(--color-neon) 9%, transparent), transparent 70%)`
}