import { useRef, useEffect, useState } from 'react'
import { GlowOrb, SectionBadge, SectionTitle, useReveal, MeshBg } from './Shared'

/* Radar hexagonal SVG */
function RadarChart({ pct, color, size = 80 }) {
  const points = 6
  const cx = size / 2, cy = size / 2, r = size * 0.35
  const coords = (i, rr) => {
    const a = (Math.PI * 2 / points) * i - Math.PI / 2
    return { x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a) }
  }
  const poly = (rr) => Array.from({ length: points }, (_, i) => coords(i, rr))
    .map(p => `${p.x},${p.y}`).join(' ')

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={poly(r)} fill="rgba(0,0,0,0.35)" stroke="none" />
      {[1, 0.66, 0.33].map(f => (
        <polygon key={f} points={poly(r * f)}
          fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
      ))}
      {Array.from({ length: points }, (_, i) => {
        const p = coords(i, r)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
          stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
      })}
      <polygon points={poly(r * (pct / 100))}
        fill={color} fillOpacity="0.40" stroke={color} strokeWidth="1.5" strokeOpacity="1" />
      {Array.from({ length: points }, (_, i) => {
        const p = coords(i, r * (pct / 100))
        return <circle key={i} cx={p.x} cy={p.y} r="1.5" fill={color} opacity="1" />
      })}
      <circle cx={cx} cy={cy} r="2" fill={color} opacity="0.9" />
    </svg>
  )
}

function SkillCard({ group, index }) {
  const [hovered, setHovered] = useState(false)
  const [ref, visible] = useReveal(0.12)
  const pct = group.pct ?? 80

  return (
    <div
      ref={ref}
      className="relative rounded-2xl border overflow-hidden transition-all duration-500 cursor-default"
      style={{
        background: hovered ? 'var(--surface2)' : 'var(--surface)',
        borderColor: hovered ? group.color : 'var(--border)',
        boxShadow: hovered
          ? `0 8px 40px ${group.color}22, 0 0 0 1px ${group.color}18, inset 0 0 30px ${group.color}05`
          : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transitionDelay: `${index * 70}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${group.color}, transparent)`,
          opacity: hovered ? 1 : 0.25,
        }}
      />
      {/* Scan effect */}
      {hovered && <span className="scan-overlay" />}

      {/* Glow bg */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl transition-opacity duration-500"
        style={{ background: group.color, opacity: hovered ? 0.12 : 0 }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-3">
        <div>
          <h3
            className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-1"
            style={{ color: group.color }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 6px ${group.color}` }} />
            {group.title}
          </h3>
          {/* Mini barra de nivel */}
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-1 w-4 rounded-sm transition-all duration-300"
                style={{
                  background: i < Math.round(pct / 20)
                    ? group.color
                    : 'var(--border)',
                  boxShadow: i < Math.round(pct / 20) ? `0 0 4px ${group.color}` : 'none',
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex-shrink-0" style={{ width: 56, height: 56 }}>
          <RadarChart pct={pct} color={group.color} size={56} />
        </div>
      </div>

      {/* Tags */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-wrap gap-1.5 sm:gap-2">
        {group.items.map(item => (
          <span
            key={item.label}
            className="text-xs px-2.5 py-1 rounded-lg border transition-all duration-200"
            style={
              item.hi
                ? { color: group.color, borderColor: `${group.color}50`, background: `${group.color}10` }
                : { color: 'var(--muted)', borderColor: 'var(--border)', background: 'var(--bg)' }
            }
          >
            {item.hi && <span className="mr-1" style={{ color: group.color }}>✦</span>}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Barra de expertise neon animada */
function ExpertiseBar({ label, pct, color, delay = 0 }) {
  const [ref, visible] = useReveal(0.2)
  return (
    <div ref={ref} className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>{label}</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: visible ? `${pct}%` : '0%',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: visible ? `0 0 10px ${color}60, 0 0 20px ${color}30` : 'none',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

export default function Skills({ skills }) {
  if (!skills?.length) return null

  const augmented = skills.map((g, i) => ({
    ...g,
    pct: [92, 80, 85, 78, 82, 70][i] ?? 75,
  }))

  return (
    <section id="habilidades" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      <MeshBg />
      <GlowOrb x="80%" y="50%" color="var(--brand2)" size={450} opacity={0.07} />
      <GlowOrb x="5%"  y="30%" color="var(--cyan)"   size={300} opacity={0.05} />

      <div className="relative z-10 mb-14">
        <SectionBadge label="Stack tecnológico" color="brand" />
        <SectionTitle>Habilidades &amp; <span className="gradient-text">tecnologías</span></SectionTitle>
        <p className="mt-3 text-sm max-w-xl text-justify" style={{ color: 'var(--muted)' }}>
          Tecnologías que uso día a día en proyectos de producción — desde APIs gubernamentales hasta e-commerce y bots.
        </p>
      </div>

      {/* Cards grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
        {augmented.map((group, i) => (
          <SkillCard key={group.title} group={group} index={i} />
        ))}
      </div>

      {/* Expertise bars con diseño neon */}
      <div
        className="relative z-10 rounded-2xl border p-6 lg:p-8 overflow-hidden"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {/* Scan line de fondo */}
        <span className="scan-overlay" />

        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(79,142,247,0.1)', color: 'var(--brand)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
            </svg>
          </div>
          <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--brand)' }}>
            Nivel de expertise
          </h4>
          <div className="ml-auto h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, var(--border), transparent)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {[
            { label: 'React / Vite',         pct: 88, color: '#38c5d9', delay: 0   },
            { label: 'Node.js / Express',     pct: 85, color: '#3dd68c', delay: 100 },
            { label: 'TypeScript',            pct: 80, color: '#4f8ef7', delay: 200 },
            { label: 'MySQL / PostgreSQL',    pct: 75, color: '#f7b155', delay: 300 },
            { label: 'Docker / Vercel',       pct: 68, color: '#b07ef7', delay: 400 },
            { label: 'REST APIs / JWT',       pct: 82, color: '#f76f6f', delay: 100 },
          ].map(bar => (
            <ExpertiseBar key={bar.label} {...bar} />
          ))}
        </div>
      </div>
    </section>
  )
}
