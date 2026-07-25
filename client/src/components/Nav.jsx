import { useState, useEffect, useRef } from 'react'

const links = [
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#proyectos',   label: 'Proyectos'   },
  { href: '#sobre-mi',    label: 'Sobre mí'    },
  { href: '#contacto',    label: 'Contacto'    },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
      const sections = links.map(l => l.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = (e) => {
      if (!e.target.closest('#mobile-menu') && !e.target.closest('#menu-btn')) setMenuOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(5,8,16,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(26,39,64,0.9)' : '1px solid transparent',
          zIndex: 10000,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, var(--brand), var(--brand2))',
                boxShadow: '0 0 20px rgba(79,142,247,0.3)',
              }}
            >
              &lt;/&gt;
            </div>
            <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--text)' }}>
              dev<span className="gradient-text">daniel</span>
            </span>
          </a>

          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map(l => {
              const id = l.href.slice(1)
              const isActive = active === id
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-white"
                    style={{ color: isActive ? 'var(--brand)' : 'var(--muted)' }}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.15)' }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                        style={{ background: 'var(--brand)' }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            {/* CTA */}
            <a
              href="#contacto"
              className="hidden md:inline-flex relative overflow-hidden text-sm font-semibold px-5 py-2 rounded-xl text-white transition-all duration-200 hover:scale-105 active:scale-95 glow-brand"
              style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand2))' }}
            >
              <span className="relative z-10">Contactar</span>
              <span className="shimmer absolute inset-0" />
            </a>

            {/* Hamburger mobile */}
            <button
              id="menu-btn"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-all"
              style={{ color: 'var(--muted)' }}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className="block w-5 h-0.5 rounded transition-all duration-300 origin-center"
                  style={{ background: menuOpen ? 'var(--brand)' : 'var(--muted)', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : '' }} />
                <span className="block w-5 h-0.5 rounded transition-all duration-300"
                  style={{ background: menuOpen ? 'transparent' : 'var(--muted)', transform: menuOpen ? 'scaleX(0)' : '' }} />
                <span className="block w-5 h-0.5 rounded transition-all duration-300 origin-center"
                  style={{ background: menuOpen ? 'var(--brand)' : 'var(--muted)', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : '' }} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="fixed top-16 left-0 right-0 md:hidden transition-all duration-300"
        style={{
          background: 'rgba(5,8,16,0.97)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border)',
          zIndex: 10000,
          maxHeight: menuOpen ? '400px' : '0',
          overflow: 'hidden',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                color: active === l.href.slice(1) ? 'var(--brand)' : 'var(--muted)',
                background: active === l.href.slice(1) ? 'rgba(79,142,247,0.08)' : 'transparent',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="mt-2 text-center text-sm font-semibold px-5 py-3 rounded-xl text-white"
            style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand2))' }}
            onClick={() => setMenuOpen(false)}
          >
            Contactar
          </a>
        </div>
      </div>
    </>
  )
}
