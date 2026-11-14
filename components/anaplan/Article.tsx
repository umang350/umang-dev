import Link from "next/link";
import React from "react";
import ToolkitShell from "@/components/anaplan/ToolkitShell";
import { HeroArt } from "@/components/anaplan/Viz";
import { guides } from "@/data/anaplan/guides";

// Layout and text helpers shared by the articles under /anaplan/guides.

export { guides };

export const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-12 text-2xl font-semibold tracking-tight text-gray-900">{children}</h2>
);

export const H3 = ({ children }: { children: React.ReactNode }) => (
    <h3 className="mt-8 text-lg font-semibold text-gray-900">{children}</h3>
);

export const P = ({ children }: { children: React.ReactNode }) => (
    <p className="mt-4 leading-relaxed text-gray-700">{children}</p>
);

export const UL = ({ children }: { children: React.ReactNode }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700 marker:text-red-600">{children}</ul>
);

export const OL = ({ children }: { children: React.ReactNode }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-gray-700 marker:font-semibold marker:text-red-600">{children}</ol>
);

export const Code = ({ children }: { children: React.ReactNode }) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em] text-gray-800">{children}</code>
);

export const Callout = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <aside className="mt-8 rounded-2xl border border-red-100 bg-red-50/60 p-5">
        <p className="text-sm font-semibold text-red-700">{title}</p>
        <div className="mt-1 text-sm leading-relaxed text-gray-700">{children}</div>
    </aside>
);

type Props = {
    slug: string;
    title: string;
    desc: string;
    kicker: string;
    published: string; // ISO date
    readMinutes: number;
    children: React.ReactNode;
};

const ogImage = "https://umang.dev/anaplan/summary.png";

const Article = ({ slug, title, desc, kicker, published, readMinutes, children }: Props) => {
    const path = `/anaplan/guides/${slug}`;
    const guide = guides.find((g) => g.slug === slug);
    // Same category first, then the rest, four at most.
    const others = guides
        .filter((g) => g.slug !== slug)
        .sort((a, b) => Number(b.category === guide?.category) - Number(a.category === guide?.category))
        .slice(0, 4);
    const url = `https://umang.dev${path}`;
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description: desc,
            datePublished: published,
            dateModified: published,
            mainEntityOfPage: url,
            image: ogImage,
            inLanguage: "en",
            author: { "@type": "Person", name: "Umang Chauhan", url: "https://umang.dev" },
            publisher: { "@type": "Person", name: "Umang Chauhan", url: "https://umang.dev" },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Anaplan Toolkit", item: "https://umang.dev/anaplan" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://umang.dev/anaplan#guides" },
                { "@type": "ListItem", position: 3, name: title, item: url },
            ],
        },
    ];
    return (
        <ToolkitShell title={guide?.seoTitle ?? `${title} | Anaplan Toolkit`} ogTitle={title} desc={desc} path={path} ogImage={ogImage} ogType="article" keywords={guide?.keywords} jsonLd={jsonLd}>
            <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
                <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
                    <Link href="/anaplan" className="hover:text-gray-800">Anaplan Toolkit</Link>
                    <span className="mx-2">/</span>
                    <Link href="/anaplan#guides" className="hover:text-gray-800">Guides</Link>
                </nav>
                <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-red-600">{kicker}{guide ? ` · ${guide.category}` : ""}</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                <p className="mt-3 text-sm text-gray-500">
                    By Umang Chauhan · {new Date(published).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })} · {readMinutes} min read
                </p>
                <p className="mt-6 text-lg leading-relaxed text-gray-700">{desc}</p>
                {guide && (
                    <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
                        <HeroArt kind={guide.hero} label={`Illustration for ${title}`} className="h-48 sm:h-64" />
                    </div>
                )}

                {children}

                <section className="mt-16 rounded-2xl border border-gray-200 p-6">
                    <p className="font-semibold">Do this audit in minutes, not days</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        Anaplan Toolkit is a free Chrome and Firefox extension that reads the structure of the model you
                        have open: modules, line items, lists, formulas, usage and storage. It talks only to Anaplan and
                        sends nothing anywhere else.
                    </p>
                    <Link href="/anaplan#get" className="mt-4 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                        Get Anaplan Toolkit
                    </Link>
                </section>

                <section className="mt-12">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">More guides</p>
                    <ul className="mt-3 space-y-2">
                        {others.map((g) => (
                            <li key={g.slug}>
                                <Link href={`/anaplan/guides/${g.slug}`} className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">{g.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="/anaplan/guides" className="mt-4 inline-block text-sm font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900">All Anaplan guides →</Link>
                </section>
            </article>
        </ToolkitShell>
    );
};

export default Article;
