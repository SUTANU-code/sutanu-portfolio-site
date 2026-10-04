import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, FileText, Loader2, Mail, MapPin, Send } from 'lucide-react'
import { profile } from '../data/portfolio'
import { EASE } from '../lib/motion'
import { MagneticButton, Reveal, SectionHeading, SectionShell, TiltCard } from './ui/Primitives'
import { GithubIcon, LeetCodeIcon, LinkedinIcon } from './ui/BrandIcons'

const CHANNELS = [
  { label: 'Email', value: profile.socials.email.replace('mailto:', ''), href: profile.socials.email, icon: Mail },
  { label: 'GitHub', value: '@SUTANU-code', href: profile.socials.github, icon: GithubIcon },
  { label: 'LinkedIn', value: 'in/sutanu-paul', href: profile.socials.linkedin, icon: LinkedinIcon },
  { label: 'LeetCode', value: '___sutanu__', href: profile.socials.leetcode, icon: LeetCodeIcon },
  {
    label: 'Résumé',
    value: 'Download PDF',
    href: profile.socials.resume,
    icon: FileText,
  },
]

export function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const submit = (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    // No backend wired up — swap this for a fetch() to your API or a form service.
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1400)
  }

  const field =
    'w-full rounded-sm border border-edge bg-void/50 px-4 py-3.5 text-sm text-fg outline-none transition-all duration-300 placeholder:text-body-dim/60 focus:border-neon/60 focus:bg-void/80 focus:ring-4 focus:ring-neon/10'

  return (
    <SectionShell id="contact" className="overflow-hidden">

      <SectionHeading
        index={4}
        eyebrow="Contact"
        title="Let's build"
        accent="something."
        description="Whether it's a backend role, a full-stack project, or an AI idea you want validated — my inbox is open."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        {/* ---------------- left: channels + 3D card ---------------- */}
        <div className="space-y-6">
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {CHANNELS.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  className="card-spotlight group flex items-center gap-3 rounded-md border border-edge bg-panel/55 px-4 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-neon/40"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: 'color-mix(in srgb, var(--color-neon) 13%, transparent)',
                      color: 'var(--color-neon)',
                    }}
                  >
                    <c.icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] tracking-[0.18em] text-body-dim uppercase">
                      {c.label}
                    </span>
                    <span className="block truncate text-[13px] font-medium text-fg">{c.value}</span>
                  </span>
                </motion.a>
              ))}
            </div>
          </Reveal>

          {/* floating 3D card */}
          <Reveal delay={0.16}>
            <TiltCard max={12} className="perspective">
              <div
                className="preserve-3d relative overflow-hidden rounded-md border p-7"
                style={{
                  borderColor: 'color-mix(in srgb, var(--color-neon) 28%, var(--color-edge))',
                  background:
                    'linear-gradient(140deg, color-mix(in srgb, var(--color-neon) 10%, var(--color-panel)), var(--color-ink))',
                  transform: 'rotateX(6deg) rotateY(-6deg)',
                }}
              >
                <div className="wire pointer-events-none absolute inset-0 opacity-40" aria-hidden />

                {/* decorative slats */}
                <motion.div
                  className="absolute -top-6 -left-8 h-32 w-[130%] -rotate-12 rounded-full"
                  style={{ background: 'linear-gradient(90deg,var(--color-iris),var(--color-neon))', opacity: 0.9 }}
                  animate={{ x: ['-4%', '4%', '-4%'], rotate: [-12, -8, -12] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-10 -right-6 h-28 w-[110%] rotate-12 rounded-full"
                  style={{ background: 'linear-gradient(90deg,var(--color-neon),var(--color-cyan))', opacity: 0.85 }}
                  animate={{ x: ['3%', '-3%', '3%'], rotate: [12, 16, 12] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative z-10 pt-16">
                  <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-void/40 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.2em] text-neon uppercase">
                    <MapPin size={11} /> {profile.location}
                  </span>

                  <p className="mt-5 font-display text-xl leading-snug font-bold text-fg">
                    Available for full-stack & backend roles.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-body-dim">
                    Java · Spring Boot · React · Spring AI. Currently pursuing BCA while shipping production-style
                    projects on the side.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {['Java', 'Spring Boot', 'React', 'Spring AI'].map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-edge/80 bg-void/40 px-2.5 py-1 font-mono text-[10px] text-body"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* ---------------- right: form ---------------- */}
        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="trace squircle h-full border border-edge bg-panel/55 p-7 sm:p-9"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] tracking-[0.22em] text-body-dim uppercase">Send a message</p>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-neon">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-neon animate-pulse-ring" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon" />
                </span>
                online
              </span>
            </div>

            <div className="mt-7 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] text-body-dim uppercase">
                    Name
                  </span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] text-body-dim uppercase">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@company.com"
                    className={field}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] text-body-dim uppercase">
                  Message
                </span>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about the role or the idea…"
                  className={`${field} resize-none`}
                />
              </label>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <MagneticButton
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                icon={
                  status === 'sending' ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : status === 'sent' ? (
                    <Check size={15} />
                  ) : (
                    <Send size={15} />
                  )
                }
              >
                {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent!' : 'Submit'}
              </MagneticButton>

              <AnimatePresence>
                {status === 'sent' && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-[11px] text-neon"
                  >
                    Thanks — I&apos;ll get back to you shortly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-8 border-t border-edge pt-5 text-[11px] leading-relaxed text-body-dim">
              Prefer email directly? Reach me at{' '}
              <a
                href={profile.socials.email}
                className="text-neon underline decoration-neon/40 underline-offset-4 hover:decoration-neon"
              >
                {profile.socials.email.replace('mailto:', '')}
              </a>
            </p>
          </form>
        </Reveal>
      </div>
    </SectionShell>
  )
}