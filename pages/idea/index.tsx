import Head from "next/head"
import Link from "next/link"

const ideas = [
  {
    num: "1",
    name: "Dark Editorial",
    desc: "Stark black, oversized type, horizontal rules. Confident and minimal.",
    palette: ["#0A0A0A", "#E8E8E8", "#00C7FF"],
  },
  {
    num: "2",
    name: "Bento Grid",
    desc: "Warm off-white mosaic of info tiles. Modern SaaS meets personal portfolio.",
    palette: ["#F7F5F0", "#1A1A1A", "#FF4500"],
  },
  {
    num: "3",
    name: "Warm Magazine",
    desc: "Cream background, serif headings, editorial sections. Human and literary.",
    palette: ["#FEFCF5", "#2C2422", "#C0392B"],
  },
  {
    num: "4",
    name: "Product Dashboard",
    desc: "Dark sidebar, metric cards, product-interface aesthetics. PM as operator.",
    palette: ["#0D1117", "#E6EDF3", "#6366F1"],
  },
]

export default function IdeaIndex() {
  return (
    <>
      <Head>
        <title>Design Ideas — UMANG.dev</title>
      </Head>
      <div style={{ background: "#0A0A0A", minHeight: "100vh", color: "#E8E8E8", fontFamily: "system-ui, sans-serif", padding: "60px 40px" }}>
        <p style={{ color: "#666", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Portfolio Design Exploration</p>
        <h1 style={{ fontSize: 48, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.1 }}>4 Design Directions</h1>
        <p style={{ color: "#888", marginBottom: 60, fontSize: 16 }}>Click any option to see the full design. All use the same content.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {ideas.map((idea) => (
            <Link key={idea.num} href={`/idea/${idea.num}`} style={{ textDecoration: "none" }}>
              <div style={{
                border: "1px solid #222",
                borderRadius: 12,
                padding: 28,
                background: "#111",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#444")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#222")}
              >
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  {idea.palette.map((color, i) => (
                    <div key={i} style={{ width: 20, height: 20, borderRadius: "50%", background: color, border: "1px solid #333" }} />
                  ))}
                </div>
                <p style={{ color: "#555", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 8px" }}>
                  Idea {idea.num}
                </p>
                <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 10px", color: "#E8E8E8" }}>{idea.name}</h2>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{idea.desc}</p>
                <p style={{ color: "#00c7ff", fontSize: 13, marginTop: 20, margin: "20px 0 0" }}>View design →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
