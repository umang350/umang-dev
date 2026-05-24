import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

// Idea 4: Product Dashboard — Refined
// ─ Dark sidebar, SaaS interface with visual polish
// ─ Hero with profile photo, glassmorphic cards, project cards with hover
// ─ Accent: #818CF8 (indigo-400) + gradient accents

const ACC = "#818CF8"
const ACC2 = "#A78BFA" // violet-400 secondary accent
const BG = "#0B0F19"
const SIDEBAR = "#111827"
const CARD = "#1A1F2E"
const CARD_HOVER = "#1E2436"
const BORDER = "#262D3D"
const TEXT = "#E8ECF4"
const MUTED = "#8892A4"
const GREEN = "#34D399"
const PINK = "#F472B6"

type NavItem = { id: string; label: string; icon: string }

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: "◆" },
  { id: "work", label: "Work", icon: "◈" },
  { id: "about", label: "About", icon: "◉" },
  { id: "skills", label: "Skills", icon: "◫" },
]

const metrics = [
  { label: "Stores served", value: "50+", sub: "Global supply chain", icon: "🏪" },
  { label: "Daily transactions", value: "10K+", sub: "Retail backend APIs", icon: "⚡" },
  { label: "NPS improvement", value: "+39pts", sub: "SCM modernization", icon: "📈" },
  { label: "Years at UNIQLO", value: "5", sub: "Eng → PM transition", icon: "🎯" },
]

const projects = [
  {
    title: "Global Supply Chain Platform",
    role: "Product Manager",
    status: "Active",
    year: "2024–",
    impact: "50+ stores · 5 regions",
    description: "Own the product roadmap for UNIQLO's supply chain systems across US, Europe, and Southeast Asia.",
    gradient: "linear-gradient(135deg, rgba(129,140,248,0.15), rgba(167,139,250,0.05))",
  },
  {
    title: "SCM Platform Modernization",
    role: "Product Dev Manager",
    status: "Shipped",
    year: "2022–24",
    impact: "3 tools → 1 · NPS 32→71",
    description: "Migrated 3 legacy tools into a unified platform, reducing context-switching for planners.",
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.12), rgba(129,140,248,0.05))",
  },
  {
    title: "Retail Operations Backend",
    role: "Software Engineer",
    status: "Shipped",
    year: "2020–22",
    impact: "10K+ txns/day",
    description: "Built core backend services powering store and warehouse operations at UNIQLO.",
    gradient: "linear-gradient(135deg, rgba(244,114,182,0.12), rgba(129,140,248,0.05))",
  },
  {
    title: "YouTube Channel",
    role: "Creator & Strategist",
    status: "Active",
    year: "2020–",
    impact: "Tech in Japan niche",
    description: "Built a tech-focused YouTube channel, treating it like a product with data-driven iteration.",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(129,140,248,0.05))",
  },
]

const skills: Record<string, { items: string[]; color: string }> = {
  "Product": { items: ["Strategy & Roadmapping", "User Research", "PRDs & Specs", "OKRs & KPIs", "Go-to-Market", "Stakeholder Mgmt"], color: ACC },
  "Analytics": { items: ["Data Analysis", "A/B Testing", "SQL", "Google Analytics", "Product Metrics"], color: GREEN },
  "Technical": { items: ["Spring Boot", "React", "AWS", "CI/CD", "API Design", "System Architecture"], color: PINK },
  "Leadership": { items: ["Cross-functional", "Agile/Scrum", "Discovery", "Competitive Analysis"], color: ACC2 },
}

const timeline = [
  { yr: "2025", role: "Product Manager", co: "UNIQLO, Tokyo", active: true },
  { yr: "2024", role: "Product Manager", co: "UNIQLO, New York", active: false },
  { yr: "2022", role: "Product Dev Manager", co: "Fast Retailing", active: false },
  { yr: "2020", role: "SDE", co: "Fast Retailing", active: false },
]

function StatusBadge({ status }: { status: string }) {
  const active = status === "Active"
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: active ? "rgba(52,211,153,0.08)" : "rgba(136,146,164,0.08)",
      color: active ? GREEN : MUTED,
      fontSize: 11, fontWeight: 600,
      padding: "4px 12px", borderRadius: 100,
      border: `1px solid ${active ? "rgba(52,211,153,0.25)" : BORDER}`,
      backdropFilter: "blur(8px)",
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: active ? GREEN : MUTED,
        display: "inline-block",
        boxShadow: active ? `0 0 8px ${GREEN}40` : "none",
      }} />
      {status}
    </span>
  )
}

export default function Idea4() {
  const [active, setActive] = useState("overview")
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const scrollTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <Head>
        <title>Umang Chauhan — PM Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: ${BG}; color: ${TEXT}; font-family: 'Be Vietnam Pro', system-ui, -apple-system, sans-serif; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 3px; }
          ::selection { background: rgba(129,140,248,0.3); }

          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
          @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(129,140,248,0.15); } 50% { box-shadow: 0 0 40px rgba(129,140,248,0.25); } }

          .animate-up { animation: fadeUp 0.6s ease-out both; }
          .animate-up-1 { animation-delay: 0.1s; }
          .animate-up-2 { animation-delay: 0.2s; }
          .animate-up-3 { animation-delay: 0.3s; }
          .animate-up-4 { animation-delay: 0.4s; }
          .animate-float { animation: float 4s ease-in-out infinite; }
          .animate-glow { animation: glow 3s ease-in-out infinite; }

          .card-hover { transition: all 0.25s ease; }
          .card-hover:hover { transform: translateY(-2px); border-color: rgba(129,140,248,0.3) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(129,140,248,0.1); }
          .project-card { transition: all 0.3s ease; cursor: pointer; }
          .project-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
          .project-card:hover .project-arrow { opacity: 1; transform: translateX(0); }
          .project-arrow { opacity: 0; transform: translateX(-8px); transition: all 0.25s ease; }

          .glass { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
          .noise { position: relative; }
          .noise::before { content: ''; position: absolute; inset: 0; opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); pointer-events: none; border-radius: inherit; }

          .metric-value { background: linear-gradient(135deg, ${ACC}, ${ACC2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .gradient-text { background: linear-gradient(135deg, ${ACC}, ${ACC2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

          @media(max-width: 900px) {
            .layout { flex-direction: column !important; }
            .sidebar { width: 100% !important; height: auto !important; position: static !important; flex-direction: row !important; padding: 12px 20px !important; border-right: none !important; border-bottom: 1px solid ${BORDER} !important; }
            .sidebar-nav { flex-direction: row !important; gap: 4px !important; }
            .sidebar-brand, .sidebar-status, .sidebar-footer { display: none !important; }
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-image-wrapper { order: -1; display: flex; justify-content: center; }
            .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .projects-grid { grid-template-columns: 1fr !important; }
            .about-grid { grid-template-columns: 1fr !important; }
            .main-content { padding: 24px 20px !important; }
          }
          @media(max-width: 500px) {
            .metrics-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </Head>

      <div className="layout" style={{ display: "flex", minHeight: "100vh" }}>

        {/* ── Sidebar ── */}
        <aside className="sidebar glass" style={{
          width: 240,
          background: `${SIDEBAR}ee`,
          borderRight: `1px solid ${BORDER}`,
          padding: "28px 0",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
          overflowY: "auto",
        }}>
          {/* Brand */}
          <div className="sidebar-brand" style={{ padding: "0 24px 24px", borderBottom: `1px solid ${BORDER}`, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${ACC}, ${ACC2})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, fontWeight: 800, color: "#fff",
                boxShadow: `0 4px 12px ${ACC}40`,
              }}>U</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, letterSpacing: -0.2 }}>Umang Chauhan</div>
                <div style={{ fontSize: 11, color: MUTED, fontWeight: 500 }}>Product Manager</div>
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div className="sidebar-status" style={{ padding: "0 24px 20px" }}>
            <div className="noise" style={{
              background: "rgba(52,211,153,0.06)",
              border: `1px solid rgba(52,211,153,0.15)`,
              borderRadius: 10, padding: "12px 16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%", background: GREEN,
                  display: "inline-block", boxShadow: `0 0 10px ${GREEN}60`,
                  animation: "pulse 2s infinite",
                }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: 0.3 }}>Open to work</span>
              </div>
              <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.5 }}>PM roles · Tokyo or remote</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="sidebar-nav" style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 14px", flex: 1 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: active === item.id ? `rgba(129,140,248,0.1)` : "transparent",
                  color: active === item.id ? ACC : MUTED,
                  fontSize: 13,
                  fontWeight: active === item.id ? 600 : 400,
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  borderLeft: `2px solid ${active === item.id ? ACC : "transparent"}`,
                  transition: "all 0.2s ease",
                  letterSpacing: 0.1,
                }}
                onMouseEnter={(e) => {
                  if (active !== item.id) {
                    e.currentTarget.style.background = "rgba(129,140,248,0.05)"
                    e.currentTarget.style.color = TEXT
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== item.id) {
                    e.currentTarget.style.background = "transparent"
                    e.currentTarget.style.color = MUTED
                  }
                }}
              >
                <span style={{ fontSize: 11, opacity: 0.7 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social links */}
          <div className="sidebar-footer" style={{ padding: "16px 24px 0", borderTop: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 4 }}>
              {[
                { label: "GitHub", href: "https://github.com/umangchauhan", icon: "GH" },
                { label: "LinkedIn", href: "https://linkedin.com/in/umangchauhan", icon: "IN" },
                { label: "Twitter", href: "https://twitter.com/umangchauhan", icon: "TW" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    border: `1px solid ${BORDER}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 700, color: MUTED,
                    textDecoration: "none", transition: "all 0.2s",
                    letterSpacing: 0.5,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACC; e.currentTarget.style.color = ACC; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED; }}
                >{s.icon}</a>
              ))}
            </div>
            <a href="mailto:job@umang.dev" className="animate-glow" style={{
              display: "block", textAlign: "center",
              background: `linear-gradient(135deg, ${ACC}, ${ACC2})`,
              color: "#fff", padding: "11px", borderRadius: 10,
              fontSize: 12, fontWeight: 700, textDecoration: "none",
              letterSpacing: 0.3, transition: "all 0.2s",
            }}>
              Get in Touch
            </a>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="main-content" style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>

          {/* ─── Overview / Hero ─── */}
          <section id="overview" style={{ marginBottom: 56 }}>
            <div className="hero-grid" style={{
              display: "grid", gridTemplateColumns: "1fr auto", gap: 40,
              alignItems: "center", marginBottom: 36,
            }}>
              <div className={mounted ? "animate-up" : ""}>
                <p style={{
                  color: ACC, fontSize: 12, fontWeight: 700,
                  letterSpacing: 2, textTransform: "uppercase", marginBottom: 10,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span style={{ width: 20, height: 1, background: ACC, display: "inline-block" }} />
                  Overview
                </p>
                <h1 style={{
                  fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 14,
                  lineHeight: 1.15,
                }}>
                  Product Manager{" "}
                  <span className="gradient-text">Dashboard</span>
                </h1>
                <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, maxWidth: 520 }}>
                  5 years at Fast Retailing — from building APIs to owning the product roadmap for global supply chain systems. Engineering background that ships with product judgment.
                </p>
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <a href="mailto:job@umang.dev" style={{
                    background: `linear-gradient(135deg, ${ACC}, ${ACC2})`,
                    color: "#fff", padding: "10px 22px", borderRadius: 10,
                    fontSize: 13, fontWeight: 700, textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 6,
                    boxShadow: `0 4px 20px ${ACC}30`,
                    transition: "all 0.2s",
                  }}>
                    Send email <span style={{ fontSize: 14 }}>→</span>
                  </a>
                  <a href="/UmangResume.pdf" download style={{
                    background: "transparent",
                    color: TEXT, border: `1px solid ${BORDER}`,
                    padding: "10px 22px", borderRadius: 10,
                    fontSize: 13, fontWeight: 600, textDecoration: "none",
                    transition: "all 0.2s",
                  }}>
                    Resume ↓
                  </a>
                </div>
              </div>

              {/* Hero image */}
              <div className="hero-image-wrapper animate-float" style={{ position: "relative" }}>
                <div style={{
                  width: 200, height: 200, position: "relative",
                  filter: "drop-shadow(0 0 40px rgba(129,140,248,0.2))",
                }}>
                  <Image
                    src="/sq.png"
                    alt="Decorative geometric shape"
                    width={200}
                    height={200}
                    style={{ objectFit: "contain", opacity: 0.85 }}
                  />
                </div>
                {/* Glow behind image */}
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 150, height: 150,
                  background: `radial-gradient(circle, ${ACC}20 0%, transparent 70%)`,
                  borderRadius: "50%", zIndex: -1,
                }} />
              </div>
            </div>

            {/* Metric cards */}
            <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {metrics.map((m, i) => (
                <div key={m.label}
                  className={`card-hover noise ${mounted ? `animate-up animate-up-${i + 1}` : ""}`}
                  style={{
                    background: CARD,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 14,
                    padding: "22px 20px",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                  {/* Subtle top gradient line */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${ACC}60, ${ACC2}30, transparent)`,
                  }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <p style={{ color: MUTED, fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{m.label}</p>
                    <span style={{ fontSize: 18 }}>{m.icon}</span>
                  </div>
                  <p className="metric-value" style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 4, lineHeight: 1 }}>{m.value}</p>
                  <p style={{ color: MUTED, fontSize: 11, fontWeight: 500 }}>{m.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Work ─── */}
          <section id="work" style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
              <div>
                <p style={{
                  color: ACC, fontSize: 12, fontWeight: 700,
                  letterSpacing: 2, textTransform: "uppercase", marginBottom: 6,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span style={{ width: 20, height: 1, background: ACC, display: "inline-block" }} />
                  Work
                </p>
                <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>Selected Projects</h2>
              </div>
              <Link href="/projects"
                style={{
                  color: ACC, fontSize: 12, fontWeight: 600, textDecoration: "none",
                  border: `1px solid ${BORDER}`, padding: "8px 16px", borderRadius: 8,
                  transition: "all 0.2s",
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}
              >
                View case studies <span style={{ fontSize: 14 }}>→</span>
              </Link>
            </div>

            <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {projects.map((p) => (
                <div key={p.title} className="project-card noise" style={{
                  background: p.gradient,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 14,
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ color: MUTED, fontSize: 12, fontWeight: 600, fontFamily: "'DM Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{p.year}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  {/* Title */}
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, letterSpacing: -0.2, lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ color: MUTED, fontSize: 12, fontWeight: 500, marginBottom: 12 }}>{p.role}</p>
                  {/* Description */}
                  <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>{p.description}</p>
                  {/* Impact pill */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      background: "rgba(129,140,248,0.1)",
                      color: ACC, fontSize: 11, fontWeight: 700,
                      padding: "4px 12px", borderRadius: 6,
                      border: `1px solid rgba(129,140,248,0.15)`,
                      fontFamily: "'DM Mono', monospace",
                    }}>
                      {p.impact}
                    </span>
                    <span className="project-arrow" style={{ color: ACC, fontSize: 14, fontWeight: 700 }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── About ─── */}
          <section id="about" style={{ marginBottom: 56 }}>
            <p style={{
              color: ACC, fontSize: 12, fontWeight: 700,
              letterSpacing: 2, textTransform: "uppercase", marginBottom: 20,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ width: 20, height: 1, background: ACC, display: "inline-block" }} />
              About
            </p>

            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
              {/* Background card with photo */}
              <div className="card-hover noise" style={{
                background: CARD, border: `1px solid ${BORDER}`,
                borderRadius: 14, padding: 28, position: "relative", overflow: "hidden",
              }}>
                {/* Decorative blob */}
                <div style={{
                  position: "absolute", top: -30, right: -30,
                  width: 120, height: 120, opacity: 0.06,
                }}>
                  <Image src="/sq.png" alt="" width={120} height={120} style={{ objectFit: "contain" }} />
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, letterSpacing: -0.2 }}>Background</h3>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
                  B.Tech in Computer Science from Delhi Technological University. Started as a Software Engineer at UNIQLO in 2020, building APIs handling 10K+ daily transactions. Transitioned to Product in 2022. Now PM at Global HQ, Tokyo.
                </p>
                {/* Mini stat row */}
                <div style={{ display: "flex", gap: 24 }}>
                  {[
                    { label: "Education", val: "B.Tech CS" },
                    { label: "Location", val: "Tokyo, JP" },
                    { label: "Languages", val: "EN · JP · HI" },
                  ].map(s => (
                    <div key={s.label}>
                      <p style={{ color: MUTED, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="card-hover noise" style={{
                background: CARD, border: `1px solid ${BORDER}`,
                borderRadius: 14, padding: 28,
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, letterSpacing: -0.2 }}>Timeline</h3>
                <div style={{ position: "relative", paddingLeft: 20 }}>
                  {/* Timeline line */}
                  <div style={{
                    position: "absolute", left: 4, top: 6, bottom: 6,
                    width: 1, background: `linear-gradient(180deg, ${ACC}, ${BORDER})`,
                  }} />
                  {timeline.map((t, i) => (
                    <div key={t.yr} style={{
                      display: "flex", flexDirection: "column", marginBottom: i < timeline.length - 1 ? 22 : 0,
                      position: "relative",
                    }}>
                      {/* Dot */}
                      <div style={{
                        position: "absolute", left: -18, top: 5,
                        width: 9, height: 9, borderRadius: "50%",
                        background: t.active ? ACC : BORDER,
                        border: `2px solid ${t.active ? ACC : BORDER}`,
                        boxShadow: t.active ? `0 0 10px ${ACC}50` : "none",
                      }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                        <span style={{
                          background: t.active ? `rgba(129,140,248,0.15)` : "rgba(136,146,164,0.08)",
                          color: t.active ? ACC : MUTED,
                          fontSize: 11, fontWeight: 700,
                          padding: "2px 8px", borderRadius: 4,
                          fontFamily: "'DM Mono', monospace",
                        }}>{t.yr}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{t.role}</span>
                      </div>
                      <span style={{ color: MUTED, fontSize: 12, fontWeight: 500 }}>{t.co}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── Skills ─── */}
          <section id="skills" style={{ marginBottom: 56 }}>
            <p style={{
              color: ACC, fontSize: 12, fontWeight: 700,
              letterSpacing: 2, textTransform: "uppercase", marginBottom: 20,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ width: 20, height: 1, background: ACC, display: "inline-block" }} />
              Skills
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {Object.entries(skills).map(([category, { items, color }]) => (
                <div key={category} className="card-hover noise" style={{
                  background: CARD, border: `1px solid ${BORDER}`,
                  borderRadius: 14, padding: "22px 20px",
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Top accent line */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${color}80, transparent)`,
                  }} />
                  <p style={{
                    color, fontSize: 11, fontWeight: 800,
                    letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16,
                  }}>{category}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {items.map(skill => (
                      <span key={skill} style={{
                        fontSize: 12, color: TEXT, fontWeight: 500,
                        background: `${color}0D`,
                        border: `1px solid ${color}20`,
                        padding: "5px 12px", borderRadius: 6,
                        transition: "all 0.2s",
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Contact CTA ─── */}
          <section className="noise" style={{
            background: `linear-gradient(135deg, rgba(129,140,248,0.12) 0%, rgba(167,139,250,0.06) 50%, rgba(244,114,182,0.06) 100%)`,
            border: `1px solid rgba(129,140,248,0.2)`,
            borderRadius: 16, padding: "36px 32px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 24,
            position: "relative", overflow: "hidden",
          }}>
            {/* Background decoration */}
            <div style={{
              position: "absolute", right: -40, bottom: -40,
              width: 180, height: 180, opacity: 0.04,
            }}>
              <Image src="/sq.png" alt="" width={180} height={180} style={{ objectFit: "contain" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, letterSpacing: -0.3 }}>
                Looking for a PM who <span className="gradient-text">ships</span>?
              </h3>
              <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>
                Open to PM roles in ops tech, consumer, or growth-stage product. Let&apos;s talk.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, position: "relative", zIndex: 1 }}>
              <a href="mailto:job@umang.dev" style={{
                background: `linear-gradient(135deg, ${ACC}, ${ACC2})`,
                color: "#fff", padding: "12px 28px", borderRadius: 10,
                fontSize: 13, fontWeight: 700, textDecoration: "none",
                boxShadow: `0 4px 20px ${ACC}30`,
                transition: "all 0.2s",
              }}>
                Send email
              </a>
              <a href="/UmangResume.pdf" download style={{
                background: "rgba(255,255,255,0.05)",
                color: TEXT, border: `1px solid ${BORDER}`,
                padding: "12px 28px", borderRadius: 10,
                fontSize: 13, fontWeight: 600, textDecoration: "none",
                backdropFilter: "blur(10px)",
                transition: "all 0.2s",
              }}>
                Resume
              </a>
            </div>
          </section>

        </main>
      </div>

      <Link href="/idea" style={{
        position: "fixed", bottom: 24, right: 24,
        background: `${SIDEBAR}ee`, backdropFilter: "blur(12px)",
        border: `1px solid ${BORDER}`, color: MUTED,
        fontSize: 12, fontWeight: 600, padding: "10px 18px", borderRadius: 8,
        textDecoration: "none", letterSpacing: 0.3, zIndex: 100,
        transition: "all 0.2s",
      }}>← All ideas</Link>
    </>
  )
}
