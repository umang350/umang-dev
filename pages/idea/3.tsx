import Head from "next/head"
import Link from "next/link"

// Idea 3: Warm Magazine / Editorial
// ─ Cream background, serif headings, section numbers, editorial feel
// ─ Human, literary, personal
// ─ Accent: #B5451B (burnt sienna)

const ACC = "#B5451B"
const BG = "#FEFAF2"
const TEXT = "#1E1B18"
const MUTED = "#8A7E72"
const LINE = "#E2D9CB"

export default function Idea3() {
  return (
    <>
      <Head>
        <title>Umang Chauhan — Product Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; }
          body { background: ${BG}; color: ${TEXT}; margin: 0; }
          ::selection { background: ${ACC}; color: #fff; }
          .serif { font-family: Georgia, 'Times New Roman', serif; }
          .sans { font-family: 'Be Vietnam Pro', system-ui, sans-serif; }
          .section-num {
            font-family: Georgia, serif;
            font-size: 11px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: ${MUTED};
          }
          h2.mag-head {
            font-family: Georgia, serif;
            font-size: clamp(36px, 6vw, 72px);
            font-weight: 400;
            letter-spacing: -1.5px;
            line-height: 1.05;
            color: ${TEXT};
            margin: 0 0 32px;
          }
          .work-item { border-top: 1px solid ${LINE}; padding: 40px 0; }
          .work-item:last-child { border-bottom: 1px solid ${LINE}; }
          .work-year { font-family: 'Be Vietnam Pro', sans-serif; font-size: 12px; color: ${MUTED}; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
          .work-title { font-family: Georgia, serif; font-size: 28px; font-weight: 400; color: ${TEXT}; margin-bottom: 8px; line-height: 1.2; }
          .work-role { font-size: 13px; color: ${ACC}; font-family: 'Be Vietnam Pro', sans-serif; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 14px; }
          .work-desc { color: ${MUTED}; font-size: 15px; line-height: 1.8; max-width: 600px; font-family: 'Be Vietnam Pro', sans-serif; }
          .timeline-item { display: flex; gap: 32px; padding: 20px 0; border-top: 1px solid ${LINE}; align-items: baseline; }
          .timeline-yr { font-family: Georgia, serif; font-size: 13px; color: ${MUTED}; min-width: 80px; }
          .timeline-title { font-family: 'Be Vietnam Pro', sans-serif; font-size: 15px; font-weight: 600; color: ${TEXT}; }
          .timeline-co { font-family: 'Be Vietnam Pro', sans-serif; font-size: 13px; color: ${MUTED}; margin-top: 2px; }
          @media(max-width: 700px) {
            .two-col { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </Head>

      <div style={{ background: BG, minHeight: "100vh" }}>

        {/* Masthead */}
        <header style={{ borderBottom: `3px solid ${TEXT}`, padding: "20px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: MUTED, marginBottom: 4 }}>
              Portfolio
            </div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
              Umang Chauhan
            </div>
          </div>
          <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", display: "flex", gap: 32, alignItems: "center" }}>
            <a href="#work" style={{ color: MUTED, fontSize: 13, textDecoration: "none" }}>Work</a>
            <a href="#about" style={{ color: MUTED, fontSize: 13, textDecoration: "none" }}>About</a>
            <a href="mailto:job@umang.dev" style={{ color: ACC, fontSize: 13, textDecoration: "none", borderBottom: `1px solid ${ACC}`, paddingBottom: 2 }}>
              job@umang.dev
            </a>
          </div>
        </header>

        {/* Hero — Magazine cover story style */}
        <section style={{ padding: "80px 60px 60px", borderBottom: `1px solid ${LINE}`, maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 80, alignItems: "end" }} className="two-col">
            <div>
              <p className="section-num" style={{ marginBottom: 24 }}>Product Manager · Fast Retailing · Tokyo</p>
              <h1 className="serif" style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(52px, 8vw, 96px)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "-3px",
                color: TEXT,
                margin: "0 0 40px",
              }}>
                From code<br />to strategy.
              </h1>
              <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", color: MUTED, fontSize: 17, lineHeight: 1.75, maxWidth: 480, marginBottom: 36 }}>
                I spent two years writing the APIs that warehouse teams depend on every shift. Now I own the product vision for the systems I once helped build.
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                <a href="#work" style={{
                  background: ACC, color: "#fff", padding: "13px 30px", fontSize: 14,
                  fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, textDecoration: "none",
                  borderRadius: 2,
                }}>See my work</a>
                <a href="/UmangResume.pdf" download style={{
                  border: `1px solid ${LINE}`, color: TEXT, padding: "13px 30px", fontSize: 14,
                  fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, textDecoration: "none",
                  borderRadius: 2,
                }}>Resume</a>
              </div>
            </div>

            {/* Pull quote / sidebar */}
            <div style={{ borderLeft: `3px solid ${ACC}`, paddingLeft: 32 }}>
              <p className="serif" style={{ fontFamily: "Georgia, serif", fontSize: 22, lineHeight: 1.5, fontStyle: "italic", color: TEXT, marginBottom: 20 }}>
                &ldquo;The most useful thing I learned as an engineer: system constraints are product constraints.&rdquo;
              </p>
              <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "center" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
                  <span style={{ color: TEXT, fontSize: 13, fontWeight: 600 }}>Open to PM opportunities</span>
                </div>
                <p style={{ color: MUTED, fontSize: 13 }}>Based in Tokyo · Available globally</p>
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
            <p className="section-num">01 / Selected Work</p>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 11, color: MUTED, letterSpacing: 1 }}>2020 – Present</span>
          </div>

          {[
            {
              year: "2024 – Present",
              role: "Product Manager",
              title: "Global Supply Chain Platform",
              desc: "Owning the product roadmap for UNIQLO's supply chain across US, Europe, and Southeast Asia. Shipped inventory allocation engine serving 50+ stores, real-time tracking dashboard, redesigned fulfillment workflows.",
              tags: ["Product Roadmapping", "Stakeholder Mgmt", "Data Analytics"],
            },
            {
              year: "2022 – 2024",
              role: "Product Development Manager",
              title: "SCM Platform Modernization",
              desc: "Led discovery with 14 warehouse managers. Migrated 3 legacy tools into a unified platform. Parallel-run migration strategy let trust build gradually. NPS went from 32 to 71 in six months.",
              tags: ["User Research", "PRDs & Specs", "Cross-functional Leadership"],
            },
            {
              year: "2020 – 2022",
              role: "Software Engineer",
              title: "Retail Operations Backend Systems",
              desc: "Built core backend services for store and warehouse operations. RESTful APIs handling 10K+ daily transactions. Event-driven architecture for real-time inventory sync.",
              tags: ["Spring Boot", "AWS", "System Design"],
            },
            {
              year: "2020 – Present",
              role: "Creator & Strategist",
              title: "YouTube Channel",
              desc: "Built a niche community for developers navigating tech careers in Japan. Treated it like a product: content pillars, retention curve analysis, format A/B tests.",
              tags: ["Growth Strategy", "A/B Testing", "Community"],
            },
          ].map((w) => (
            <div key={w.title} className="work-item">
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 40 }}>
                <div>
                  <div className="work-year">{w.year}</div>
                  <div className="work-role">{w.role}</div>
                </div>
                <div>
                  <h3 className="work-title">{w.title}</h3>
                  <p className="work-desc">{w.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                    {w.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        border: `1px solid ${LINE}`,
                        color: MUTED,
                        fontSize: 11,
                        padding: "4px 12px",
                        borderRadius: 2,
                        letterSpacing: 0.5,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* About Section */}
        <section id="about" style={{ background: TEXT, color: BG, padding: "64px 60px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#666", marginBottom: 40 }}>
              02 / About
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="two-col">
              <div>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: 42, fontWeight: 400, lineHeight: 1.1, marginBottom: 32, letterSpacing: -1 }}>
                  Background &amp; experience
                </h2>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", color: "#888", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
                  I graduated from Delhi Technological University with a degree in Computer Science and Mathematics. My first PM-adjacent insight happened not in a meeting room but reading a Jira ticket — realising a senior engineer&apos;s &ldquo;simple&rdquo; request would break three downstream services.
                </p>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", color: "#888", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
                  That moment pushed me from engineering into product. I&apos;ve spent the last three years at UNIQLO doing both: building products for ops teams who never got a PM before, and proving that engineering empathy is a feature, not a nice-to-have.
                </p>
                <a href="mailto:job@umang.dev" style={{
                  background: ACC, color: "#fff", padding: "13px 28px",
                  fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, fontWeight: 600,
                  textDecoration: "none", borderRadius: 2, display: "inline-block",
                }}>
                  Reach out →
                </a>
              </div>

              <div>
                <p style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#555", marginBottom: 20 }}>
                  Timeline
                </p>
                {[
                  ["2016 – 2020", "B.Tech, Computer Science", "Delhi Technological University"],
                  ["2019", "Tech Intern", "Tata Communications"],
                  ["2020 – 2022", "Software Engineer", "Fast Retailing (UNIQLO)"],
                  ["2022 – 2024", "Product Dev Manager", "Fast Retailing (UNIQLO)"],
                  ["2024 – 2025", "Product Manager", "Fast Retailing, New York"],
                  ["2025 – Now", "Product Manager", "Fast Retailing, Tokyo"],
                ].map(([yr, title, co]) => (
                  <div key={yr} className="timeline-item" style={{ borderTopColor: "#222" }}>
                    <span className="timeline-yr" style={{ color: "#555", minWidth: 100 }}>{yr}</span>
                    <div>
                      <div className="timeline-title" style={{ color: "#ddd" }}>{title}</div>
                      <div className="timeline-co">{co}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact footer */}
        <footer style={{ borderTop: `3px solid ${TEXT}`, padding: "40px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", background: BG }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 13, color: MUTED }}>© 2025 Umang Chauhan</span>
          <a href="mailto:job@umang.dev" style={{ fontFamily: "Georgia, serif", fontSize: 16, color: ACC, textDecoration: "none", fontStyle: "italic" }}>
            job@umang.dev →
          </a>
        </footer>

        <Link href="/idea" style={{
          position: "fixed", bottom: 24, right: 24,
          background: TEXT, color: BG,
          fontSize: 12, padding: "10px 16px", borderRadius: 6,
          textDecoration: "none", letterSpacing: 0.5, zIndex: 100,
          fontFamily: "'Be Vietnam Pro', sans-serif",
        }}>← All ideas</Link>
      </div>
    </>
  )
}
