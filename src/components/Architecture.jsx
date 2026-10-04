import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/* ==========================================================================
   ArchitectureDiagram — a single self-consistent SVG coordinate space, so the
   connector lines and the node cards can never drift apart.
   ========================================================================== */

const NODES = [
  { id: 'react', label: 'React', sub: 'Frontend', cx: 180, cy: 64, tone: 'neon' },
  { id: 'rest', label: 'REST APIs', sub: 'Transport', cx: 540, cy: 64, tone: 'cyan' },
  { id: 'boot', label: 'Spring Boot', sub: 'Java Backend', cx: 360, cy: 180, tone: 'iris' },
  { id: 'security', label: 'Security', sub: 'JWT + RBAC', cx: 110, cy: 320, tone: 'neon' },
  { id: 'db', label: 'MySQL / PG', sub: 'Database', cx: 360, cy: 320, tone: 'cyan' },
  { id: 'llm', label: 'LLM Services', sub: 'Spring AI · Gemini', cx: 610, cy: 320, tone: 'neon' },
  { id: 'agent', label: 'Agent Layer', sub: 'Python · LangGraph', cx: 180, cy: 448, tone: 'iris' },
]

/* Box geometry */
const W = 208
const H = 72

const TONES = {
  neon: { stroke: '#7ba3d9', text: '#a3c0e6', chip: 'rgba(123,163,217,0.14)' },
  cyan: { stroke: '#4d72ab', text: '#8fb2e0', chip: 'rgba(77,114,171,0.16)' },
  iris: { stroke: '#6b8fc4', text: '#9dbcfb', chip: 'rgba(107,143,196,0.14)' },
}

const box = (n) => ({ x: n.cx - W / 2, y: n.cy - H / 2 })

/* Connectors drawn as smooth curves between explicit anchor points */
const EDGES = [
  { d: 'M 284 64 L 436 64', delay: 0.15, tone: '#4d72ab' },
  { d: 'M 540 100 C 540 132 462 126 404 144', delay: 0.28, tone: '#3d5c8c' },
  { d: 'M 300 214 C 252 240 182 250 130 284', delay: 0.41, tone: '#4d72ab' },
  { d: 'M 360 216 L 360 284', delay: 0.54, tone: '#3d5c8c' },
  { d: 'M 420 214 C 468 240 538 250 590 284', delay: 0.67, tone: '#4d72ab' },
  { d: 'M 284 448 C 400 462 540 432 604 358', delay: 0.8, tone: '#6b8fc4' },
  { d: 'M 192 412 C 258 400 318 380 346 358', delay: 0.93, tone: '#6b8fc4' },
]

export function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 720 520"
      className="h-auto w-full"
      role="img"
      aria-label="Application architecture: a React frontend calls REST APIs into a Spring Boot Java backend, which fans out to Spring Security, a SQL database and LLM services, with a Python and LangGraph agent layer reading state and using the LLMs"
    >
      <defs>
        <pattern id="arch-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0v30" fill="none" stroke="var(--color-edge)" strokeWidth="1" opacity="0.55" />
        </pattern>
      </defs>

      <rect width="720" height="520" fill="url(#arch-grid)" opacity="0.5" rx="6" />

      {/* ---------- edges (drawn first so nodes sit on top) ---------- */}
      {EDGES.map((e, i) => (
        <motion.path
          key={i}
          d={e.d}
          fill="none"
          stroke={e.tone}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="6 6"
          opacity="0.7"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: e.delay, ease: EASE }}
        />
      ))}

      {/* ---------- nodes ---------- */}
      {NODES.map((n, i) => {
        const b = box(n)
        const tone = TONES[n.tone]
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.11, ease: EASE }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          >
            <rect
              x={b.x}
              y={b.y}
              width={W}
              height={H}
              rx="6"
              fill="var(--color-navy)"
              stroke={tone.stroke}
              strokeWidth="1.3"
            />

            {/* icon chip */}
            <rect x={b.x + 16} y={n.cy - 17} width="34" height="34" rx="4" fill={tone.chip} />
            <circle cx={b.x + 33} cy={n.cy} r="5.5" fill={tone.text} />

            <text
              x={b.x + 62}
              y={n.cy - 4}
              fill="var(--color-fg)"
              fontFamily="Sora, sans-serif"
              fontSize="15"
              fontWeight="700"
            >
              {n.label}
            </text>
            <text
              x={b.x + 62}
              y={n.cy + 16}
              fill="var(--color-fg-faint)"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10.5"
            >
              {n.sub}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}

/* -------------------------------------------------------------------------
   Mobile fallback — the same flow as a vertical stack (no SVG needed)
   ------------------------------------------------------------------------- */
export function ArchitectureStack() {
  return (
    <div className="flex flex-col">
      {NODES.map((n, i) => {
        const tone = TONES[n.tone]
        return (
          <div key={n.id} className="flex flex-col">
            <motion.div
              className="flex items-center gap-3 rounded-md border px-4 py-3.5"
              style={{ background: 'var(--color-navy)', borderColor: tone.stroke }}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm"
                style={{ background: tone.chip }}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: tone.text }} />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-fg">{n.label}</p>
                <p className="font-mono text-[10px] text-body-dim">{n.sub}</p>
              </div>
            </motion.div>
            {i < NODES.length - 1 && (
              <div className="my-1 h-5 w-px self-center bg-gradient-to-b from-neon/50 to-transparent" />
            )}
          </div>
        )
      })}
    </div>
  )
}