import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'
import { EASE, useActiveSection } from '../lib/motion'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'

const sectionIds = navLinks.map((l) => l.id)

export function Navbar({ theme, onToggleTheme }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  // lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[9970] px-4 pt-4 sm:px-6"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-md px-4 py-3 transition-all duration-500 sm:px-5 ${
            scrolled
              ? 'glass squircle shadow-[0_18px_50px_-24px_rgba(0,0,0,0.7)]'
              : 'border border-transparent'
          }`}
        >
          {/* Brand */}
          <button
            onClick={() => go('home')}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span
              className="relative flex h-9 w-9 items-center justify-center rounded-sm font-display text-sm font-extrabold transition-transform duration-500 group-hover:rotate-[18deg]"
              style={{
                background: 'linear-gradient(140deg,var(--color-neon),var(--color-cyan))',
                color: '#05050a',
              }}
            >
              {profile.initials}
            </span>
            <span className="hidden font-display text-sm font-bold tracking-tight text-fg sm:block">
              {profile.name}
            </span>
            <span className="sr-only">— back to top</span>
          </button>

          {/* Desktop pill nav */}
          <div className="pill-nav hidden md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="relative rounded-full px-4 py-2 font-display text-[13px] font-medium transition-colors duration-300"
                style={{ color: active === link.id ? '#05050a' : 'var(--color-body)' }}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(120deg,var(--color-neon),var(--color-cyan))' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle colour theme"
              className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-edge text-body transition-colors duration-300 hover:text-neon"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ y: 14, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -14, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="absolute"
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-edge text-body transition-colors duration-300 hover:text-neon sm:flex"
            >
              <GithubIcon size={15} />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-edge text-body transition-colors duration-300 hover:text-neon sm:flex"
            >
              <LinkedinIcon size={15} />
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-edge text-body transition-colors duration-300 hover:text-neon md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9960] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'color-mix(in srgb, var(--color-void) 88%, transparent)', backdropFilter: 'blur(18px)' }}
              onClick={() => setOpen(false)}
            />
            <motion.ul
              className="relative flex h-full flex-col items-center justify-center gap-2 px-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
                    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
                  }}
                  className="w-full max-w-xs"
                >
                  <button
                    onClick={() => go(link.id)}
                    className="flex w-full items-center justify-between rounded-md border border-edge bg-panel/60 px-5 py-4 font-display text-lg font-semibold text-fg transition-colors hover:border-neon/50"
                  >
                    {link.label}
                    <span className="font-mono text-[10px] text-neon">
                      0{navLinks.indexOf(link) + 1}
                    </span>
                  </button>
                </motion.li>
              ))}

              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="mt-6 flex gap-3"
              >
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-neon px-5 py-3 text-sm"
                >
                  <GithubIcon size={15} /> GitHub
                </a>
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer noopener" className="btn-ghost px-5 py-3 text-sm">
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}