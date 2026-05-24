import Head from "next/head"
import Link from "next/link"

// Idea 2: Bento Grid
// ─ Warm off-white background, info tiles of varying sizes
// ─ Modern SaaS meets personal portfolio
// ─ Accent: #FF4500 (deep orange)

const ACC = "#FF4500"
const BG = "#F2EFE9"
const TEXT = "#1A1705"
const MUTED = "#9A9585"
const CARD = "#EDEAE3"
const CARDBORDER = "#DDD9D0"

const tile: React.CSSProperties = {
  background: CARD,
  border: `1px solid ${CARDBORDER}`,
  borderRadius: 16,
  padding: 28,
  fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
}

export default function Idea2() {
  return (
    <>
      <Head>
        <title>Umang Chauhan — PM Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: ${BG}; }
          @media (max-width: 700px) {
            .bento-grid { grid-template-columns: 1fr !important; }
            .span2 { grid-column: span 1 !important; }
          }
        `}</style>
      </Head>

      <div style={{ background: BG, minHeight: "100vh", color: TEXT, fontFamily: "'Be Vietnam Pro', system-ui, sans-serif" }}>

        {/* Header */}
        <header style={{ padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>UMANG.DEV</span>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="#work" style={{ color: MUTED, fontSize: 14, textDecoration: "none" }}>Work</a>
            <a href="mailto:job@umang.dev"
              style={{ background: TEXT, color: BG, padding: "9px 20px", borderRadius: 100, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
              Contact
            </a>
          </div>
        </header>

        {/* Bento Grid */}
        <main style={{ padding: "8px 40px 60px" }}>
          <div className="bento-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}>

            {/* [WIDE] Hero intro */}
            <div className="span2" style={{ ...tile, gridColumn: "span 2", background: TEXT, color: BG, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
              <div>
                <span style={{ color: "#666", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Product Manager</span>
                <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, marginTop: 12 }}>
                  I build products<br />people rely on<br /><span style={{ color: ACC }}>every day.</span>
                </h1>
              </div>
              <p style={{ color: "#888", fontSize: 15, lineHeight: 1.6, maxWidth: 480 }}>
                5 years at UNIQLO — from writing APIs to owning the product roadmap for supply chain systems across 50+ global stores.
              </p>
            </div>

            {/* [NARROW] Currently */}
            <div style={{ ...tile, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span style={{ color: MUTED, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Currently</span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
                  <span style={{ fontWeight: 700, fontSize: 16 }}>Open to opportunities</span>
                </div>
                <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>PM roles in product strategy, ops tech, or consumer at growth-stage or enterprise.</p>
              </div>
              <div style={{ marginTop: 20 }}>
                <span style={{ color: MUTED, fontSize: 12 }}>📍 Tokyo, Japan</span>
              </div>
            </div>

            {/* [NARROW] Project 1 */}
            <div style={{ ...tile, borderLeft: `4px solid ${ACC}` }}>
              <span style={{ color: ACC, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>2024 – Present</span>
              <h3 style={{ fontWeight: 700, fontSize: 17, marginTop: 8, marginBottom: 6, lineHeight: 1.2 }}>Global Supply Chain Platform</h3>
              <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>Inventory allocation engine serving 50+ stores. Real-time shipment tracking. 3 engineering squads across 5 regions.</p>
              <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["PM", "Roadmap", "Stakeholders"].map(t => (
                  <span key={t} style={{ background: BG, border: `1px solid ${CARDBORDER}`, fontSize: 11, padding: "3px 10px", borderRadius: 100 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* [NARROW] Project 2 */}
            <div style={{ ...tile, borderLeft: `4px solid ${ACC}` }}>
              <span style={{ color: ACC, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>2022 – 2024</span>
              <h3 style={{ fontWeight: 700, fontSize: 17, marginTop: 8, marginBottom: 6, lineHeight: 1.2 }}>SCM Platform Modernization</h3>
              <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>Migrated 3 legacy tools → 1 platform. NPS 32 → 71 in 6 months. 14 user interviews. 40+ backlog items prioritized.</p>
              <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Discovery", "PRDs", "Research"].map(t => (
                  <span key={t} style={{ background: BG, border: `1px solid ${CARDBORDER}`, fontSize: 11, padding: "3px 10px", borderRadius: 100 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* [NARROW] Metrics */}
            <div style={{ ...tile }}>
              <span style={{ color: MUTED, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>By the numbers</span>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                {[["50+", "Global stores served"], ["10K+", "Daily API transactions"], ["5 yrs", "At Fast Retailing"], ["NPS 71", "Post-migration score"]].map(([num, label]) => (
                  <div key={num} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: ACC }}>{num}</span>
                    <span style={{ color: MUTED, fontSize: 12, textAlign: "right", maxWidth: 120 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* [WIDE] About */}
            <div className="span2" style={{ ...tile, gridColumn: "span 2" }}>
              <span style={{ color: MUTED, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Background</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, marginTop: 12, marginBottom: 16, letterSpacing: -0.5 }}>Engineer → Product Manager</h2>
              <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.75, maxWidth: 600 }}>
                I started writing APIs at UNIQLO, building the systems warehouse teams and store associates rely on every day. That hands-on experience gave me domain knowledge that now informs my product decisions — I know what &ldquo;can we just add a field?&rdquo; actually costs.
              </p>
              <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                <a href="mailto:job@umang.dev"
                  style={{ background: ACC, color: "#fff", padding: "11px 24px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                  Let&apos;s Talk
                </a>
                <a href="/UmangResume.pdf" download
                  style={{ background: "transparent", color: TEXT, border: `1px solid ${CARDBORDER}`, padding: "11px 24px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                  Resume
                </a>
              </div>
            </div>

            {/* [NARROW] Skills */}
            <div style={{ ...tile }}>
              <span style={{ color: MUTED, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Core skills</span>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Product Strategy", "User Research", "Roadmapping", "Data Analytics", "A/B Testing", "Cross-functional Leadership"].map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACC, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: TEXT }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* [NARROW] YouTube/Community */}
            <div style={{ ...tile }}>
              <span style={{ color: MUTED, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Side Project</span>
              <h3 style={{ fontWeight: 700, fontSize: 17, marginTop: 8, marginBottom: 6 }}>YouTube Channel</h3>
              <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>Built a niche community for developers in Japan. Treated it like a product — retention curves, format A/B tests, content pillars.</p>
              <a href="https://youtube.com/GetSaged" target="_blank" rel="noreferrer"
                style={{ color: ACC, fontSize: 13, textDecoration: "none", marginTop: 12, display: "block" }}>
                View channel →
              </a>
            </div>

            {/* [NARROW] Contact */}
            <div style={{ ...tile, background: ACC, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Get in touch</span>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 22, lineHeight: 1.2, marginTop: 20 }}>Looking for a PM who ships?</h3>
              </div>
              <a href="mailto:job@umang.dev"
                style={{ background: "#fff", color: ACC, padding: "12px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none", display: "block", textAlign: "center", marginTop: 20 }}>
                job@umang.dev
              </a>
            </div>

          </div>
        </main>

        <Link href="/idea" style={{
          position: "fixed", bottom: 24, right: 24,
          background: TEXT, color: BG,
          fontSize: 12, padding: "10px 16px", borderRadius: 6,
          textDecoration: "none", letterSpacing: 0.5, zIndex: 100,
        }}>← All ideas</Link>
      </div>
    </>
  )
}
