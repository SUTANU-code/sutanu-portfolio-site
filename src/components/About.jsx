import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  GraduationCap,
  Layers,
  Rocket,
  Sparkles,
  Terminal,
  Trophy,
} from 'lucide-react'
import { achievements, profile, timeline } from '../data/portfolio'
import { EASE } from '../lib/motion'
import { Reveal, SectionHeading, SectionShell, TiltCard } from './ui/Primitives'
import { ArchitectureDiagram, ArchitectureStack } from './Architecture'

const ICONS = {
  brain: BrainCircuit,
  rocket: Rocket,
  layers: Layers,
  graduation: GraduationCap,
}

export function About() {
  const [preview, setPreview] = useState(null)
  // `closing` is only ever set by a user action — never during mount, so the
  // open animation renders correctly on the very first pass (no rAF needed,
  // which browsers throttle in background tabs).
  const [closing, setClosing] = useState(false)

  const openCert = (a) => {
    setClosing(false)
    setPreview(a)
  }

  const closeCert = () => setClosing(true)

  // Escape closes the viewer; scroll stays locked while it is open.
  useEffect(() => {
    if (!preview) return
    const onKey = (e) => e.key === 'Escape' && closeCert()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [preview])

  return (
    <SectionShell id="about" className="overflow-hidden">

      <SectionHeading
        index={1}
        eyebrow="About"
        title="I build the"
        accent="whole stack."
        description="Not just endpoints. The database design underneath, the auth in the middle, and the pixels on top — with AI layered in where it genuinely helps."
      />

      {/* ---------------- bio + education ---------------- */}
      <div className="mt-16 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Reveal>
          <div className="trace card-spotlight squircle h-full p-7 sm:p-9">
            <div className="flex items-center gap-2.5">
              <Terminal size={15} className="text-neon" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-body-dim uppercase">about.txt</span>
            </div>

            <div className="mt-6 space-y-5">
              {profile.bio.map((para, i) => (
                <p key={i} className="text-[15px] leading-[1.75] text-body">
                  {para}
                </p>
              ))}
            </div>

            {/* pull-quote */}
            <div className="mt-7 rounded-md border-l-2 border-[#d4d4d4] bg-panel/60 px-5 py-4">
              <p className="font-mono text-[13px] leading-relaxed text-fg">
                <span className="text-body-dim">// backend</span> = Spring Boot + Spring Security + REST + JPA +
                SQL + React
              </p>
              <p className="mt-1.5 font-mono text-[13px] leading-relaxed text-[#b5b5b5]">
                <span className="text-body-dim">// agents</span> = Python + LangGraph + Agentic workflows
              </p>
              <p className="mt-1.5 font-mono text-[13px] leading-relaxed text-[#b5b5b5]">
                <span className="text-body-dim">// llm</span> = Spring AI + Gemini + RAG
              </p>
            </div>

            {/* focus chips */}
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                'Clean architecture',
                'JWT + RBAC',
                'Database design',
                'Exception handling',
                'RAG pipelines',
                'Agentic workflows',
                'Docker',
                'Deployment',
              ].map((chip, i) => (
                <motion.span
                  key={chip}
                  className="chip px-3.5 py-1.5 font-mono text-[11px]"
                  initial={{ opacity: 0, scale: 0.86 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* education + principle cards */}
        <div className="grid gap-6">
          <Reveal delay={0.12}>
            <TiltCard max={7} className="squircle h-full">
              <div className="h-full rounded-[inherit] border border-edge bg-panel p-7">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-sm"
                  style={{ background: 'color-mix(in srgb,var(--color-neon) 14%,transparent)', color: 'var(--color-neon)' }}
                >
                  <GraduationCap size={19} />
                </span>
                <p className="mt-5 font-mono text-[11px] tracking-[0.2em] text-body-dim uppercase">Education</p>
                <h3 className="mt-2 font-display text-lg font-bold text-fg">{profile.education.degree}</h3>
                <p className="mt-1 text-sm text-body">{profile.education.college}</p>
                <p className="mt-0.5 text-xs text-body-dim">{profile.education.university}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {['Java', 'DSA', 'DBMS', 'Networks', 'OS'].map((s) => (
                    <span key={s} className="rounded-md border border-edge px-2 py-1 font-mono text-[10px] text-body-dim">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.2}>
            <TiltCard max={7} className="squircle h-full">
              <div
                className="h-full rounded-[inherit] border border-edge bg-panel p-7"
                style={{ borderColor: 'color-mix(in srgb,var(--color-iris) 30%,var(--color-edge))' }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-sm"
                  style={{
                    background: 'color-mix(in srgb,var(--color-iris) 16%,transparent)',
                    color: 'var(--color-iris-soft)',
                  }}
                >
                  <Code2 size={19} />
                </span>
                <p className="mt-5 font-mono text-[11px] tracking-[0.2em] text-body-dim uppercase">Approach</p>
                <p className="mt-3 text-[15px] leading-relaxed text-body">
                  I like understanding how systems work internally — from relationships and API layers to
                  authentication, state and deployment.
                </p>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>

      {/* ---------------- architecture diagram ---------------- */}
      <div className="mt-24">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <Sparkles size={15} className="text-neon" />
            <h3 className="font-display text-2xl font-bold text-fg sm:text-3xl">How I structure an app</h3>
          </div>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-body-dim">
            The same architecture shape across every project I ship — a React front end talking to a secured,
            layered Spring Boot service with an AI layer on the side.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-12 overflow-hidden rounded-lg border border-edge bg-panel/40 p-6 sm:p-10">
            <div className="wire pointer-events-none absolute inset-0 opacity-40" aria-hidden />

            {/* desktop: single SVG so nodes and connectors share one coordinate space */}
            <div className="relative z-10 hidden md:block">
              <ArchitectureDiagram />
            </div>

            {/* mobile: vertical flow */}
            <div className="relative z-10 md:hidden">
              <ArchitectureStack />
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---------------- achievements ---------------- */}
      <div className="mt-24">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <Trophy size={15} className="text-accent" />
              <h3 className="font-display text-2xl font-bold text-fg sm:text-3xl">Recognition</h3>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {achievements.map((a, i) => {
              const Inner = (
                <>
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy-2 text-neon-soft">
                      <Trophy size={15} />
                    </span>
                    <span className="label-mono">{a.tag}</span>
                  </div>
                  <h4 className="mt-5 font-display text-[15px] leading-snug font-bold text-fg">
                    {a.title}
                  </h4>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-fg-dim">{a.body}</p>
                  {(a.link || a.image) && (
                    <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.16em] text-neon uppercase">
                      {a.image ? 'View certificate' : 'View'} <ArrowUpRight size={11} />
                    </span>
                  )}
                </>
              )

              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                >
                  {a.image ? (
                    <button
                      onClick={() => openCert(a)}
                      data-cursor="view"
                      className="trace block h-full w-full cursor-pointer rounded-md border border-edge bg-navy p-6 text-left"
                    >
                      {Inner}
                    </button>
                  ) : a.link ? (
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="trace block h-full rounded-md border border-edge bg-navy p-6"
                    >
                      {Inner}
                    </a>
                  ) : (
                    <div className="trace h-full rounded-md border border-edge bg-navy p-6">
                      {Inner}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* certificate preview — animated open/close with guaranteed unmount */}
          {preview && (
            <motion.div
              className="fixed inset-0 z-[9996] flex items-center justify-center p-4 sm:p-8"
              initial={{ opacity: 0 }}
              animate={{
                opacity: closing ? 0 : 1,
                pointerEvents: closing ? 'none' : 'auto',
              }}
              transition={{ duration: 0.28 }}
              onAnimationComplete={() => {
                if (closing) {
                  setPreview(null)
                  setClosing(false)
                }
              }}
              role="dialog"
              aria-modal="true"
              aria-label={preview.title}
            >
              <div
                className="absolute inset-0 bg-black/88"
                onClick={closeCert}
                aria-hidden
              />
              <motion.figure
                className="relative max-h-full w-full max-w-3xl overflow-hidden rounded-md border border-edge bg-void"
                initial={{ opacity: 0, scale: 0.95, y: 24 }}
                animate={{
                  opacity: closing ? 0 : 1,
                  scale: closing ? 0.97 : 1,
                  y: closing ? 18 : 0,
                }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <img
                  src={preview.image}
                  alt={`${preview.title} — certificate`}
                  className="max-h-[78vh] w-full object-contain"
                />
                <figcaption className="flex items-center justify-between gap-4 border-t border-edge px-5 py-3.5">
                  <span className="label-mono">{preview.title}</span>
                  <a
                    href={preview.image}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.16em] text-neon uppercase"
                  >
                    Open full size <ArrowUpRight size={11} />
                  </a>
                </figcaption>
              </motion.figure>
            </motion.div>
          )}
        </div>

        {/* ---------------- journey ---------------- */}
        <div className="mt-24">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <Layers size={15} className="text-accent" />
            <h3 className="font-display text-2xl font-bold text-fg sm:text-3xl">The journey so far</h3>
          </div>
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-3xl">
          {/* rail */}
          <div className="absolute top-2 bottom-2 left-[19px] w-px bg-gradient-to-b from-neon/50 via-iris/40 to-transparent md:left-1/2" />

          <div className="space-y-7">
            {timeline.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Code2
              const right = i % 2 === 1
              return (
                <motion.div
                  key={item.title}
                  className={`relative flex gap-5 md:gap-0 ${right ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.75, delay: i * 0.1, ease: EASE }}
                >
                  {/* node */}
                  <span
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-void"
                    style={{ borderColor: 'color-mix(in srgb,var(--color-neon) 45%,transparent)', color: 'var(--color-neon)' }}
                  >
                    <Icon size={15} />
                  </span>

                  {/* card */}
                  <div className={`flex-1 pb-1 md:w-[calc(50%-2.5rem)] ${right ? 'md:pl-0' : 'md:pr-0'}`}>
                    <div
                      className="card-spotlight squircle border border-edge bg-panel/60 p-6 transition-transform duration-500 hover:-translate-y-1"
                    >
                      <span className="font-mono text-[10px] tracking-[0.22em] text-neon uppercase">
                        {item.tag}
                      </span>
                      <h4 className="mt-2 font-display text-base font-bold text-fg">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-body-dim">{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
        </div>
    </SectionShell>
  )
}
