import { motion } from 'framer-motion'

/* ==========================================================================
   ProjectArt — hand-built animated SVG cover illustrations.

   Monochrome by design: everything is expressed with white/grey value and
   light bloom rather than hue. Each cover has three layers of depth —
   an atmospheric background, a structural mid-layer, and a bright
   foreground of live data motion.
   ========================================================================== */

const VB = '0 0 800 500'

/* ------------------------------------------------------------------ atoms */

/* A packet that travels along an SVG path on repeat */
function Packet({ d, delay = 0, dur = 3, r = 3.4 }) {
  return (
    <>
      <motion.path
        id={`pkt-${d.replace(/[^a-z0-9]/gi, '')}`}
        d={d}
        fill="none"
        stroke="none"
      />
      <motion.circle
        r={r}
        fill="#ffffff"
        filter="url(#pa-bloom)"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
        style={{ offsetPath: `path("${d}")` }}
      />
    </>
  )
}

function Ring({ cx, cy, r, delay = 0, dur = 2.8, color = '#ffffff', w = 1.4 }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={color}
      strokeWidth={w}
      initial={{ scale: 0.5, opacity: 0.7 }}
      animate={{ scale: 2.4, opacity: 0 }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeOut' }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  )
}

/* Bright bar with a travelling sheen, used as a skeleton/data line */
function Bar({ x, y, w, h = 7, delay = 0, fill = '#d4d4d4', opacity = 0.45 }) {
  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={h / 2}
      fill={fill}
      opacity={opacity}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: `${x}px` }}
    />
  )
}

/* ------------------------------------------------------------------ frame */

function Frame({ children, glowAt = '0.3,0.1' }) {
  const [gx, gy] = glowAt.split(',')
  return (
    <svg viewBox={VB} className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden>
      <defs>
        {/* light bloom shared by every glowing element */}
        <filter id="pa-bloom" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pa-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="26" />
        </filter>

        <linearGradient id="pa-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#171719" />
          <stop offset="52%" stopColor="#0e0e10" />
          <stop offset="100%" stopColor="#08080a" />
        </linearGradient>

        <radialGradient id="pa-glow" cx={gx} cy={gy} r="0.85">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="pa-vig" cx="0.5" cy="0.5" r="0.75">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
        </radialGradient>

        <linearGradient id="pa-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <pattern id="pa-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.07" />
        </pattern>

        <pattern id="pa-scan" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="1.4" fill="#ffffff" opacity="0.035" />
        </pattern>
      </defs>

      <rect width="800" height="500" fill="url(#pa-bg)" />
      <rect width="800" height="500" fill="url(#pa-glow)" />
      <rect width="800" height="500" fill="url(#pa-grid)" />

      {children}

      {/* CRT scanlines + vignette sit above the art for cohesion */}
      <rect width="800" height="500" fill="url(#pa-scan)" />
      <rect width="800" height="500" fill="url(#pa-vig)" />
    </svg>
  )
}

/* ==========================================================================
   1 — Gaming e-commerce store
   ========================================================================== */
function StoreArt() {
  const cards = [0, 1, 2, 3, 4, 5]

  return (
    <Frame glowAt="0.25,0.05">
      {/* window chrome */}
      <rect x="34" y="26" width="732" height="30" rx="15" fill="#1c1c1f" stroke="#3a3a3f" />
      <circle cx="58" cy="41" r="4.5" fill="#71717a" />
      <circle cx="74" cy="41" r="4.5" fill="#52525b" />
      <circle cx="90" cy="41" r="4.5" fill="#3f3f46" />
      <rect x="118" y="37" width="200" height="8" rx="4" fill="#3f3f46" />

      {/* search + filters */}
      <rect x="34" y="70" width="452" height="26" rx="13" fill="#141416" stroke="#33333a" />
      <circle cx="54" cy="83" r="6" fill="none" stroke="#71717a" strokeWidth="1.6" />
      <line x1="58.5" y1="88" x2="63" y2="92" stroke="#71717a" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="76" y="79" width="150" height="8" rx="4" fill="#3f3f46" />
      <rect x="500" y="70" width="124" height="26" rx="13" fill="#141416" stroke="#33333a" />
      <rect x="516" y="79" width="66" height="8" rx="4" fill="#3f3f46" />
      <rect x="638" y="70" width="128" height="26" rx="13" fill="#141416" stroke="#33333a" />
      <rect x="654" y="79" width="70" height="8" rx="4" fill="#3f3f46" />

      {/* product grid */}
      {cards.map((i) => {
        const x = 34 + (i % 3) * 246
        const y = 112 + Math.floor(i / 3) * 156
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect x={x} y={y} width="222" height="140" rx="16" fill="#151517" stroke="#33333a" />
            {/* artwork block */}
            <rect x={x} y={y} width="222" height="82" rx="16" fill="#1e1e22" />
            <circle cx={x + 111} cy={y + 41} r="26" fill="none" stroke="#52525b" strokeWidth="1.4" />
            <motion.circle
              cx={x + 111}
              cy={y + 41}
              r="26"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeDasharray="6 8"
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${x + 111}px ${y + 41}px` }}
            />
            <circle cx={x + 111} cy={y + 41} r="7" fill="#ffffff" filter="url(#pa-bloom)" opacity={0.85} />
            <Bar x={x + 18} y={y + 96} w={112} delay={0.2 + i * 0.06} />
            <Bar x={x + 18} y={y + 111} w={58} delay={0.26 + i * 0.06} fill="#ffffff" opacity={0.85} />
            {/* discount pill */}
            <rect x={x + 160} y={y + 92} width="44" height="16" rx="8" fill="#ffffff" opacity={0.14} />
            <rect x={x + 168} y={y + 98} width="28" height="5" rx="2.5" fill="#d4d4d4" />
          </motion.g>
        )
      })}

      {/* live order packet sliding across the grid */}
      <Packet d="M 34 330 L 766 330" delay={0.4} dur={4.2} r={2.6} />

      {/* revenue sparkline */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.6 }}
      >
        <rect x="34" y="424" width="352" height="52" rx="14" fill="#131315" stroke="#2e2e34" />
        <text x="52" y="446" fill="#8d8d8d" fontSize="11" fontFamily="JetBrains Mono, monospace">
          REVENUE · 7D
        </text>
        <motion.path
          d="M 52 466 L 96 458 L 140 462 L 184 450 L 228 454 L 272 444 L 316 448 L 362 436"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <circle cx="362" cy="436" r="3.5" fill="#ffffff" filter="url(#pa-bloom)" />
      </motion.g>

      {/* paid */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 240, damping: 13 }}
        style={{ transformOrigin: '168px 450px' }}
      >
        <circle cx="168" cy="450" r="30" fill="#ffffff" opacity="0.06" filter="url(#pa-soft)" />
        <circle cx="168" cy="450" r="21" fill="#1a1a1d" stroke="#e5e5e5" strokeWidth="1.8" />
        <motion.path
          d="M 159 450 l 6 6 12 -13"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.35, duration: 0.5 }}
        />
      </motion.g>

      {/* cart */}
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="520" y="424" width="246" height="52" rx="26" fill="#ffffff" />
        <rect x="546" y="446" width="86" height="8" rx="4" fill="#0b0b0c" opacity="0.8" />
        <motion.circle
          cx="722"
          cy="450"
          r="14"
          fill="#0b0b0c"
          initial={{ scale: 0.6 }}
          animate={{ scale: [0.6, 1.15, 1] }}
          transition={{ delay: 1.3, duration: 0.5 }}
        />
        <text x="722" y="455" textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="JetBrains Mono, monospace">
          3
        </text>
      </motion.g>
    </Frame>
  )
}

/* ==========================================================================
   2 — Agentic AI supply chain
   ========================================================================== */
function SupplyArt() {
  const nodes = [
    { id: 'sup', x: 110, y: 108 },
    { id: 'wh', x: 316, y: 62 },
    { id: 'inv', x: 316, y: 196 },
    { id: 'ship', x: 520, y: 108 },
    { id: 'ord', x: 700, y: 174 },
    { id: 'inc', x: 610, y: 322 },
  ]
  const at = (id) => nodes.find((n) => n.id === id)
  const edges = [
    ['sup', 'wh'],
    ['sup', 'inv'],
    ['wh', 'ship'],
    ['inv', 'ship'],
    ['ship', 'ord'],
    ['ord', 'inc'],
    ['ship', 'inc'],
  ]
  const paths = edges.map(([a, b]) => `M ${at(a).x} ${at(a).y} L ${at(b).x} ${at(b).y}`)

  return (
    <Frame glowAt="0.75,0.1">
      {/* edges */}
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="#5a5a62"
          strokeWidth="1.3"
          strokeDasharray="5 7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.1 + i * 0.11, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* travelling data packets */}
      {paths.slice(0, 5).map((d, i) => (
        <Packet key={`pk${i}`} d={d} delay={i * 0.55} dur={3.4} r={2.8} />
      ))}

      {/* nodes */}
      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 250, damping: 15 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <Ring cx={n.x} cy={n.y} delay={i * 0.3} />
          <circle cx={n.x} cy={n.y} r="19" fill="#141416" stroke="#d4d4d4" strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="6" fill="#ffffff" filter="url(#pa-bloom)" />
        </motion.g>
      ))}

      {/* agent reasoning strip */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="34" y="386" width="330" height="82" rx="16" fill="#131315" stroke="#2e2e34" />
        <text x="52" y="410" fill="#8d8d8d" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
          AGENT · RECOVERY PLAN
        </text>
        <Bar x="52" y="422" w="212" delay={1.05} />
        <Bar x="52" y="440" w="264" delay={1.15} opacity={0.3} />
        <Bar x="52" y="458" w="150" delay={1.25} opacity={0.22} />
      </motion.g>

      {/* severity bars */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.7 }}
      >
        <rect x="380" y="386" width="386" height="82" rx="16" fill="#131315" stroke="#2e2e34" />
        <text x="398" y="410" fill="#8d8d8d" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
          THROUGHPUT
        </text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.rect
            key={i}
            x={398 + i * 40}
            y={456 - (14 + ((i * 37) % 26))}
            width="22"
            height={14 + ((i * 37) % 26)}
            rx="4"
            fill="#d4d4d4"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: i === 8 ? 1 : 0.55 }}
            transition={{ delay: 1.15 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `bottom` }}
          />
        ))}
      </motion.g>
    </Frame>
  )
}

/* ==========================================================================
   3 — CrimeNet AI
   ========================================================================== */
function CrimeNetArt() {
  const hub = { x: 400, y: 232 }
  const nodes = [
    { x: 400, y: 232, r: 24, c: '#ffffff', hub: true },
    { x: 196, y: 118, r: 13 },
    { x: 606, y: 126, r: 15 },
    { x: 130, y: 320, r: 11 },
    { x: 672, y: 316, r: 12 },
    { x: 286, y: 414, r: 10 },
    { x: 536, y: 418, r: 11 },
    { x: 396, y: 78, r: 9 },
    { x: 300, y: 214, r: 8 },
    { x: 508, y: 214, r: 9 },
    { x: 452, y: 116, r: 8 },
  ]
  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [1, 7], [2, 7], [1, 8], [8, 0], [9, 0], [10, 2], [8, 5], [9, 6], [1, 2], [3, 5], [4, 6],
  ]

  return (
    <Frame glowAt="0.5,0.5">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={a === 0 || b === 0 ? '#8a8a92' : '#4a4a52'}
          strokeWidth={a === 0 || b === 0 ? 1.5 : 0.9}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: a === 0 || b === 0 ? 0.75 : 0.45 }}
          transition={{ delay: 0.05 * i, duration: 0.7 }}
        />
      ))}

      {/* hub pulses */}
      <Ring cx={hub.x} cy={hub.y} r={26} />
      <Ring cx={hub.x} cy={hub.y} r={26} delay={1.4} />
      <Ring cx={hub.x} cy={hub.y} r={26} delay={2.8} color="#d4d4d4" />

      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.055, type: 'spring', stiffness: 270, damping: 14 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          {n.hub && <circle cx={n.x} cy={n.y} r={n.r} fill="#ffffff" opacity="0.22" filter="url(#pa-soft)" />}
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.hub ? '#ffffff' : '#1c1c20'}
            stroke={n.hub ? '#ffffff' : '#a3a3aa'}
            strokeWidth={n.hub ? 2 : 1.4}
          />
          {!n.hub && <circle cx={n.x} cy={n.y} r={n.r * 0.3} fill="#d4d4d4" />}
        </motion.g>
      ))}

      {/* intel panel */}
      <motion.g
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        <rect x="34" y="382" width="232" height="86" rx="16" fill="#131315" stroke="#2e2e34" />
        <text x="52" y="406" fill="#8d8d8d" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
          ENTITIES · EDGES
        </text>
        <text x="52" y="440" fill="#ffffff" fontSize="26" fontFamily="Sora, sans-serif" fontWeight="700">
          128
        </text>
        <text x="118" y="440" fill="#6b6b72" fontSize="26" fontFamily="Sora, sans-serif" fontWeight="700">
          412
        </text>
        <Bar x="52" y="452" w="196" delay={1.15} opacity={0.28} />
      </motion.g>

      {/* cluster legend */}
      <motion.g
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.12, duration: 0.7 }}
      >
        <rect x="534" y="382" width="232" height="86" rx="16" fill="#131315" stroke="#2e2e34" />
        <text x="552" y="406" fill="#8d8d8d" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
          CLUSTERS
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="560" cy={430 + i * 22} r="5" fill={i === 0 ? '#ffffff' : '#8a8a92'} />
            <Bar x={576} y={426 + i * 22} w={130 - i * 34} delay={1.2 + i * 0.06} opacity={0.3} />
          </g>
        ))}
      </motion.g>
    </Frame>
  )
}

/* ==========================================================================
   4 — Smart AI email assistant
   ========================================================================== */
function EmailArt() {
  const lines = [1, 1, 1, 0.8, 1, 0.62, 1, 0.85, 0.45]

  return (
    <Frame glowAt="0.8,0.2">
      {/* compose window */}
      <motion.rect
        x="44"
        y="40"
        width="404"
        height="420"
        rx="20"
        fill="#141416"
        stroke="#33333a"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      />
      <path d="M44 60a20 20 0 0 1 20-20h364a20 20 0 0 1 20 20v34H44z" fill="#1d1d21" />
      <circle cx="70" cy="67" r="5" fill="#71717a" />
      <circle cx="86" cy="67" r="5" fill="#52525b" />
      <rect x="116" y="63" width="130" height="8" rx="4" fill="#45454b" />

      {['To', 'Subject'].map((l, i) => (
        <g key={l}>
          <text x="66" y={128 + i * 44} fill="#7a7a82" fontSize="12" fontFamily="JetBrains Mono, monospace">
            {l}
          </text>
          <Bar x="112" y={121 + i * 44} w={214 - i * 62} delay={0.25 + i * 0.08} opacity={0.42} />
          <line x1="66" y1={148 + i * 44} x2="428" y2={148 + i * 44} stroke="#2a2a30" />
        </g>
      ))}

      {/* generated body — typewriter sweep */}
      {lines.map((mul, i) => (
        <motion.rect
          key={i}
          x="66"
          y={202 + i * 24}
          width={330 * mul}
          height="8"
          rx="4"
          fill={i === 3 ? '#ffffff' : '#c9c9cf'}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4 + i * 0.09, duration: 0.42, ease: 'easeOut' }}
          style={{ transformOrigin: '66px' }}
        />
      ))}

      {/* live caret */}
      <motion.rect
        x="66"
        y={202 + lines.length * 24}
        width="3"
        height="12"
        fill="#ffffff"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* tone selector */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <rect x="472" y="104" width="284" height="212" rx="20" fill="#141416" stroke="#33333a" />
        <text x="494" y="132" fill="#7a7a82" fontSize="10.5" letterSpacing="1.6" fontFamily="JetBrains Mono, monospace">
          TONE
        </text>
        {['Professional', 'Friendly', 'Direct', 'Apologetic'].map((t, i) => (
          <motion.g
            key={t}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 + i * 0.09, duration: 0.5 }}
          >
            <rect
              x="494"
              y={148 + i * 40}
              width="240"
              height="30"
              rx="15"
              fill={i === 0 ? '#1f1f23' : '#171719'}
              stroke={i === 0 ? '#ffffff' : '#2e2e34'}
              strokeWidth={i === 0 ? 1.6 : 1}
            />
            {i === 0 && (
              <motion.circle
                cx="716"
                cy={163 + i * 40}
                r="5"
                fill="#ffffff"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.95, type: 'spring', stiffness: 300, damping: 14 }}
                style={{ transformOrigin: '716px 163px' }}
              />
            )}
            <rect x="512" y={160 + i * 40} width={76 + (i % 2) * 34} height="7" rx="3.5" fill={i === 0 ? '#ffffff' : '#6b6b72'} />
          </motion.g>
        ))}
      </motion.g>

      {/* model badge */}
      <motion.g
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <rect x="472" y="332" width="284" height="40" rx="20" fill="#131315" stroke="#2e2e34" />
        <circle cx="496" cy="352" r="5" fill="#ffffff" filter="url(#pa-bloom)" />
        <rect x="512" y="348" width="120" height="7" rx="3.5" fill="#8a8a92" />
        <rect x="676" y="344" width="58" height="16" rx="8" fill="#ffffff" opacity="0.12" />
      </motion.g>

      {/* generate */}
      <motion.rect
        x="472"
        y="392"
        width="284"
        height="52"
        rx="26"
        fill="#ffffff"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.12, type: 'spring', stiffness: 230, damping: 14 }}
        style={{ transformOrigin: '614px 418px' }}
      />
      <rect x="540" y="415" width="148" height="8" rx="4" fill="#0b0b0c" opacity="0.82" />
      <motion.circle
        cx="722"
        cy="418"
        r="9"
        fill="#0b0b0c"
        animate={{ scale: [1, 1.3, 1], opacity: [0.9, 0.4, 0.9] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '722px 418px' }}
      />
    </Frame>
  )
}

/* ==========================================================================
   5 — RescueFlow AI
   ========================================================================== */
function RescueArt() {
  const rows = [
    { y: 140, w: 300 },
    { y: 198, w: 232 },
    { y: 256, w: 268 },
    { y: 314, w: 190 },
  ]

  return (
    <Frame glowAt="0.15,0.85">
      {/* alert banner */}
      <motion.g initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
        <rect x="34" y="34" width="732" height="66" rx="18" fill="#171719" stroke="#3a3a40" />
        <motion.circle
          cx="72"
          cy="67"
          r="16"
          fill="#ffffff"
          fillOpacity="0.1"
          stroke="#ffffff"
          strokeWidth="1.8"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="72" cy="67" r="5" fill="#ffffff" />
        <Bar x="102" y="54" w={252} h={9} delay={0.2} opacity={0.9} fill="#ffffff" />
        <Bar x="102" y="76" w={340} h={7} delay={0.3} opacity={0.3} />
        <rect x="612" y="52" width="128" height="30" rx="15" fill="#ffffff" />
        <rect x="632" y="63" width="88" height="8" rx="4" fill="#0b0b0c" opacity="0.8" />
      </motion.g>

      {/* timeline rail */}
      <line x1="78" y1="130" x2="78" y2="410" stroke="#33333a" strokeWidth="2" />
      <motion.rect
        x="77"
        y="130"
        width="2"
        height="280"
        fill="#ffffff"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.7 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '78px 130px' }}
      />

      {rows.map((r, i) => (
        <motion.g
          key={r.y}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <circle cx="78" cy={r.y + 16} r="9" fill="#141416" stroke="#d4d4d4" strokeWidth="2" />
          {i === 3 && <Ring cx="78" cy={r.y + 16} r={9} delay={0.6} dur={2.4} color="#ffffff" />}
          <rect x="106" y={r.y} width="440" height="32" rx="16" fill="#151517" stroke="#2e2e34" />
          <rect x="124" y={r.y + 12} width={r.w} height="8" rx="4" fill="#c9c9cf" opacity={0.6} />
          <rect x="566" y={r.y + 6} width="76" height="20" rx="10" fill="#ffffff" opacity={0.12} />
          <rect x="584" y={r.y + 13} width="40" height="6" rx="3" fill="#d4d4d4" />
        </motion.g>
      ))}

      {/* dispatch unit */}
      <motion.g
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '714px 172px' }}
      >
        <circle cx="714" cy="172" r="52" fill="#ffffff" opacity="0.05" filter="url(#pa-soft)" />
        <rect x="666" y="126" width="96" height="92" rx="26" fill="#ffffff" opacity="0.08" stroke="#ffffff" strokeOpacity="0.4" />
        <rect x="692" y="152" width="44" height="40" rx="8" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <path d="M704 144v-8M724 144v-8" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="714" cy="172" r="9" fill="#ffffff" filter="url(#pa-bloom)" />
      </motion.g>

      {/* severity meter */}
      <motion.g
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.65 }}
      >
        <rect x="106" y="380" width="536" height="66" rx="16" fill="#131315" stroke="#2e2e34" />
        <text x="126" y="404" fill="#7a7a82" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
          ESCALATION
        </text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <motion.rect
            key={i}
            x={126 + i * 42}
            y={418}
            width="30"
            height="12"
            rx="4"
            fill="#d4d4d4"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: i > 7 ? 0.9 : 0.3 }}
            transition={{ delay: 1.1 + i * 0.045, duration: 0.4 }}
            style={{ transformOrigin: `${126 + i * 42}px` }}
          />
        ))}
      </motion.g>
    </Frame>
  )
}

/* ==========================================================================
   6 — Real-time chat application
   ========================================================================== */
function ChatArt() {
  const bubbles = [
    { x: 40, y: 74, w: 264, out: false },
    { x: 268, y: 146, w: 214, out: true },
    { x: 40, y: 218, w: 300, out: false },
    { x: 306, y: 290, w: 176, out: true },
    { x: 40, y: 362, w: 240, out: false },
  ]

  return (
    <Frame glowAt="0.7,0.15">
      {bubbles.map((b, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.12 + i * 0.13, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height="60"
            rx="20"
            fill={b.out ? '#f2f2f4' : '#18181b'}
            stroke={b.out ? 'none' : '#33333a'}
          />
          <rect
            x={b.x + 18}
            y={b.y + 19}
            width={b.w - 58}
            height="8"
            rx="4"
            fill={b.out ? '#0b0b0c' : '#c9c9cf'}
            opacity={b.out ? 0.8 : 0.6}
          />
          <rect
            x={b.x + 18}
            y={b.y + 35}
            width={b.w - 100}
            height="8"
            rx="4"
            fill={b.out ? '#0b0b0c' : '#c9c9cf'}
            opacity={b.out ? 0.45 : 0.3}
          />
          {/* avatar */}
          <circle cx={b.out ? b.x + b.w + 26 : b.x - 0} cy={b.y + 30} r="14" fill="#1e1e22" stroke="#4a4a52" />
          <circle cx={b.out ? b.x + b.w + 26 : b.x} cy={b.y + 30} r="6" fill="#a3a3aa" />
        </motion.g>
      ))}

      {/* typing indicator */}
      <motion.g
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="40" y="436" width="96" height="38" rx="19" fill="#18181b" stroke="#33333a" />
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={76 + i * 22}
            cy="455"
            r="5"
            fill="#d4d4d4"
            animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.05, repeat: Infinity, delay: i * 0.16, ease: 'easeInOut' }}
          />
        ))}
      </motion.g>

      {/* composer */}
      <rect x="152" y="436" width="504" height="38" rx="19" fill="#141416" stroke="#33333a" />
      <rect x="176" y="451" width="200" height="8" rx="4" fill="#4a4a52" />
      <motion.circle
        cx="628"
        cy="455"
        r="13"
        fill="#ffffff"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '628px 455px' }}
      />

      {/* image attachment */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.95, type: 'spring', stiffness: 230, damping: 14 }}
        style={{ transformOrigin: '680px 148px' }}
      >
        <rect x="586" y="66" width="188" height="120" rx="16" fill="#141416" stroke="#4a4a52" />
        <motion.rect
          x="598"
          y="78"
          width="164"
          height="96"
          rx="10"
          fill="#1e1e22"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <path d="M606 166l34-38 24 24 30-34 44 48z" fill="#6b6b72" />
        <circle cx="632" cy="102" r="10" fill="#a3a3aa" />
        <rect x="598" y="182" width="70" height="7" rx="3.5" fill="#5a5a62" />
      </motion.g>

      {/* socket pulse */}
      <Packet d="M 660 210 L 660 300" delay={0.5} dur={2.6} r={2.6} />
      <motion.circle
        cx="660"
        cy="212"
        r="6"
        fill="#ffffff"
        filter="url(#pa-bloom)"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </Frame>
  )
}

const ART = {
  'gaming-store': StoreArt,
  'supply-chain': SupplyArt,
  'crimenet': CrimeNetArt,
  'email-assistant': EmailArt,
  'rescueflow': RescueArt,
  'chat-app': ChatArt,
}

export function ProjectArt({ id }) {
  const Cmp = ART[id] ?? StoreArt
  return <Cmp />
}