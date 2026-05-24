import Head from "next/head"
import Link from "next/link"

// Idea 1: Dark Editorial
// ─ Pure black, oversized type, horizontal rules, no decorative elements
// ─ Inspired by Vercel, Linear, Bloomberg editorial

const projects = [
  {
    year: "2024–",
    title: "Global Supply Chain Platform",
    role: "Product Manager",
    tag: "UNIQLO · 50+ global stores",
    desc: "Owning the product roadmap across US, Europe, and Southeast Asia. Shipped inventory allocation engine, real-time tracking dashboard, and redesigned fulfillment workflows.",
  },
  {
    year: "2022–24",
    title: "SCM Platform Modernization",
    role: "Product Dev Manager",
    tag: "UNIQLO · 3 legacy tools → 1",
    desc: "Led discovery interviews with 14 warehouse managers. Migrated 3 tools into one unified platform. NPS went from 32 → 71 in six months.",
  },
  {
    year: "2020–22",
    title: "Retail Operations Backend",
    role: "Software Engineer",
    tag: "UNIQLO · 10K+ daily transactions",
    desc: "Built the APIs that store associates and warehouse teams use every shift. Designed event-driven architecture for real-time inventory sync.",
  },
  {
    year: "2020–",
    title: "YouTube Channel",
    role: "Creator & Strategist",
    tag: "Independent · Tech in Japan",
    desc: "Built a niche community for developers navigating tech careers in Japan. Ran content experiments using retention curves and A/B format tests.",
  },
]

const skills = ["Product Strategy", "Roadmapping", "User Research", "PRDs & Specs", "Stakeholder Mgmt", "Data Analytics", "A/B Testing", "Agile/Scrum", "SQL", "Spring Boot", "React", "AWS"]

const s = {
  page: {
    background: "#080808",
    color: "#DCDCDC",
    fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
    minHeight: "100vh",
  } as React.CSSProperties,
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 48px",
    borderBottom: "1px solid #1a1a1a",
  } as React.CSSProperties,
  logo: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
    color: "#fff",
  },
  navRight: {
    display: "flex",
    gap: 32,
    alignItems: "center",
  } as React.CSSProperties,
  navLink: {
    color: "#555",
    fontSize: 13,
    letterSpacing: 0.5,
    textDecoration: "none",
  },
  hero: {
    padding: "80px 48px 64px",
    borderBottom: "1px solid #1a1a1a",
  } as React.CSSProperties,
  eyebrow: {
    color: "#00c7ff",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
    marginBottom: 24,
    display: "block",
  },
  heroTitle: {
    fontSize: "clamp(56px, 10vw, 120px)",
    fontWeight: 800,
    lineHeight: 0.92,
    letterSpacing: "-3px",
    color: "#fff",
    margin: "0 0 32px",
  },
  heroSub: {
    maxWidth: 520,
    color: "#555",
    fontSize: 17,
    lineHeight: 1.65,
    margin: "0 0 40px",
  },
  ctaRow: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  } as React.CSSProperties,
  ctaPrimary: {
    background: "#00c7ff",
    color: "#000",
    padding: "12px 28px",
    borderRadius: 4,
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 1,
    textTransform: "uppercase" as const,
    textDecoration: "none",
    display: "inline-block",
  },
  ctaSecondary: {
    color: "#555",
    fontSize: 13,
    letterSpacing: 1,
    textTransform: "uppercase" as const,
    textDecoration: "none",
    borderBottom: "1px solid #333",
    paddingBottom: 2,
  },
  section: {
    padding: "64px 48px",
    borderBottom: "1px solid #1a1a1a",
  } as React.CSSProperties,
  sectionLabel: {
    color: "#333",
    fontSize: 11,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
    marginBottom: 48,
    display: "flex",
    alignItems: "center",
    gap: 16,
  } as React.CSSProperties,
  labelLine: {
    flex: 1,
    height: 1,
    background: "#1a1a1a",
  },
  projectRow: {
    display: "grid",
    gridTemplateColumns: "120px 1fr auto",
    gap: "0 40px",
    alignItems: "start",
    padding: "36px 0",
    borderBottom: "1px solid #111",
  } as React.CSSProperties,
  projectYear: {
    color: "#333",
    fontSize: 13,
    fontWeight: 500,
    paddingTop: 4,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#E8E8E8",
    marginBottom: 6,
    lineHeight: 1.2,
  },
  projectRole: {
    color: "#00c7ff",
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    marginBottom: 10,
  },
  projectDesc: {
    color: "#555",
    fontSize: 14,
    lineHeight: 1.7,
    maxWidth: 600,
  },
  projectTag: {
    color: "#333",
    fontSize: 12,
    textAlign: "right" as const,
    whiteSpace: "nowrap" as const,
    paddingTop: 4,
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 64,
  } as React.CSSProperties,
  aboutTitle: {
    fontSize: "clamp(40px, 6vw, 72px)",
    fontWeight: 800,
    letterSpacing: "-2px",
    color: "#fff",
    lineHeight: 1,
    marginBottom: 32,
  },
  aboutBody: {
    color: "#555",
    fontSize: 15,
    lineHeight: 1.8,
    marginBottom: 24,
  },
  skillsGrid: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 10,
    marginTop: 8,
  },
  skill: {
    border: "1px solid #222",
    color: "#444",
    fontSize: 12,
    padding: "6px 14px",
    letterSpacing: 0.5,
  },
  footer: {
    padding: "32px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as React.CSSProperties,
  footerText: {
    color: "#333",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  switchLink: {
    position: "fixed" as const,
    bottom: 24,
    right: 24,
    background: "#111",
    border: "1px solid #222",
    color: "#555",
    fontSize: 12,
    padding: "10px 16px",
    borderRadius: 6,
    textDecoration: "none",
    letterSpacing: 0.5,
    zIndex: 100,
  },
}

export default function Idea1() {
  return (
    <>
      <Head>
        <title>Umang Chauhan — Product Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={s.page}>

        {/* Nav */}
        <nav style={s.nav}>
          <span style={s.logo}>UMANG.DEV</span>
          <div style={s.navRight}>
            <a href="#work" style={s.navLink}>Work</a>
            <a href="#about" style={s.navLink}>About</a>
            <a href="mailto:job@umang.dev" style={{ ...s.navLink, color: "#00c7ff" }}>job@umang.dev</a>
          </div>
        </nav>

        {/* Hero */}
        <section style={s.hero}>
          <span style={s.eyebrow}>Product Manager · UNIQLO · Tokyo</span>
          <h1 style={s.heroTitle}>
            Building<br />
            products<br />
            <span style={{ color: "#00c7ff" }}>at scale.</span>
          </h1>
          <p style={s.heroSub}>
            5 years shipping software and product at Fast Retailing. Engineering background that informs product judgment. Currently owning supply chain platforms across 50+ global stores.
          </p>
          <div style={s.ctaRow}>
            <a href="#work" style={s.ctaPrimary}>View Work</a>
            <a href="/UmangResume.pdf" download style={s.ctaSecondary}>Download Resume</a>
          </div>
        </section>

        {/* Work */}
        <section id="work" style={s.section}>
          <div style={s.sectionLabel}>
            <span>Selected Work</span>
            <div style={s.labelLine} />
          </div>
          {projects.map((p, i) => (
            <div key={i} style={s.projectRow}>
              <div style={s.projectYear}>{p.year}</div>
              <div>
                <div style={s.projectRole}>{p.role}</div>
                <div style={s.projectTitle}>{p.title}</div>
                <div style={s.projectDesc}>{p.desc}</div>
              </div>
              <div style={s.projectTag}>{p.tag}</div>
            </div>
          ))}
        </section>

        {/* About */}
        <section id="about" style={s.section}>
          <div style={s.sectionLabel}>
            <span>About</span>
            <div style={s.labelLine} />
          </div>
          <div style={s.aboutGrid}>
            <div>
              <h2 style={s.aboutTitle}>Engineer<br />turned PM.</h2>
              <p style={s.aboutBody}>
                I started as a software engineer building the backend systems that warehouse teams depend on every shift. After 2 years, I moved into product — keeping the technical depth, adding the strategic layer.
              </p>
              <p style={s.aboutBody}>
                Currently at UNIQLO&apos;s Global HQ in Tokyo, leading product for supply chain technology across US, Europe, and Asia.
              </p>
              <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
                <a href="mailto:job@umang.dev" style={s.ctaPrimary}>Get in Touch</a>
                <a href="https://linkedin.com/in/thisumang" target="_blank" rel="noreferrer" style={s.ctaSecondary}>LinkedIn</a>
              </div>
            </div>
            <div>
              <p style={{ ...s.projectRole, marginBottom: 20 }}>Skills & Tools</p>
              <div style={s.skillsGrid}>
                {skills.map((skill) => (
                  <span key={skill} style={s.skill}>{skill}</span>
                ))}
              </div>
              <p style={{ ...s.projectRole, marginTop: 40, marginBottom: 20 }}>Experience</p>
              {[
                ["2020–22", "Software Engineer", "Fast Retailing (UNIQLO)"],
                ["2022–24", "Product Dev Manager", "Fast Retailing (UNIQLO)"],
                ["2024–25", "Product Manager", "Fast Retailing, New York"],
                ["2025–", "Product Manager", "Fast Retailing, Tokyo"],
              ].map(([yr, title, co]) => (
                <div key={yr} style={{ display: "flex", gap: 24, marginBottom: 16, alignItems: "baseline" }}>
                  <span style={{ color: "#333", fontSize: 12, minWidth: 60 }}>{yr}</span>
                  <div>
                    <span style={{ color: "#ddd", fontSize: 14 }}>{title}</span>
                    <span style={{ color: "#444", fontSize: 13, marginLeft: 8 }}>{co}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={s.footer}>
          <span style={s.footerText}>© 2025 Umang Chauhan</span>
          <span style={s.footerText}>UMANG.DEV</span>
        </footer>

        <Link href="/idea" style={s.switchLink}>← All ideas</Link>
      </div>
    </>
  )
}
