import { GetStaticPaths, GetStaticProps } from "next"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Page from "@/components/utility/Page"
import Link from "next/link"

type Frontmatter = {
    title: string
    role: string
    year: string
    company: string
    skills: string[]
    summary: string
}

type Props = {
    source: MDXRemoteSerializeResult
    frontmatter: Frontmatter
    slug: string
}

const CONTENT_DIR = path.join(process.cwd(), "content/projects")

export default function CaseStudy({ source, frontmatter, slug }: Props) {
    return (
        <Page
            currentPage="Projects"
            meta={{ desc: frontmatter.summary }}
        >
            <article className="max-w-3xl mx-auto text-left py-6 animate-fadeUp">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 text-sm text-dash-muted hover:text-dash-acc transition-colors mb-8 group"
                >
                    <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Projects
                </Link>

                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                        <span className="text-xs font-bold text-dash-acc font-monospace bg-dash-acc/10 border border-dash-acc/20 px-2.5 py-1 rounded-md">
                            {frontmatter.year}
                        </span>
                        <span className="text-xs text-dash-muted bg-dash-muted/10 border border-dash-border px-2.5 py-1 rounded-full font-medium">
                            {frontmatter.role}
                        </span>
                        <span className="text-xs text-dash-muted">
                            {frontmatter.company}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-dash-text mb-4 leading-tight tracking-tight">
                        {frontmatter.title}
                    </h1>

                    <p className="text-lg text-dash-muted leading-relaxed mb-6">
                        {frontmatter.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {frontmatter.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-dash-acc/10 text-dash-acc border border-dash-acc/15"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <hr className="border-dash-border mb-8" />

                <div className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-dash-text
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                    prose-p:text-dash-muted prose-p:leading-relaxed
                    prose-li:text-dash-muted
                    prose-strong:text-dash-text
                    prose-a:text-dash-acc prose-a:no-underline hover:prose-a:underline
                    prose-hr:border-dash-border
                    prose-blockquote:border-dash-acc/30 prose-blockquote:text-dash-muted
                    prose-code:text-dash-pink prose-code:bg-dash-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-dash-card prose-pre:border prose-pre:border-dash-border prose-pre:rounded-xl">
                    <MDXRemote {...source} />
                </div>

                <hr className="border-dash-border mt-14 mb-8" />

                <div className="flex items-center justify-between">
                    <Link
                        href="/projects"
                        className="text-sm text-dash-muted hover:text-dash-acc transition-colors group inline-flex items-center gap-1.5"
                    >
                        <span className="group-hover:-translate-x-0.5 transition-transform">←</span> All Projects
                    </Link>
                    <a
                        href="mailto:job@umang.dev"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-dash-acc to-dash-acc2 text-white px-5 py-2.5 rounded-[10px] text-sm font-bold shadow-lg shadow-dash-acc/20 hover:opacity-90 transition-opacity"
                    >
                        Let&apos;s connect
                    </a>
                </div>
            </article>
        </Page>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const files = fs.readdirSync(CONTENT_DIR)
    const paths = files
        .filter(f => f.endsWith(".mdx"))
        .map(f => ({ params: { slug: f.replace(".mdx", "") } }))
    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
    const raw = fs.readFileSync(filePath, "utf-8")
    const { content, data } = matter(raw)
    const source = await serialize(content)
    return {
        props: {
            source,
            frontmatter: data,
            slug,
        },
    }
}
