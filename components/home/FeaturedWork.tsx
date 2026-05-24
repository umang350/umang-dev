import Link from "next/link"
import { projects } from "@/data/content/projects"
import { useRouter } from "next/router"

const featured = projects.slice(0, 3)

const gradients = [
  "bg-gradient-to-br from-dash-acc/[0.12] to-dash-acc2/[0.04]",
  "bg-gradient-to-br from-dash-green/[0.1] to-dash-acc/[0.04]",
  "bg-gradient-to-br from-dash-pink/[0.1] to-dash-acc/[0.04]",
]

export default function FeaturedWork() {
  const { locale } = useRouter()

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="section-label">Work</p>
          <h2 className="text-xl font-bold text-dash-text">
            {locale === "ja" ? "注目の実績" : "Featured Work"}
          </h2>
        </div>
        <Link
          href="/projects"
          className="text-xs font-semibold text-dash-acc border border-dash-border px-4 py-2 rounded-lg hover:border-dash-acc/40 transition-colors inline-flex items-center gap-1.5"
        >
          {locale === "ja" ? "すべて見る" : "View all"} <span>→</span>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((project, i) => (
          <Link key={project.slug} href={`/projects/${project.slug}`}>
            <div className={`${gradients[i]} border border-dash-border rounded-xl p-5 hover:border-dash-acc/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 h-full flex flex-col group noise`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-dash-acc font-monospace">{project.year}</span>
                <span className="text-[11px] text-dash-muted bg-dash-muted/10 border border-dash-border px-2.5 py-0.5 rounded-full font-medium">
                  {project.role}
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-dash-text mb-2 leading-snug">
                {project.title}
              </h3>
              <p className="text-sm text-dash-muted leading-relaxed flex-1">
                {project.impact[0]}
              </p>
              <span className="text-dash-acc text-xs font-semibold mt-3 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Read case study <span className="text-sm">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
