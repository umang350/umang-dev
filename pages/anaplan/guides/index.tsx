import Link from "next/link";
import { useRouter } from "next/router";
import ToolkitShell from "@/components/anaplan/ToolkitShell";
import { HeroArt } from "@/components/anaplan/Viz";
import { guides } from "@/data/anaplan/guides";
import { guidesJa } from "@/data/anaplan/guides.ja";

const title = "Anaplan Guides: Model Design, Performance, API and Best Practices | Anaplan Toolkit";
const desc =
    "Practical Anaplan guides with diagrams and worked examples: DISCO architecture, sparsity and cell count, formula performance, data hubs, API IDs, the Planual, ALM and revision tags, model documentation, Excel migration and subsets.";

const titleJa = "Anaplanガイド：モデル設計、パフォーマンス、API、ベストプラクティス | Anaplan Toolkit";
const descJa =
    "図と実例で学ぶAnaplanの実践ガイド集。DISCOアーキテクチャ、スパース性とセル数、数式のパフォーマンス、データハブ、APIのID、Planual、ALMとリビジョンタグ、モデルのドキュメント化、Excelからの移行、サブセットを扱います。";

const jsonLdFor = (ja: boolean) => [
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Anaplan guides",
        description: ja ? descJa : desc,
        url: ja ? "https://umang.dev/ja/anaplan/guides" : "https://umang.dev/anaplan/guides",
        author: { "@type": "Person", name: "Umang Chauhan", url: "https://umang.dev" },
        mainEntity: {
            "@type": "ItemList",
            itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: `https://umang.dev/anaplan/guides/${g.slug}`, name: ja ? guidesJa[g.slug]?.title ?? g.title : g.title })),
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Anaplan Toolkit", item: "https://umang.dev/anaplan" },
            { "@type": "ListItem", position: 2, name: "Guides", item: "https://umang.dev/anaplan/guides" },
        ],
    },
];

const GuidesIndex = () => {
    const ja = useRouter().locale === "ja";
    return (
    <ToolkitShell
        title={ja ? titleJa : title}
        ogTitle={ja ? "図と実例で学ぶAnaplanガイド" : "Anaplan guides with diagrams and worked examples"}
        desc={ja ? descJa : desc}
        path="/anaplan/guides"
        ogImage="https://umang.dev/anaplan/summary.png"
        keywords="Anaplan guides, Anaplan best practices, Anaplan tutorials, Anaplan model design, Anaplan performance, Anaplan API, Anaplan Planual, Anaplan ALM, Anaplan DISCO, Excel to Anaplan"
        jsonLd={jsonLdFor(ja)}
    >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
                <Link href="/anaplan" className="hover:text-gray-800">Anaplan Toolkit</Link>
                <span className="mx-2">/</span>
                <span>{ja ? "ガイド" : "Guides"}</span>
            </nav>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{ja ? "Anaplanガイド" : "Anaplan guides"}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                {ja
                    ? "モデル設計、パフォーマンス、連携、リリース運用を、図と実例で解説します。モデルビルダーとCoEリード向けです。"
                    : "Model design, performance, integration and release practice, with diagrams and worked examples. Written for builders and CoE leads."}
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((g) => (
                    <Link key={g.slug} href={`/anaplan/guides/${g.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
                        <HeroArt kind={g.hero} label="" className="h-36" />
                        <div className="flex flex-1 flex-col p-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-red-600">{ja ? guidesJa[g.slug]?.category ?? g.category : g.category}</p>
                            <h2 className="mt-2 font-semibold leading-snug text-gray-900">{ja ? guidesJa[g.slug]?.title ?? g.title : g.title}</h2>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{ja ? guidesJa[g.slug]?.desc ?? g.desc : g.desc}</p>
                            <p className="mt-4 text-sm font-medium text-gray-500">{ja ? `約${g.readMinutes}分` : `${g.readMinutes} min read`} · <span className="text-red-600 group-hover:underline">{ja ? "読む →" : "Read →"}</span></p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </ToolkitShell>
    );
};

export default GuidesIndex;
