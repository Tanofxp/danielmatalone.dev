import { useState, useRef, useEffect } from 'react'
import { GlowOrb, SectionBadge, SectionTitle, useReveal, MeshBg } from './Shared'

const typeStyles = {
  'Microservicios': { text: '#f76f6f', bg: 'rgba(247,111,111,0.1)', border: 'rgba(247,111,111,0.3)' },
  'API':            { text: '#f7b155', bg: 'rgba(247,177,85,0.1)',  border: 'rgba(247,177,85,0.3)'  },
  'Full Stack':     { text: '#3dd68c', bg: 'rgba(61,214,140,0.1)',  border: 'rgba(61,214,140,0.3)'  },
  'Frontend':       { text: '#38c5d9', bg: 'rgba(56,197,217,0.1)',  border: 'rgba(56,197,217,0.3)'  },
  'Backend':        { text: '#f7b155', bg: 'rgba(247,177,85,0.1)',  border: 'rgba(247,177,85,0.3)'  },
  'Bot':            { text: '#b07ef7', bg: 'rgba(176,126,247,0.1)', border: 'rgba(176,126,247,0.3)' },
}

const filters = [
  { key: 'all',      label: 'Todos',    icon: '◈' },
  { key: 'personal', label: 'Personal', icon: '🚀' },
]

/* Modal de detalle de proyecto */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const pill = typeStyles[project.type] || typeStyles['Backend']

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      style={{ background: 'rgba(5,8,16,0.9)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border overflow-hidden animate-scale-in"
        style={{
          background: 'var(--surface)',
          borderColor: project.color,
          boxShadow: `0 0 80px ${project.color}35, 0 24px 80px rgba(0,0,0,0.6), inset 0 0 40px ${project.color}06`,
          maxHeight: '90dvh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar degradado */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${project.color}88, ${project.color}, ${project.color}88)` }}
        />

        {/* Glow corner */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-48 h-48 rounded-bl-full opacity-10"
          style={{ background: `radial-gradient(circle, ${project.color}, transparent)` }}
        />

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg font-bold pr-2" style={{ color: 'var(--text)' }}>{project.title}</h3>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:rotate-90"
              style={{ background: 'var(--border)', color: 'var(--muted)' }}
            >
              ✕
            </button>
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
            style={{ color: pill.text, background: pill.bg, borderColor: pill.border }}
          >
            {project.type}
          </span>
        </div>

        {/* Body */}
        <div className="px-6 pb-4">
          <p className="text-sm leading-relaxed mb-5 text-justify" style={{ color: 'var(--muted)' }}>
            {project.desc}
          </p>
          {project.highlights && (
            <div className="rounded-xl border p-4 mb-4" style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}>
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: project.color }}>
                Highlights
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="text-xs flex gap-2 text-justify" style={{ color: 'var(--muted)' }}>
                    <span style={{ color: project.color }} className="font-bold flex-shrink-0 mt-0.5">›</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.map(s => (
              <span
                key={s}
                className="text-[10px] px-2.5 py-1 rounded-lg border font-medium"
                style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}0d` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        {(project.github || project.live) && (
          <div className="px-6 pb-6 flex flex-wrap gap-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank" rel="noreferrer"
                className="relative overflow-hidden inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl text-white transition-all hover:scale-105 glow-brand"
                style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand2))' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Ver en producción
                <span className="shimmer absolute inset-0" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all hover:scale-105"
                style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}0d` }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                Ver en GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const [hovered,  setHovered]  = useState(false)
  const [modal,    setModal]    = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const revealRef  = useRef(null)
  const cardRef    = useRef(null)
  const [visible,  setVisible]  = useState(false)
  const pill = typeStyles[project.type] || typeStyles['Backend']

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (revealRef.current) observer.observe(revealRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top)  / rect.height,
    })
  }

  const rotX = hovered ? (mousePos.y - 0.5) * -10 : 0
  const rotY = hovered ? (mousePos.x - 0.5) * 10  : 0

  return (
    <>
      <div
        ref={revealRef}
        className="transition-all duration-500"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transitionDelay: `${(index % 6) * 60}ms`,
        }}
      >
        <div
          ref={cardRef}
          className="relative rounded-2xl border flex flex-col gap-3 overflow-hidden transition-all duration-300 h-full"
          style={{
            padding: '20px',
            background: hovered ? 'var(--surface2)' : 'var(--surface)',
            borderColor: hovered ? project.color : 'var(--border)',
            boxShadow: hovered ? `0 16px 60px ${project.color}20, 0 0 0 1px ${project.color}20, inset 0 0 40px ${project.color}04` : 'none',
            transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) ${hovered ? 'translateY(-6px) scale(1.01)' : ''}`,
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setMousePos({ x: 0.5, y: 0.5 }) }}
          onMouseMove={handleMouseMove}
          onClick={() => setModal(true)}
        >
          {/* Número watermark */}
          <span className="proj-number" style={{ color: project.color, opacity: hovered ? 0.08 : 0.03 }}>
            {String(project.id).padStart(2, '0')}
          </span>

          {/* Shimmer */}
          {hovered && <span className="shimmer absolute inset-0 pointer-events-none" />}
          {/* Scan line */}
          {hovered && <span className="scan-overlay" />}

          {/* Top line */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Glow orb */}
          <div
            className="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl transition-opacity duration-300"
            style={{ background: project.color, opacity: hovered ? 0.18 : 0 }}
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-2 relative z-10">
            <h3 className="text-sm font-bold leading-snug" style={{ color: 'var(--text)' }}>
              {project.title}
            </h3>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border flex-shrink-0"
              style={{ color: pill.text, background: pill.bg, borderColor: pill.border }}
            >
              {project.type}
            </span>
          </div>

          <p className="text-xs leading-relaxed flex-1 relative z-10 text-justify" style={{ color: 'var(--muted)' }}>
            {project.desc}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 flex-wrap relative z-10">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map(s => (
                <span
                  key={s}
                  className="text-[10px] px-2 py-0.5 rounded border transition-all duration-200"
                  style={{
                    color: hovered ? project.color : 'var(--muted)',
                    borderColor: hovered ? `${project.color}40` : 'var(--border)',
                    background: hovered ? `${project.color}0a` : 'var(--bg)',
                  }}
                >
                  {s}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="text-[10px] px-2 py-0.5 rounded border"
                  style={{ color: 'var(--muted)', borderColor: 'var(--border)', background: 'var(--bg)' }}>
                  +{project.stack.length - 4}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank" rel="noreferrer"
                  className="transition-colors"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.color = 'var(--green)' }}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  onClick={e => e.stopPropagation()}
                  title="Ver en producción"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank" rel="noreferrer"
                  className="transition-colors"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.color = project.color }}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  onClick={e => e.stopPropagation()}
                  title="GitHub"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
              )}
              <span
                className="text-[10px] font-semibold transition-all duration-200"
                style={{ color: hovered ? project.color : `${project.color}66` }}
              >
                ver detalle →
              </span>
            </div>
          </div>
        </div>
      </div>
      {modal && <ProjectModal project={project} onClose={() => setModal(false)} />}
    </>
  )
}

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all')
  if (!projects?.length) return null

  const visible   = filter === 'all' ? projects : projects.filter(p => p.category === filter)
  const municipal = visible.filter(p => p.category === 'municipal')
  const personal  = visible.filter(p => p.category === 'personal')

  return (
    <section id="proyectos" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      <MeshBg />
      <GlowOrb x="10%" y="40%" color="var(--cyan)"   size={450} opacity={0.05} />
      <GlowOrb x="90%" y="70%" color="var(--brand2)" size={380} opacity={0.06} />

      <div className="relative z-10 mb-6">
        <SectionBadge label="Portfolio" color="cyan" />
        <SectionTitle>Proyectos <span className="gradient-text">destacados</span></SectionTitle>
        <p className="mt-3 text-sm max-w-xl text-justify" style={{ color: 'var(--muted)' }}>
          Hacé click en cualquier tarjeta para ver los detalles completos del proyecto.
        </p>
      </div>

      {/* Filtros */}
      <div className="relative z-10 flex gap-2 mb-8 sm:mb-10 flex-wrap items-center">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border transition-all duration-200 active:scale-95 hover:scale-105"
            style={
              filter === f.key
                ? { background: 'linear-gradient(135deg, var(--brand), var(--brand2))', borderColor: 'transparent', color: '#fff', boxShadow: '0 0 24px rgba(79,142,247,0.35)' }
                : { background: 'transparent', borderColor: 'var(--border2)', color: 'var(--muted)' }
            }
          >
            <span>{f.icon}</span>
            {f.label}
          </button>
        ))}
        <div
          className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg ml-auto border"
          style={{ color: 'var(--muted)', background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />
          {visible.length} proyecto{visible.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Sector Público */}
      {(filter === 'all' || filter === 'municipal') && municipal.length > 0 && (
        <>
          {/* Pill solo para el bloque municipal */}
          <div className="relative z-10 mb-5">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border"
              style={{
                color: 'var(--green)',
                background: 'rgba(61,214,140,0.07)',
                borderColor: 'rgba(61,214,140,0.25)',
              }}
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--green)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--green)' }} />
              </span>
              Aplicaciones en Producción
            </span>
          </div>

          {/* Banner municipal mejorado */}
          <div
            className="relative z-10 rounded-2xl border overflow-hidden mb-8"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border2)',
              borderLeft: '3px solid var(--brand)',
              boxShadow: '0 0 40px rgba(79,142,247,0.06)',
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand2))' }} />
            {/* Scan line decorativa */}
            <span className="scan-overlay" />

            <div className="relative p-5 flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)' }}
              >
                🏛️
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--text)' }}>
                  Municipalidad de Morón — Ecosistema completo en producción
                </h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                  Diseñé, desarrollé y mantuve un conjunto de sistemas web y microservicios que opera
                  en producción para miles de vecinos y proveedores. El ecosistema cubre Oracle,
                  Provincia.Net, Interbanking y portales de autogestión modernos.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['PHP/Laravel','SQL Server','MySQL','Oracle','Docker','LDAP','JWT'].map(t => (
                    <span key={t} className="code-chip">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p
            className="relative z-10 text-xs font-bold uppercase tracking-widest mb-5 pb-3 border-b flex items-center gap-2"
            style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand)' }} />
            Sector Público — Municipalidad de Morón
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full border"
              style={{ borderColor: 'var(--border2)', color: 'var(--muted)' }}>
              {municipal.length} sistemas
            </span>
          </p>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {municipal.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </>
      )}

      {/* Personales */}
      {(filter === 'all' || filter === 'personal') && personal.length > 0 && (
        <>
          <p
            className="relative z-10 text-xs font-bold uppercase tracking-widest mb-5 pb-3 border-b flex items-center gap-2"
            style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--cyan)' }} />
            Proyectos Propios &amp; Freelance
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full border"
              style={{ borderColor: 'var(--border2)', color: 'var(--muted)' }}>
              {personal.length} proyectos
            </span>
          </p>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personal.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </>
      )}
    </section>
  )
}
