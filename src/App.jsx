import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { BackToTop, CustomCursor, ScrollProgress } from './components/Effects'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { profile } from './data/portfolio'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  const done = useCallback(() => setLoading(false), [])

  return (
    <>
      <Preloader onDone={done} />
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <AnimatePresence>
        {!loading && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="crt relative"
          >
            <div className="grain" aria-hidden />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Floating "hire me" bubble, appears after the hero */}
      <FloatingHire hidden={loading} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />

      {/* Crawler fallback — the hero renders a real <h1>, so keep this to a paragraph
          to avoid a duplicate H1 in the document. */}
      <p className="sr-only">
        {profile.name} — {profile.summary}
      </p>
    </>
  )
}

function FloatingHire({ hidden, onClick }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (hidden) return
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hidden])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={onClick}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="btn-neon fixed bottom-5 left-5 z-[9980] hidden items-center gap-2 px-5 py-3 text-[13px] sm:flex"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#05050a] animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#05050a]" />
          </span>
          Let's connect
          <ArrowRight size={14} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}