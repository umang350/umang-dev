import Page from '@/components/utility/Page'
import { routes } from "@/data/global"
import { projects, projectsJA, Project } from "@/data/content/projects"
import { useRouter } from "next/router"
import Link from "next/link"

const PageName = "Projects";

const gradients = [
  "from-dash-acc/[0.12] to-dash-acc2/[0.04]",
  "from-dash-green/[0.1] to-dash-acc/[0.04]",
  "from-dash-pink/[0.1] to-dash-acc/[0.04]",
  "from-yellow-400/[0.1] to-dash-acc/[0.04]",
]

function StatusBadge({ status }: { status: string }) {
  const active = status === "Active"
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border backdrop-blur-sm ${
      active
        ? "bg-dash-green/[0.08] text-dash-green border-dash-green/25"
        : "bg-dash-muted/[0.08] text-dash-muted border-dash-border"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-dash-green shadow-[0_0_8px_rgba(52,211,153,0.4)]" : "bg-dash-muted"}`} />
      {status}
    </span>
  )
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const isActive = project.year.includes("Present") || project.year.includes("現在")
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className={`bg-gradient-to-br ${gradients[index % gradients.length]} border border-dash-border rounded-xl p-6 hover:border-dash-acc/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 h-full flex flex-col group noise cursor-pointer`}>
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-dash-muted font-monospace tabular-nums">{project.year}</span>
          <StatusBadge status={isActive ? "Active" : "Shipped"} />
        </div>

        <h2 className="text-lg font-bold text-dash-text mb-1.5 tracking-tight">{project.title}</h2>
        <p className="text-xs font-medium text-dash-acc mb-3">{project.role}</p>
        <p className="text-sm text-dash-muted leading-relaxed mb-4">{project.description}</p>

        {/* Impact */}
        <div className="mb-4 flex-1">
          <h3 className="text-[10px] font-bold text-dash-muted uppercase tracking-widest mb-2">Impact</h3>
          <ul className="space-y-1.5">
            {project.impact.map((item, i) => (
              <li key={i} className="text-sm text-dash-muted flex items-start gap-2">
                <span className="text-dash-acc mt-0.5 text-[10px]">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.map((skill, i) => (
            <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-dash-acc/10 text-dash-acc border border-dash-acc/15">
              {skill}
            </span>
          ))}
        </div>

        <span className="text-dash-acc text-xs font-semibold inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Read case study <span className="text-sm">→</span>
        </span>
      </div>
    </Link>
  )
}

const Projects = () => {
  const { locale } = useRouter();
  const projectData = locale === "ja" ? projectsJA : projects;

  return (
    <Page currentPage={PageName} meta={{
      desc: routes.find(i => i.title === PageName)?.description ?? "Product case studies and projects."
    }}>
      <section className="animate-fadeUp">
        <div className="mb-10">
          <p className="section-label">Work</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {locale === "ja" ? "プロジェクト" : "Projects"}
            <span className="gradient-text">.</span>
          </h1>
          <p className="text-dash-muted text-[15px] leading-relaxed max-w-2xl">
            {locale === "ja"
              ? "プロダクト構築とチームリードを通じて、テクノロジーとリテールの交差点でインパクトを与えてきたプロジェクトの一覧です。"
              : "A collection of projects where I've driven impact at the intersection of technology and retail through product building and team leadership."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projectData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </section>
    </Page>
  )
}

export default Projects
