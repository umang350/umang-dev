import Page from '@/components/utility/Page'
import { routes } from "@/data/global"
import { projects, projectsJA, Project } from "@/data/content/projects"
import { useRouter } from "next/router"

const PageName = "Projects";

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-fun-pink transition-colors bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-fun-pink">{project.year}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{project.role}</span>
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-2">Impact</h3>
                <ul className="space-y-1">
                    {project.impact.map((item, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="text-fun-pink mt-1 text-xs">&#9654;</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                    <span key={index} className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}

const Projects = () => {
    const { locale } = useRouter();
    const projectData = locale === "ja" ? projectsJA : projects;

    return (
        <Page currentPage={PageName} meta={{
            desc: routes.find(i => i.title === PageName).description
        }}>
            <section className="max-w-6xl mx-auto">
                <div className="h-48">
                    <h1 className="text-5xl md:text-9xl font-bold pt-7 md:py-20 text-center md:text-left dark:text-white text-black">
                        {locale === "ja" ? "プロジェクト." : "Projects."}
                    </h1>
                </div>
                <div className="md:-mt-10 -mt-36">
                    <div className="max-w-6xl mx-auto pt-20 text-left">
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                            {locale === "ja"
                                ? "プロダクト構築とチームリードを通じて、テクノロジーとリテールの交差点でインパクトを与えてきたプロジェクトの一覧です。"
                                : "A collection of projects where I've driven impact at the intersection of technology and retail through product building and team leadership."}
                        </p>
                        <div className="grid gap-8 md:grid-cols-2">
                            {projectData.map((project, index) => (
                                <ProjectCard key={index} project={project} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}

export default Projects
