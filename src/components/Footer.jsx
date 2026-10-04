import { Mail, Send } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'
import { Marquee } from './ui/Primitives'
import { GithubIcon, LeetCodeIcon, LinkedinIcon } from './ui/BrandIcons'

const SOCIALS = [
  { label: 'GitHub', href: profile.socials.github, icon: GithubIcon },
  { label: 'LinkedIn', href: profile.socials.linkedin, icon: LinkedinIcon },
  { label: 'LeetCode', href: profile.socials.leetcode, icon: LeetCodeIcon },
  { label: 'Email', href: profile.socials.email, icon: Mail },
]

export function Footer() {
  const year = new Date().getFullYear()

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative overflow-hidden border-t border-edge bg-ink/40">
      {/* giant wordmark */}
      <div className="pointer-events-none select-none px-5 pt-16 sm:px-8">
        <h2
          className="text-center font-display text-[16vw] leading-[0.8] font-extrabold tracking-tighter"
          style={{
            backgroundImage:
              'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.28) 55%, rgba(255,255,255,0.04) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}
        >
          SUTANU
        </h2>
      </div>

      {/* CTA strip */}
      <div className="px-5 sm:px-8">
        <div className="relative mx-auto -mt-8 max-w-6xl overflow-hidden rounded-md border border-edge bg-panel/70 p-8 sm:p-11">
          <div className="animate-aurora pointer-events-none absolute -top-20 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-full bg-neon/12 blur-[90px]" aria-hidden />

          <div className="relative z-10 text-center">
            <h3 className="font-display text-2xl font-extrabold text-fg sm:text-3xl">
              Have an opportunity?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-body-dim">
              I&apos;m actively looking for full-stack and backend roles where Java, Spring Boot and AI meet.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={profile.socials.email}
                className="btn-neon shine px-6 py-3 text-sm"
              >
                <Send size={15} /> Get in touch
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost shine px-6 py-3 text-sm"
              >
                <GithubIcon size={15} /> Browse code
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* links */}
      <div className="mx-auto mt-14 max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 border-b border-edge pb-10 sm:flex-row">
          <button onClick={() => go('home')} className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-sm font-display text-sm font-extrabold"
              style={{
                background: 'linear-gradient(140deg,var(--color-neon),var(--color-cyan))',
                color: '#05050a',
              }}
            >
              {profile.initials}
            </span>
            <span className="text-left">
              <span className="block font-display text-sm font-bold text-fg">{profile.name}</span>
              <span className="block font-mono text-[10px] text-body-dim">@{profile.handle}</span>
            </span>
          </button>

          <nav className="flex flex-wrap items-center justify-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="rounded-full px-3.5 py-2 font-display text-[13px] text-body-dim transition-colors hover:text-neon"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-edge text-body-dim transition-all duration-400 hover:-translate-y-1 hover:border-neon/50 hover:text-neon"
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-7 sm:flex-row">
          <p className="font-mono text-[11px] text-body-dim">
            © {year} {profile.name}. Built with React, Framer Motion &amp; too much coffee.
          </p>
          <p className="font-mono text-[11px] text-body-dim">
            Designed &amp; developed in {profile.location}
          </p>
        </div>
      </div>

      {/* footer ticker */}
      <div className="border-t border-edge bg-panel/40 py-3">
        <Marquee
          items={['Java', 'Spring Boot', 'React', 'Spring AI', 'MySQL', 'Docker', 'PostgreSQL', 'JWT', 'LangGraph']}
          duration={30}
          reverse
          separator="/"
        />
      </div>
    </footer>
  )
}