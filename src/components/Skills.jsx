import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { skillTabs } from '../data/portfolio'
import { EASE } from '../lib/motion'
import { Reveal, SectionHeading, SectionShell } from './ui/Primitives'

export function Skills() {
  const [active, setActive] = useState(skillTabs[0].id)
  const tab = skillTabs.find((t) => t.id === active) ?? skillTabs[0]

  return (
    <SectionShell id="skills" className="overflow-hidden">

      <SectionHeading
        index={2}
        eyebrow="Skills"
        title="The"
        accent="toolkit."
        description="Grouped by layer — understand what's underneath before reaching for the framework on top."
      />

      {/* ---------------- tabs ---------------- */}
      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
          {skillTabs.map((t) => {
            const on = t.id === active
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className="relative rounded-full px-5 py-2.5 font-display text-sm font-medium transition-colors duration-300"
                style={{ color: on ? '#05050a' : 'var(--color-body)' }}
              >
                {on && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(120deg,var(--color-neon),var(--color-cyan))' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {!on && (
                  <span className="absolute inset-0 rounded-full border border-edge bg-panel/50" aria-hidden />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {t.label}
                </span>
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* ---------------- panel ---------------- */}
      <div className="relative mt-12 min-h-[430px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -22, filter: 'blur(10px)' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              {/* blurb */}
              <div className="trace card-spotlight squircle p-8">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-md"
                  style={{
                    background: 'linear-gradient(140deg,var(--color-neon),var(--color-cyan))',
                    color: '#05050a',
                  }}
                >
                  <Zap size={20} />
                </span>
                <h3 className="mt-6 font-display text-xl leading-snug font-bold text-fg sm:text-2xl">
                  {tab.headline}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.75] text-body-dim">{tab.blurb}</p>
              </div>

              {/* meters */}
              <div className="squircle border border-edge bg-panel/50 p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] tracking-[0.22em] text-body-dim uppercase">
                    {tab.label} proficiency
                  </p>
                  <span className="font-mono text-[11px] text-neon">{tab.skills.length} skills</span>
                </div>

                <div className="mt-7 space-y-5">
                  {tab.skills.map((s, i) => (
                    <div key={s.name}>
                      <div className="mb-2 flex items-baseline justify-between gap-3">
                        <span className="font-display text-sm font-medium text-fg">{s.name}</span>
                        <motion.span
                          className="font-mono text-xs text-neon"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.06 }}
                        >
                          {s.level}%
                        </motion.span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-edge">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, var(--color-neon), var(--color-cyan))`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${s.level}%` }}
                          transition={{ duration: 1.1, delay: 0.12 + i * 0.07, ease: EASE }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  )
}