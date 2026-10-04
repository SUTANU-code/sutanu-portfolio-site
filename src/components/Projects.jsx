import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2, X } from 'lucide-react'
import { projects } from '../data/portfolio'
import { EASE } from '../lib/motion'
import { MagneticButton, Reveal, SectionHeading, SectionShell } from './ui/Primitives'
import { GithubIcon } from './ui/BrandIcons'
import { ProjectArt } from './art/ProjectArt'

export function Projects() {
  const [index, setIndex] = useState(0)
  const [focus, setFocus] = useState(false)
  const active = projects[index]

  const go = (dir) => setIndex((i) => (i + dir + projects.length) % projects.length)

  /* arrow-key navigation while the explorer is on screen */
  useEffect(() => {
    const onKey = (e) => {
      if (focus) return
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focus])

  /* lock scroll in full-screen focus mode */
  useEffect(() => {
    document.body.style.overflow = focus ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [focus])

  return (
    <SectionShell id="work" className="overflow-hidden">

      <SectionHeading
        index={3}
        eyebrow="Work"
        title="Systems,"
        accent="built end to end."
        description="Not screenshots — working applications. Pick one to take it full screen, or read the summary here."
      />

      {/* ================= explorer ================= */}
      <Reveal delay={0.1}>
        <div className="mt-16 overflow-hidden rounded-md border border-edge bg-panel/45">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* ---------- index rail ---------- */}
            <div className="flex flex-col border-b border-edge lg:border-r lg:border-b-0">
              <div className="flex items-center justify-between border-b border-edge px-6 py-4">
                <span className="font-mono text-[10px] tracking-[0.22em] text-body-dim uppercase">Index</span>
                <span className="font-mono text-[10px] text-[#e5e5e5]">
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              <ul className="flex-1">
                {projects.map((p, i) => {
                  const on = i === index
                  return (
                    <li key={p.id}>
                      <button
                        onClick={() => setIndex(i)}
                        className="group relative flex w-full items-center gap-4 border-b border-edge/70 px-6 py-4 text-left transition-colors duration-400 last:border-b-0"
                        style={{ background: on ? 'rgba(255,255,255,0.045)' : 'transparent' }}
                      >
                        {/* active bar */}
                        <motion.span
                          layoutId="proj-rail"
                          className="absolute top-0 bottom-0 left-0 w-[2px] bg-white"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />

                        <span
                          className="font-mono text-[11px] transition-colors duration-300"
                          style={{ color: on ? 'var(--color-fg)' : 'var(--color-fg-faint)' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className="block truncate font-display text-sm font-semibold transition-colors duration-300"
                            style={{ color: on ? 'var(--color-fg)' : 'var(--color-fg-dim)' }}
                          >
                            {p.title}
                          </span>
                          <span className="block truncate font-mono text-[10px] text-body-dim">{p.tagline}</span>
                        </span>

                        {p.demo && (
                          <span
                            className="shrink-0 rounded-full border border-edge px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase"
                            style={{ color: on ? 'var(--color-fg)' : 'var(--color-fg-faint)' }}
                          >
                            Live
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* controls */}
              <div className="flex items-center justify-between border-t border-edge px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous project"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-edge text-fg-dim transition-all duration-300 hover:border-neon hover:text-white"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next project"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-edge text-fg-dim transition-all duration-300 hover:border-neon hover:text-white"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
                <p className="font-mono text-[10px] text-body-dim">← → to browse</p>
              </div>
            </div>

            {/* ---------- focus panel ---------- */}
            <div className="relative">
              {/* progress rail */}
              <div className="absolute top-0 right-0 left-0 z-20 h-px bg-edge">
                <motion.div
                  className="h-full bg-white"
                  animate={{ width: `${((index + 1) / projects.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={active.id}
                  initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="flex h-full flex-col"
                >
                  {/* art */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-edge">
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1.06 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: EASE }}
                    >
                      <ProjectArt id={active.id} />
                    </motion.div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      {active.featured && (
                        <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[9px] font-semibold tracking-wider text-[#0b0b0c] uppercase">
                          Featured
                        </span>
                      )}
                      <button
                        onClick={() => setFocus(true)}
                        data-cursor="open"
                        aria-label="Open full screen"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-edge bg-black/50 text-[#e5e5e5] transition-colors hover:text-white"
                      >
                        <Maximize2 size={12} />
                      </button>
                    </div>
                  </div>

                  {/* body */}
                  <div className="flex flex-1 flex-col p-7 sm:p-9">
                    <h3 className="font-display text-2xl font-extrabold text-fg">{active.title}</h3>
                    <p className="mt-1.5 text-sm text-body-dim">{active.tagline}</p>
                    <p className="mt-5 text-[15px] leading-[1.75] text-body">{active.description}</p>

                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {active.highlights.slice(0, 4).map((h, i) => (
                        <motion.li
                          key={h}
                          className="flex items-start gap-2.5 text-[13px] text-body"
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.06, duration: 0.45 }}
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white" />
                          {h}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7">
                      <div className="flex flex-wrap gap-1.5">
                        {active.stack.slice(0, 5).map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-edge px-2 py-0.5 font-mono text-[10px] text-body-dim"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="ml-auto flex items-center gap-3">
                        <a
                          href={active.repo}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-body transition-colors hover:text-white"
                        >
                          <GithubIcon size={13} /> Code
                        </a>
                        {active.demo && (
                          <a
                            href={active.demo}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-body transition-colors hover:text-white"
                          >
                            <ExternalLink size={13} /> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ================= thumbnails ================= */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {projects.map((p, i) => {
          const on = i === index
          return (
            <motion.button
              key={p.id}
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="group relative aspect-[4/3] overflow-hidden rounded-md border transition-all duration-400"
              style={{
                borderColor: on ? 'var(--color-neon)' : 'var(--color-edge)',
                boxShadow: on ? '0 18px 50px -22px rgba(255,255,255,0.5)' : 'none',
              }}
              aria-label={p.title}
              aria-pressed={on}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{ opacity: on ? 1 : 0.45 }}
              >
                <ProjectArt id={p.id} />
              </div>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2.5 pt-6 pb-2 text-left">
                <span
                  className="block truncate font-mono text-[9px] tracking-wide"
                  style={{ color: on ? 'var(--color-fg)' : 'var(--color-fg-dim)' }}
                >
                  {String(i + 1).padStart(2, '0')} · {p.title}
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* ================= full-screen focus ================= */}
      <AnimatePresence>{focus && <FocusMode project={active} onClose={() => setFocus(false)} onNext={() => go(1)} onPrev={() => go(-1)} />}</AnimatePresence>
    </SectionShell>
  )
}

/* -------------------------------------------------------------------------
   FocusMode — takes over the viewport for one project
   ------------------------------------------------------------------------- */
function FocusMode({ project, onClose, onNext, onPrev }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      className="fixed inset-0 z-[9996] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 bg-black/88"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        tabIndex={-1}
        ref={closeRef}
        className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-md border border-edge bg-[#0f0f11] outline-none"
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* chrome */}
        <div className="flex shrink-0 items-center justify-between border-b border-edge px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#52525b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#71717a]" />
          </div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-body-dim uppercase">{project.title}</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-edge text-fg-dim transition-colors hover:border-neon hover:text-white"
          >
            <X size={14} />
          </button>
        </div>

        {/* scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative aspect-[16/9] w-full">
            <ProjectArt id={project.id} />
          </div>

          <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h3 className="font-display text-3xl font-extrabold text-fg sm:text-4xl">{project.title}</h3>
              <p className="mt-2 text-sm text-body-dim">{project.tagline}</p>
              <p className="mt-6 text-[15px] leading-[1.8] text-body">{project.description}</p>

              <p className="mt-9 mb-3 font-mono text-[10px] tracking-[0.22em] text-body-dim uppercase">Key areas</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    className="flex items-start gap-2.5 rounded-sm border border-edge bg-white/[0.02] px-4 py-3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.45 }}
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white" />
                    <span className="text-[13px] text-body">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="lg:border-l lg:border-edge lg:pl-10">
              <p className="font-mono text-[10px] tracking-[0.22em] text-body-dim uppercase">Tech stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s, i) => (
                  <motion.span
                    key={s}
                    className="rounded-lg border border-edge bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-fg-dim"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>

              <div className="mt-9 space-y-3">
                <MagneticButton href={project.repo} icon={<GithubIcon size={15} />} className="w-full">
                  View source
                </MagneticButton>
                {project.demo && (
                  <MagneticButton variant="ghost" href={project.demo} icon={<ExternalLink size={15} />} className="w-full">
                    Live demo
                  </MagneticButton>
                )}
              </div>

              <div className="mt-9 flex items-center justify-between border-t border-edge pt-6">
                <span className="font-mono text-[10px] text-body-dim">Browse with ← →</span>
                <div className="flex gap-2">
                  <button
                    onClick={onPrev}
                    aria-label="Previous"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-edge text-fg-dim transition-colors hover:border-neon hover:text-white"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    onClick={onNext}
                    aria-label="Next"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-edge text-fg-dim transition-colors hover:border-neon hover:text-white"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}