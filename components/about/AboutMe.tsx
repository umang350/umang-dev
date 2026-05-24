import { Experience } from "./Experience";
import { information, informationJA } from "@/data/content/about"
import { useRouter } from "next/router";
import Image from "next/image";

const skills = [
  { category: "Product", items: ["Strategy & Roadmapping", "User Research", "PRDs & Specs", "OKRs & KPIs", "Go-to-Market", "Stakeholder Mgmt"], labelClass: "text-dash-acc", tagClass: "bg-dash-acc/10 border-dash-acc/20" },
  { category: "Analytics", items: ["Data Analysis", "A/B Testing", "SQL", "Google Analytics", "Product Metrics"], labelClass: "text-dash-green", tagClass: "bg-dash-green/10 border-dash-green/20" },
  { category: "Technical", items: ["Spring Boot", "React", "AWS", "CI/CD", "API Design", "System Architecture"], labelClass: "text-dash-pink", tagClass: "bg-dash-pink/10 border-dash-pink/20" },
  { category: "Leadership", items: ["Cross-functional", "Agile/Scrum", "Discovery", "Competitive Analysis"], labelClass: "text-dash-acc2", tagClass: "bg-dash-acc2/10 border-dash-acc2/20" },
]

export const AboutMe = () => {
  const { locale } = useRouter();
  const info = locale === "ja" ? informationJA : information;

  return (
    <section className="animate-fadeUp">
      {/* Page title */}
      <div className="mb-10">
        <p className="section-label">About</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {info.title.replace(".", "")}
          <span className="gradient-text">.</span>
        </h1>
      </div>

      {/* Bio section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 mb-10">
        {/* Background card */}
        <div className="card-base noise p-7 relative">
          {/* Decorative blob */}
          <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] opacity-[0.06]">
            <Image src="/sq.png" alt="" width={120} height={120} style={{ objectFit: "contain" }} />
          </div>

          <div className="inline-flex items-center gap-2 bg-dash-acc/10 text-dash-acc text-xs font-bold px-3 py-1 rounded-md mb-5 border border-dash-acc/20">
            {info.subheading}
          </div>

          <p className="text-dash-muted text-[15px] leading-[1.8] mb-6">
            {info.desc}
          </p>

          <ul className="space-y-3 mb-6">
            {info.descPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-dash-acc mt-0.5 text-xs">▸</span>
                <span className="text-dash-text text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          {/* Mini stats */}
          <div className="flex gap-8 pt-5 border-t border-dash-border">
            {[
              { label: "Education", val: "B.Tech CS" },
              { label: "Location", val: "Tokyo, JP" },
              { label: "Languages", val: "EN · JP · HI" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-[10px] font-semibold text-dash-muted uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-sm font-semibold text-dash-text">{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience timeline */}
        <div className="card-base noise p-7">
          <h3 className="text-lg font-bold text-dash-text mb-6 tracking-tight">Timeline</h3>
          <Experience />
        </div>
      </div>

      {/* Contact */}
      <div className="card-base noise p-7 mb-10">
        <h3 className="text-lg font-bold text-dash-text mb-3">
          {locale === "ja" ? "お問い合わせ" : "Get in Touch"}
        </h3>
        <p className="text-dash-muted text-sm leading-relaxed mb-4">
          {locale === "ja"
            ? "お気軽にメールでお問い合わせください。必ず返信いたします。"
            : "I combine a strong engineering background with product intuition to ship impactful products. If you're looking for a PM who can bridge technical and business stakeholders, let's connect."}
        </p>
        <div className="flex gap-3">
          <a
            href="mailto:job@umang.dev"
            className="bg-gradient-to-r from-dash-acc to-dash-acc2 text-white px-5 py-2.5 rounded-[10px] text-sm font-bold shadow-lg shadow-dash-acc/20 hover:opacity-90 transition-opacity"
          >
            Send email
          </a>
          <a
            href="/UmangResume.pdf"
            download
            className="border border-dash-border text-dash-text px-5 py-2.5 rounded-[10px] text-sm font-semibold hover:border-dash-acc transition-colors"
          >
            Resume ↓
          </a>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <p className="section-label">Skills</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map(({ category, items, labelClass, tagClass }) => (
          <div key={category} className="card-base card-accent-top noise p-5">
            <p className={`text-[11px] font-extrabold uppercase tracking-[1.5px] mb-4 ${labelClass}`}>
              {category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map(skill => (
                <span
                  key={skill}
                  className={`text-xs text-dash-text font-medium border px-3 py-1.5 rounded-md ${tagClass}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
