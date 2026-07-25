import { useRef, useEffect, useState } from 'react'
import { GlowOrb, SectionBadge, SectionTitle, Counter, useReveal, MeshBg } from './Shared'

/* Timeline de experiencia */
const experience = [
  {
    period:   '2023 – Actualidad',
    role:     'Full Stack Developer',
    company:  'Proyectos Propios · Freelance',
    desc:     'Desarrollo de aplicaciones web completas con React, Node.js y TypeScript. APIs REST, integración de bases de datos relacionales, autenticación JWT y despliegue en la nube.',
    color:    '#4f8ef7',
    icon:     '🚀',
    current:  true,
  },
  {
    period:   '2022 – 2023',
    role:     'Desarrollador Web',
    company:  'Experiencia Profesional',
    desc:     'Participación en proyectos de desarrollo web colaborativos. Implementación de funcionalidades frontend y backend, trabajo en equipo con metodologías ágiles.',
    color:    '#b07ef7',
    icon:     '💼',
    current:  false,
  },
  {
    period:   '2021 – 2022',
    role:     'Inicio en el desarrollo',
    company:  'Aprendizaje & Proyectos académicos',
    desc:     'Primeros proyectos con JavaScript, React y Node.js. Construcción de bases de código, APIs REST y primeras SPA. Aprendizaje autodidacta y constante.',
    color:    '#3dd68c',
    icon:     '🌱',
    current:  false,
  },
]

function TimelineItem({ item, index }) {
  const [ref, visible] = useReveal(0.15)
  const [hovered, setHovered] = useState(false)
  return (
    <div
      ref={ref}
      className="relative pl-10 pb-10 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Línea vertical */}
      {index < experience.length - 1 && (
        <div
          className="absolute left-3.5 top-8 bottom-0 w-px"
          style={{ background: `linear-gradient(to bottom, ${item.color}60, transparent)` }}
        />
      )}

      {/* Dot */}
      <div
        className="absolute left-0 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs transition-all duration-300"
        style={{
          background: `${item.color}18`,
          borderColor: item.color,
          boxShadow: item.current ? `0 0 16px ${item.color}50` : hovered ? `0 0 10px ${item.color}40` : 'none',
        }}
      >
        {item.icon}
      </div>

      {/* Content */}
      <div
        className="rounded-xl border p-5 transition-all duration-300"
        style={{
          background: hovered ? 'var(--surface2)' : 'var(--surface)',
          borderColor: hovered ? item.color : 'var(--border)',
          boxShadow: hovered ? `0 0 24px ${item.color}18` : 'none',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-xl transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${item.color}, transparent)`,
            opacity: hovered ? 0.6 : 0,
          }}
        />
        <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
          <div>
            <h4 className="text-sm font-bold" style={{ color: 'var(--text)' }}>{item.role}</h4>
            <p className="text-xs font-semibold" style={{ color: item.color }}>{item.company}</p>
          </div>
          <div className="flex items-center gap-2">
            {item.current && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                style={{ color: 'var(--green)', borderColor: 'rgba(61,214,140,0.3)', background: 'rgba(61,214,140,0.07)' }}
              >
                ● Actual
              </span>
            )}
            <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{item.period}</span>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-justify" style={{ color: 'var(--muted)' }}>{item.desc}</p>
      </div>
    </div>
  )
}

function StatCard({ stat, index }) {
  const numStr = stat.num.replace(/\D/g, '')
  const suffix = stat.num.replace(/[\d]/g, '')
  const target = parseInt(numStr) || 0
  const [ref, visible] = useReveal(0.2)
  const [hovered, setHovered] = useState(false)

  const colors = ['#4f8ef7', '#b07ef7', '#38c5d9', '#3dd68c']
  const color = colors[index % colors.length]

  return (
    <div
      ref={ref}
      className="relative rounded-2xl border p-6 overflow-hidden transition-all duration-500 cursor-default"
      style={{
        background:  'var(--surface)',
        borderColor: hovered ? color : 'var(--border)',
        opacity:     visible ? 1 : 0,
        transform:   visible
          ? hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)'
          : 'translateY(20px) scale(0.97)',
        boxShadow: hovered ? `0 8px 40px ${color}18, 0 0 0 1px ${color}12` : 'none',
        transitionDelay: `${index * 90}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Scan line */}
      {hovered && <span className="scan-overlay" />}

      {/* Glow bg */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at top right, ${color}12, transparent 70%)`, opacity: hovered ? 1 : 0 }}
      />

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="text-4xl font-black mb-2 leading-none stat-num" style={{ color }}>
        {visible ? <Counter target={target} suffix={suffix} /> : `0${suffix}`}
      </div>
      <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
        {stat.label}
      </div>
    </div>
  )
}

/* Párrafo con keywords destacadas */
function BioParagraph({ text, keywords }) {
  if (!keywords?.length) {
    return <p className="text-sm leading-relaxed text-justify" style={{ color: 'var(--muted)' }}>{text}</p>
  }
  const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'g'))
  return (
    <p className="text-sm leading-relaxed text-justify" style={{ color: 'var(--muted)' }}>
      {parts.map((part, i) =>
        keywords.includes(part)
          ? <span key={i} className="font-semibold" style={{ color: 'var(--text)' }}>{part}</span>
          : part
      )}
    </p>
  )
}

const bioKeywords = [
  ['Full Stack', 'Buenos Aires', 'React', 'Node.js', 'TypeScript'],
  ['APIs REST', 'bases de datos relacionales', 'código', 'arquitectura'],
  ['proyectos propios', 'código limpio', 'colaboración'],
]

export default function About({ data }) {
  if (!data) return null
  const { bio, stats, github } = data

  return (
    <section id="sobre-mi" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      <MeshBg />
      <GlowOrb x="50%" y="50%" color="var(--brand)" size={550} opacity={0.04} />
      <GlowOrb x="90%" y="10%" color="var(--purple)" size={300} opacity={0.05} />

      <div className="relative z-10 mb-10 sm:mb-14">
        <SectionBadge label="Quién soy" color="purple" />
        <SectionTitle>Sobre <span className="gradient-text">mí</span></SectionTitle>
      </div>

      {/* ── Bio con keywords ── */}
      <div className="relative z-10 mb-10">
        <div className="space-y-4 mb-8">
          {bio.map((p, i) => (
            <BioParagraph key={i} text={p} keywords={bioKeywords[i] || []} />
          ))}
        </div>
        <a
          href={github}
          target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl border transition-all hover:scale-105"
          style={{ borderColor: 'var(--border2)', color: 'var(--text)', background: 'var(--surface)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(79,142,247,0.15)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
          Ver GitHub → Tanofxp
        </a>
      </div>

      {/* ── Stats + Timeline en dos columnas ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-start">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {stats.map((s, i) => <StatCard key={s.num + s.label} stat={s} index={i} />)}
        </div>

        {/* Timeline */}
        <div>
          <h4
            className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2"
            style={{ color: 'var(--brand)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Trayectoria
          </h4>
          {experience.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
