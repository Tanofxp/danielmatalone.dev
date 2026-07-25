import { useState, useEffect, useRef } from 'react'
import { GlowOrb, DotGrid, TerminalWindow, MeshBg } from './Shared'

const langDots = [
  { color: '#f7b155', label: 'JavaScript'      },
  { color: '#38c5d9', label: 'React'           },
  { color: '#3dd68c', label: 'Node.js'         },
  { color: '#4f8ef7', label: 'TypeScript'      },
  { color: '#b07ef7', label: 'PHP · Laravel'   },
  { color: '#f76f6f', label: 'Python · pandas' },
]

const terminalLines = [
  { prompt: true, cmd: 'whoami' },
  { out: 'Full Stack Developer · Aveiro, PT' },
  { prompt: true, cmd: 'cat stack.json' },
  { key: '"backend"',  sep: ':',  str: '"Node.js, Express, TypeScript"' },
  { key: '"frontend"', sep: ':',  str: '"React, TypeScript, Vite"'      },
  { key: '"mobile"',   sep: ':',  str: '"React Native, Geolocalización"' },
  { key: '"infra"',    sep: ':',  str: '"Vercel, GitHub, Docker"'        },
  { prompt: true, cmd: 'git log --oneline -3' },
  { val: 'a3f2d1c', out: ' feat: danielmatalone.dev portfolio'   },
  { val: 'b8e5c9a', out: ' feat: api-node jwt + crud'            },
  { val: 'c1d7f4e', out: ' feat: foto_map geolocalización'       },
]

const COLORS = ['#4f8ef7','#7c5cf7','#38c5d9','#3dd68c','#b07ef7','#f7b155','#f76f6f']

function TypedRole({ roles }) {
  const [idx,  setIdx]  = useState(0)
  const [text, setText] = useState('')
  const [del,  setDel]  = useState(false)

  useEffect(() => {
    const current = roles[idx]
    const speed = del ? 30 : 70
    const timer = setTimeout(() => {
      if (!del) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1))
        else setTimeout(() => setDel(true), 2200)
      } else {
        if (text.length > 0) setText(text.slice(0, -1))
        else { setDel(false); setIdx((idx + 1) % roles.length) }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [text, del, idx, roles])

  return (
    <span>
      <span className="gradient-text">{text}</span>
      <span
        className="inline-block w-[3px] ml-1 rounded-sm"
        style={{
          height: '0.85em',
          background: 'var(--brand)',
          verticalAlign: 'middle',
          animation: 'blink .9s step-end infinite',
        }}
      />
    </span>
  )
}

/* Badge flotante */
function FloatBadge({ label, style, delay = '0s' }) {
  return (
    <div
      className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold animate-float glass"
      style={{
        borderColor: 'var(--border2)',
        color: 'var(--muted)',
        animationDelay: delay,
        ...style,
      }}
    >
      {label}
    </div>
  )
}

/* Campo de partículas multicolor con conexiones */
function ParticleField() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width  = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    let raf

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 30 : 70

    const particles = Array.from({ length: count }, (_, i) => ({
      x:  Math.random() * w,
      y:  Math.random() * h,
      r:  Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a:  Math.random() * 0.55 + 0.15,
      color: COLORS[i % COLORS.length],
    }))

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const { x: mx, y: my } = mouseRef.current

      for (const p of particles) {
        // Repulsión suave del mouse
        const dx = p.x - mx, dy = p.y - my
        const distM = Math.sqrt(dx*dx + dy*dy)
        if (distM < 100) {
          const force = (100 - distM) / 100
          p.vx += (dx / distM) * force * 0.4
          p.vy += (dy / distM) * force * 0.4
        }
        // Damping
        p.vx *= 0.98; p.vy *= 0.98
        p.x = (p.x + p.vx + w) % w
        p.y = (p.y + p.vy + h) % h

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.round(p.a * 255).toString(16).padStart(2,'0')
        ctx.fill()
      }

      // Líneas entre partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 130) {
            const alpha = 0.07 * (1 - dist / 130)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(79,142,247,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
        // Línea al mouse si está cerca
        const dxm = particles[i].x - mx, dym = particles[i].y - my
        const dm = Math.sqrt(dxm*dxm + dym*dym)
        if (dm < 180) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `rgba(79,142,247,${0.12 * (1 - dm / 180)})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      w = canvas.width  = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  )
}

/* Metric badge en vivo — rediseñado */
function LiveMetric({ icon, label, value, color }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative flex items-center gap-3 px-4 py-3.5 rounded-xl border overflow-hidden transition-all duration-300"
      style={{
        background: hovered ? `${color}0d` : 'var(--surface)',
        borderColor: hovered ? `${color}60` : 'var(--border2)',
        boxShadow: hovered ? `0 0 20px ${color}20` : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Scan line */}
      {hovered && <span className="scan-overlay" />}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 transition-all duration-300"
        style={{
          background: `${color}18`,
          color,
          boxShadow: hovered ? `0 0 16px ${color}40` : 'none',
          transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
        }}
      >
        {icon}
      </div>
      <div>
        <div className="text-base font-black leading-none" style={{ color }}>{value}</div>
        <div className="text-[10px] mt-0.5 font-medium" style={{ color: 'var(--muted)' }}>{label}</div>
      </div>
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-bl-full transition-opacity duration-300"
        style={{ background: `radial-gradient(circle, ${color}10, transparent)`, opacity: hovered ? 1 : 0 }}
      />
    </div>
  )
}

/* Avatar SVG animado */
function DevAvatar() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      {/* Rings orbitales */}
      <div className="absolute inset-0 rounded-full border-2 animate-spin-slow"
        style={{ borderColor: 'rgba(79,142,247,0.15)', borderTopColor: 'var(--brand)' }} />
      <div className="absolute rounded-full border animate-spin-slow"
        style={{ inset: 16, borderColor: 'rgba(124,92,247,0.12)', borderBottomColor: 'var(--brand2)', animationDuration: '9s', animationDirection: 'reverse' }} />
      {/* Core */}
      <div
        className="relative w-28 h-28 rounded-2xl flex items-center justify-center text-4xl font-black"
        style={{
          background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(124,92,247,0.15))',
          border: '1px solid rgba(79,142,247,0.3)',
          boxShadow: '0 0 40px rgba(79,142,247,0.2), 0 0 80px rgba(124,92,247,0.1)',
          color: 'var(--brand)',
          fontFamily: 'monospace',
        }}
      >
        &lt;/&gt;
      </div>
      {/* Dots orbitales */}
      {[0, 90, 180, 270].map((deg, i) => (
        <div
          key={deg}
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{
            background: COLORS[i],
            boxShadow: `0 0 8px ${COLORS[i]}`,
            top: `calc(50% + ${Math.sin(deg * Math.PI/180) * 88}px - 5px)`,
            left: `calc(50% + ${Math.cos(deg * Math.PI/180) * 88}px - 5px)`,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero({ data }) {
  if (!data) return null
  const { github, bio } = data

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-24 md:pb-16 overflow-hidden">
      {/* Background */}
      <ParticleField />
      <DotGrid />
      <MeshBg />
      <GlowOrb x="60%"  y="30%"  color="var(--brand2)" size={800} opacity={0.08} />
      <GlowOrb x="10%"  y="70%"  color="var(--brand)"  size={500} opacity={0.06} />
      <GlowOrb x="90%"  y="80%"  color="var(--cyan)"   size={400} opacity={0.05} />

      {/* Floating badges */}
      <FloatBadge label="⚡ React + Vite"     style={{ top: '22%', right: '5%'  }} delay="0s"   />
      <FloatBadge label="🚀 Node.js + Express" style={{ top: '38%', right: '1%'  }} delay="1.2s" />
      <FloatBadge label="🐳 Docker"           style={{ top: '54%', right: '7%'  }} delay="0.6s" />
      <FloatBadge label="🗄️ MySQL · PostgreSQL" style={{ top: '70%', right: '4%'  }} delay="1.8s" />
      <FloatBadge label="☁️ Vercel · GitHub"  style={{ top: '24%', left: '3%'   }} delay="0.9s" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* ─── Columna izquierda ─── */}
        <div>
          {/* Status badge */}
          <div className="animate-slide-up stagger-1 mb-8">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border animate-pulse-glow"
              style={{
                color: 'var(--green)',
                background: 'rgba(61,214,140,0.07)',
                borderColor: 'rgba(61,214,140,0.3)',
              }}
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style={{ background: 'var(--green)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--green)' }} />
              </span>
              Disponible para trabajar
            </span>
          </div>

          {/* Headline */}
          <div className="animate-slide-up stagger-2 mb-2">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter"
              style={{ color: 'var(--text)' }}
            >
              Full Stack
            </h1>
          </div>
          <div className="animate-slide-up stagger-3 mb-6 flex items-center" style={{ minHeight: '4rem' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter">
              <TypedRole roles={['Developer', 'Engineer', 'Builder', 'Architect']} />
            </h1>
          </div>

          {/* Stack pills highlight */}
          <p className="animate-slide-up stagger-4 text-sm font-bold mb-3 tracking-wide" style={{ color: 'var(--brand)' }}>
            React · Node.js · TypeScript · MySQL · Docker
          </p>

          <p
            className="animate-slide-up stagger-4 text-base leading-relaxed mb-8 max-w-lg text-justify"
            style={{ color: 'var(--muted)' }}
          >
            {bio[0]}
          </p>

          {/* CTA buttons */}
          <div className="animate-slide-up stagger-5 flex gap-2 sm:gap-3 flex-wrap mb-8">
            <a
              href="#proyectos"
              className="relative overflow-hidden inline-flex items-center gap-2 text-sm font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl text-white transition-all active:scale-95 hover:scale-105 glow-brand"
              style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand2))' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              Ver proyectos
              <span className="shimmer absolute inset-0" />
            </a>
            <a
              href={github}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl border transition-all active:scale-95 hover:scale-105"
              style={{ borderColor: 'var(--border2)', color: 'var(--text)', background: 'var(--surface)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(79,142,247,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-sm font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl border transition-all active:scale-95 hover:scale-105"
              style={{ borderColor: 'var(--border2)', color: 'var(--muted)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(56,197,217,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Contactar
            </a>
          </div>

          {/* Language dots */}
          <div className="animate-slide-up stagger-6 flex flex-wrap gap-2">
            {langDots.map(d => (
              <span
                key={d.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all duration-200 hover:scale-105 cursor-default"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = d.color; e.currentTarget.style.color = d.color; e.currentTarget.style.background = `${d.color}12`; e.currentTarget.style.boxShadow = `0 0 12px ${d.color}25` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                {d.label}
              </span>
            ))}
          </div>
        </div>

        {/* ─── Columna derecha ─── */}
        <div className="hidden lg:flex flex-col gap-5 animate-slide-up stagger-4">
          {/* Avatar + Terminal */}
          <div className="flex items-center justify-center mb-2">
            <DevAvatar />
          </div>

          {/* Terminal */}
          <TerminalWindow lines={terminalLines} />

          {/* Métricas */}
          <div className="grid grid-cols-2 gap-3">
            <LiveMetric icon="📦" label="Proyectos"   value="8+"  color="#4f8ef7" />
            <LiveMetric icon="🐘" label="PHP/Laravel" value="✓"   color="#b07ef7" />
            <LiveMetric icon="🐍" label="Python"      value="✓"   color="#f7b155" />
            <LiveMetric icon="⏱️" label="Años exp."   value="4+"  color="#3dd68c" />
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-fade-in"
        style={{ animationDelay: '2s', color: 'var(--muted)' }}
      >
        <span className="text-[10px] uppercase tracking-widest">scroll</span>
        <div
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'var(--border2)' }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: 'var(--brand)', animation: 'float 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
