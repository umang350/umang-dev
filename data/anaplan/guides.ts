// Metadata for every article under /anaplan/guides. Plain data (no JSX) so
// the landing page, the index and the Article layout can all import it.

export type HeroKind =
    | "layers" | "grid" | "bars" | "hub" | "api" | "shield"
    | "branch" | "doc" | "swap" | "subset" | "check" | "size";

export type Guide = {
    slug: string;
    title: string;
    seoTitle: string;
    keywords: string;
    desc: string;
    category: string;
    hero: HeroKind;
    published: string; // ISO date
    readMinutes: number;
};

export const guides: Guide[] = [
    {
        slug: "improve-anaplan-model-and-usage",
        title: "How to improve an Anaplan model and how your team uses it",
        seoTitle: "Improve an Anaplan Model & How Teams Use It | Anaplan Toolkit",
        keywords: "improve Anaplan model, how to improve Anaplan model, Anaplan model health check, Anaplan best practices, Anaplan Planual, Anaplan model audit, Anaplan unused line items, Anaplan CoE",
        desc: "A practical routine for builders and CoE leads: find structural problems, retire what nobody uses, keep formulas readable and make model health a monthly habit.",
        category: "Model health",
        hero: "check",
        published: "2026-10-25",
        readMinutes: 9,
    },
    {
        slug: "reduce-anaplan-model-size",
        title: "How to reduce the size of an Anaplan model",
        seoTitle: "Reduce Anaplan Model Size: A Practical Guide | Anaplan Toolkit",
        keywords: "reduce Anaplan model size, Anaplan model size, Anaplan workspace storage, Anaplan cell count, Anaplan sparsity, delete Anaplan line items, Anaplan optimization",
        desc: "Where Anaplan model size comes from, how to find the modules, dimensions and line items that cost the most, and how to remove them safely.",
        category: "Model health",
        hero: "size",
        published: "2026-10-25",
        readMinutes: 9,
    },
    {
        slug: "anaplan-disco-model-architecture",
        title: "Anaplan DISCO explained: the model architecture that keeps models fast",
        seoTitle: "Anaplan DISCO Explained: Model Architecture Guide | Anaplan Toolkit",
        keywords: "Anaplan DISCO, DISCO Anaplan explained, Anaplan model architecture, Anaplan module design, Anaplan Data Inputs System Calculations Outputs, Anaplan best practices",
        desc: "DISCO splits a model into Data, Inputs, System, Calculations and Outputs. What each layer holds, how data should flow between them and how to spot a model that has broken the pattern.",
        category: "Architecture",
        hero: "layers",
        published: "2026-11-14",
        readMinutes: 7,
    },
    {
        slug: "anaplan-sparsity-and-dimensionality",
        title: "Anaplan sparsity and dimensionality: why cell count is the real cost",
        seoTitle: "Anaplan Sparsity & Dimensionality: Cell Count Explained | Anaplan Toolkit",
        keywords: "Anaplan sparsity, Anaplan dimensionality, Anaplan cell count, Anaplan model size, Anaplan dense vs sparse, Anaplan performance, Anaplan list dimensions",
        desc: "Every dimension multiplies the cells a line item can hold. See the arithmetic, why sparse modules waste memory and calculation time, and the usual ways to shrink them.",
        category: "Performance",
        hero: "grid",
        published: "2026-11-14",
        readMinutes: 8,
    },
    {
        slug: "anaplan-formula-performance",
        title: "Anaplan formula performance: what slows a model down and how to fix it",
        seoTitle: "Anaplan Formula Performance: Find & Fix Slow Formulas | Anaplan Toolkit",
        keywords: "Anaplan formula performance, Anaplan calculation effort, Anaplan slow model, Anaplan SUM LOOKUP performance, optimize Anaplan formulas, Anaplan model speed, Anaplan blueprint calculation effort",
        desc: "How to find the line items that cost the most to calculate, the formula patterns that usually cause it, and a repeatable way to measure whether a change helped.",
        category: "Performance",
        hero: "bars",
        published: "2026-11-14",
        readMinutes: 8,
    },
    {
        slug: "anaplan-data-hub",
        title: "Anaplan data hub: when to build one and how to design it",
        seoTitle: "Anaplan Data Hub: Design Guide & When You Need One | Anaplan Toolkit",
        keywords: "Anaplan data hub, Anaplan data hub design, Anaplan data hub vs spoke, Anaplan integration architecture, Anaplan imports, Anaplan model architecture",
        desc: "A data hub keeps raw and cleansed data in one model and feeds lean planning models. When it pays off, what belongs inside and the mistakes to avoid.",
        category: "Architecture",
        hero: "hub",
        published: "2026-11-14",
        readMinutes: 7,
    },
    {
        slug: "anaplan-api-action-ids-and-process-ids",
        title: "Anaplan API: how to find action, import, export and process IDs",
        seoTitle: "Anaplan API: Find Action, Import, Export & Process IDs | Anaplan Toolkit",
        keywords: "Anaplan API, Anaplan process ID, Anaplan action ID, Anaplan import ID, Anaplan export ID, Anaplan Integration API v2, run Anaplan process API, Anaplan workspace ID model ID",
        desc: "The five IDs an Anaplan Integration API call needs, where to find each one, and how to run a process from a script with your own token.",
        category: "Integration",
        hero: "api",
        published: "2026-11-14",
        readMinutes: 6,
    },
    {
        slug: "anaplan-planual-best-practices",
        title: "The Anaplan Planual in practice: rules that matter and how to check them",
        seoTitle: "Anaplan Planual Best Practices: A Practical Checklist | Anaplan Toolkit",
        keywords: "Anaplan Planual, Anaplan Planual checklist, Anaplan best practices, Anaplan model review, Anaplan lint, Anaplan model standards, Anaplan formula standards",
        desc: "The Planual is long. Here is how to turn it into a short review checklist for pull requests, handovers and monthly health checks, and what automated checks can and cannot tell you.",
        category: "Standards",
        hero: "shield",
        published: "2026-11-14",
        readMinutes: 7,
    },
    {
        slug: "anaplan-alm-revision-tags",
        title: "Anaplan ALM and revision tags: a safe path from development to production",
        seoTitle: "Anaplan ALM & Revision Tags: Dev to Production Guide | Anaplan Toolkit",
        keywords: "Anaplan ALM, Anaplan revision tags, Anaplan application lifecycle management, Anaplan dev test prod, Anaplan sync, Anaplan release process, Anaplan deployment",
        desc: "How Anaplan's application lifecycle management moves structural changes between development, test and production models, and the habits that keep releases boring.",
        category: "Release management",
        hero: "branch",
        published: "2026-11-14",
        readMinutes: 7,
    },
    {
        slug: "anaplan-model-documentation",
        title: "Anaplan model documentation: what to write and how to keep it current",
        seoTitle: "Anaplan Model Documentation: Template & Automation | Anaplan Toolkit",
        keywords: "Anaplan model documentation, Anaplan documentation template, Anaplan model handover, document Anaplan model, Anaplan blueprint documentation, Anaplan model inventory",
        desc: "What a useful Anaplan model document contains, why hand-written ones go stale, and how to generate the factual part from the model itself.",
        category: "Governance",
        hero: "doc",
        published: "2026-11-14",
        readMinutes: 6,
    },
    {
        slug: "excel-to-anaplan-migration",
        title: "From Excel to Anaplan: how to rethink a spreadsheet model, not copy it",
        seoTitle: "Excel to Anaplan Migration: Rethink, Don't Copy | Anaplan Toolkit",
        keywords: "Excel to Anaplan, Excel vs Anaplan, migrate Excel to Anaplan, Anaplan for finance, Anaplan multidimensional, Anaplan line item formula, Excel planning model to Anaplan",
        desc: "Excel formulas live in cells, Anaplan formulas live in line items. What changes when you move a planning model, a worked example and the traps of a lift-and-shift.",
        category: "Getting started",
        hero: "swap",
        published: "2026-11-14",
        readMinutes: 8,
    },
    {
        slug: "anaplan-lists-subsets-and-liss",
        title: "Anaplan lists, subsets and line item subsets: shrink what you calculate",
        seoTitle: "Anaplan Lists, Subsets & LISS Explained | Anaplan Toolkit",
        keywords: "Anaplan subsets, Anaplan line item subsets, Anaplan LISS, Anaplan lists, Anaplan numbered lists, Anaplan list properties, Anaplan dimension design",
        desc: "Lists define what a module can hold. How subsets and line item subsets (LISS) cut the cells you carry, with a worked example and the rules for choosing between them.",
        category: "Performance",
        hero: "subset",
        published: "2026-11-14",
        readMinutes: 7,
    },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
