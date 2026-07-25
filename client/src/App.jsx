import { useState, useEffect, useRef } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import { Divider } from './components/Shared'
import { fetchPortfolio } from './api'

/* ── Cursor personalizado (solo desktop/pointer) ── */
function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafRef  = useRef(null)

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  useEffect(() => {
    if (isTouch) return
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }
    const onEnter = () => { if (ringRef.current) ringRef.current.classList.add('expanded') }
    const onLeave = () => { if (ringRef.current) ringRef.current.classList.remove('expanded') }

    const lerp = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(lerp)
    }
    rafRef.current = requestAnimationFrame(lerp)

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

/* ── Barra de progreso de scroll ── */
function PageProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0
      if (barRef.current) barRef.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div ref={barRef} className="page-progress" style={{ width: '0%' }} />
}

/* ── Loader ── */
function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div
            className="absolute inset-0 rounded-2xl animate-spin-slow"
            style={{ background: 'conic-gradient(from 0deg, var(--brand), var(--brand2), var(--cyan), var(--brand))', padding: '2px' }}
          >
            <div className="w-full h-full rounded-2xl" style={{ background: 'var(--bg)' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-black" style={{ color: 'var(--brand)' }}>
            &lt;/&gt;
          </div>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? 'var(--brand)' : 'var(--brand2)',
                animation: 'pulse 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>cargando portfolio...</p>
      </div>
    </div>
  )
}

export default function App() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolio()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  const personal = data?.personal  ?? {}
  const skills   = data?.skills    ?? []
  const projects = data?.projects  ?? []

  return (
    <div style={{ background: 'var(--bg)' }}>
      <CustomCursor />
      <PageProgress />
      <Nav />
      <main>
        <Hero     data={personal} />
        <Divider />
        <Skills   skills={skills} />
        <Divider />
        <Projects projects={projects} />
        <Divider />
        <About    data={personal} />
        <Divider />
        <Contact  data={personal} />
      </main>

      {/* Footer */}
      <footer
        className="border-t"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            {/* Logo + tagline */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand2))', boxShadow: '0 0 20px rgba(79,142,247,0.3)' }}
              >
                &lt;/&gt;
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                  dev<span className="gradient-text">daniel</span>
                </div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>Full Stack Developer · Buenos Aires</div>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4">
              <a
                href={personal.github}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium transition-all hover:scale-105"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium transition-all hover:scale-105"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-1.5 text-xs font-medium transition-all hover:scale-105"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Email
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--green)' }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: 'var(--green)' }} />
              </span>
              Disponible para nuevas oportunidades
            </div>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Construido con{' '}
              <span className="gradient-text font-semibold">React + Vite · Node.js · Tailwind CSS</span>
              {' '}— 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
