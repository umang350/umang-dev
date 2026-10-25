import Link from "next/link";
import React from "react";
import ToolkitShell from "@/components/anaplan/ToolkitShell";

// Layout and text helpers shared by the articles under /anaplan/guides.

export const guides = [
    {
        slug: "improve-anaplan-model-and-usage",
        title: "How to improve an Anaplan model and how your team uses it",
        desc: "A practical routine for builders and CoE leads: find structural problems, retire what nobody uses, keep formulas readable and make model health a monthly habit.",
    },
    {
        slug: "reduce-anaplan-model-size",
        title: "How to reduce the size of an Anaplan model",
        desc: "Where model size comes from, how to find the modules and line items that cost the most, and how to remove them safely.",
    },
];

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

const Article = ({ slug, title, desc, kicker, published, readMinutes, children }: Props) => {
    const path = `/anaplan/guides/${slug}`;
    const others = guides.filter((g) => g.slug !== slug);
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description: desc,
            datePublished: published,
            dateModified: published,
            mainEntityOfPage: `https://umang.dev${path}`,
            author: { "@type": "Person", name: "Umang Chauhan", url: "https://umang.dev" },
        },
    ];
    return (
        <ToolkitShell title={`${title} — Anaplan Toolkit`} ogTitle={title} desc={desc} path={path} jsonLd={jsonLd}>
            <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
                <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
                    <Link href="/anaplan" className="hover:text-gray-800">Anaplan Toolkit</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">Guides</span>
                </nav>
                <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-red-600">{kicker}</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                <p className="mt-3 text-sm text-gray-500">
                    By Umang Chauhan · {new Date(published).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })} · {readMinutes} min read
                </p>
                <p className="mt-6 text-lg leading-relaxed text-gray-700">{desc}</p>

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
                </section>
            </article>
        </ToolkitShell>
    );
};

export default Article;
