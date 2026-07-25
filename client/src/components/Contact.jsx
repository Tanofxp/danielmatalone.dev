import { useState } from 'react'
import { GlowOrb, SectionBadge, SectionTitle, Aurora, LiveDot } from './Shared'

const links = [
  {
    label:   'GitHub',
    handle:  '@Tanofxp',
    desc:    'Código fuente y proyectos open source',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    color:  '#e6edf3',
    href:   'github',
  },
  {
    label:   'Email',
    handle:  'daniel.matalone@gmail.com',
    desc:    'Respondo en menos de 24 horas',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    color:  '#4f8ef7',
    href:   'email',
  },
  {
    label:   'LinkedIn',
    handle:  'daniel-matalone',
    desc:    'Perfil profesional y experiencia laboral',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    color:  '#38c5d9',
    href:   'linkedin',
  },
]

function ContactCard({ link, data }) {
  const [hovered, setHovered] = useState(false)

  const href = link.href === 'email'
    ? `mailto:${data.email}`
    : link.href === 'linkedin'
    ? data.linkedin
    : data[link.href]

  const handle = link.href === 'email'
    ? data.email
    : link.href === 'github'
    ? data.github?.split('/').pop()
    : data.name

  return (
    <a
      href={href}
      target={link.href !== 'email' ? '_blank' : undefined}
      rel="noreferrer"
      className="relative flex items-center gap-4 rounded-2xl border p-5 overflow-hidden transition-all duration-300"
      style={{
        background:   hovered ? 'var(--surface2)' : 'var(--surface)',
        borderColor:  hovered ? link.color : 'var(--border)',
        boxShadow:    hovered
          ? `0 8px 40px ${link.color}22, 0 0 0 1px ${link.color}15, inset 0 0 30px ${link.color}05`
          : 'none',
        transform:    hovered ? 'translateY(-4px)' : 'translateY(0)',
        color:        'var(--text)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && <span className="shimmer absolute inset-0 pointer-events-none" />}
      {hovered && <span className="scan-overlay" />}

      {/* Top line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${link.color}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background:  `${link.color}12`,
          color:        link.color,
          border:       `1px solid ${link.color}30`,
          transform:    hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
          boxShadow:    hovered ? `0 0 24px ${link.color}40` : 'none',
        }}
      >
        {link.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold mb-0.5" style={{ color: 'var(--text)' }}>{link.label}</div>
        <div className="text-xs truncate mb-1 font-semibold" style={{ color: link.color }}>{handle}</div>
        <div className="text-[10px]" style={{ color: 'var(--muted)' }}>{link.desc}</div>
      </div>

      {/* Arrow animado */}
      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        className="flex-shrink-0 transition-all duration-300"
        style={{
          color: hovered ? link.color : 'var(--border2)',
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  )
}

export default function Contact({ data }) {
  if (!data) return null

  return (
    <section id="contacto" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Aurora de fondo */}
      <Aurora />
      <GlowOrb x="50%" y="50%" color="var(--brand2)" size={700} opacity={0.07} />

      {/* Rings decorativos */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border opacity-[0.025] animate-spin-slow"
           style={{ borderColor: 'var(--brand)' }} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border opacity-[0.035]"
           style={{ borderColor: 'var(--brand2)', animation: 'spin-slow 20s linear infinite reverse' }} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border opacity-[0.04]"
           style={{ borderColor: 'var(--cyan)', animation: 'spin-slow 30s linear infinite' }} />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header centrado */}
        <div className="text-center mb-12">
          <SectionBadge label="Contacto" color="cyan" />
          <SectionTitle>¿<span className="gradient-text">Hablamos</span>?</SectionTitle>

          <p className="mt-4 text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
            Estoy buscando nuevas oportunidades. Si tenés un proyecto o posición que
            creas que encaja con mi perfil, escribime — respondo rápido.
          </p>

          {/* Email CTA principal — más dramático */}
          <div className="mt-8 mb-6">
            <a
              href={`mailto:${data.email}`}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-bold px-6 sm:px-10 py-4 sm:py-4.5 rounded-2xl text-white transition-all active:scale-95 hover:scale-105 glow-brand w-full sm:w-auto"
              style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand2))' }}
            >
              {/* Glow interno */}
              <div className="pointer-events-none absolute inset-0 opacity-20"
                style={{ background: 'radial-gradient(ellipse at 30% 50%, #fff, transparent)' }} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              Enviar un email
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              <span className="shimmer absolute inset-0" />
            </a>
          </div>

          <p className="text-[11px] font-medium" style={{ color: 'var(--muted)' }}>
            También podés encontrarme en:
          </p>
        </div>

        {/* Cards de contacto */}
        <div className="flex flex-col gap-3">
          {links.map(l => (
            <ContactCard key={l.label} link={l} data={data} />
          ))}
        </div>

        {/* Disponibilidad — rediseñado */}
        <div
          className="relative mt-10 rounded-2xl border p-6 overflow-hidden"
          style={{ background: 'var(--surface)', borderColor: 'rgba(61,214,140,0.2)' }}
        >
          <span className="scan-overlay" />
          {/* Glow verde */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ background: 'radial-gradient(circle at center, var(--green), transparent)' }} />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Live dot con ring */}
              <div className="relative flex-shrink-0">
                <span
                  className="block w-3 h-3 rounded-full"
                  style={{ background: 'var(--green)', boxShadow: '0 0 12px var(--green)' }}
                />
                <span
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: 'var(--green)', opacity: 0.4 }}
                />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: 'var(--green)' }}>Disponible ahora</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>Aveiro, Portugal</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:justify-end">
              {['Remoto', 'Presencial', 'Freelance', 'Full-time'].map(m => (
                <span
                  key={m}
                  className="text-[10px] font-semibold px-3 py-1 rounded-full border"
                  style={{ color: 'var(--green)', borderColor: 'rgba(61,214,140,0.25)', background: 'rgba(61,214,140,0.07)' }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
