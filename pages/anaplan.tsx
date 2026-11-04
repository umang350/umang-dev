import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import ToolkitShell from "@/components/anaplan/ToolkitShell";
import { guides } from "@/components/anaplan/Article";

// Standalone landing page for the Anaplan Toolkit extension. Deliberately
// does not use the site's Page/Navbar/Footer so it can stand on its own.

const pageTitle = "Anaplan Toolkit — Free Anaplan Helper Tool for Model Builders (Chrome & Firefox)";
const pageDesc =
    "Free Chrome and Firefox extension for Anaplan model builders. Find action, import, export and process IDs for the Anaplan API, trace module lineage and formula impact, search every formula, lint against the Planual, document the model, bulk delete modules and line items, monitor model locks and review workspace storage. Reads only your Anaplan session; no data leaves your browser.";
const pageKeywords =
    "Anaplan tool, Anaplan Chrome extension, Anaplan Firefox add-on, Anaplan API, Anaplan Integration API action IDs, Anaplan process ID, Anaplan import export ID, Anaplan model documentation, Anaplan model audit, Anaplan formula editor, Anaplan Planual, Anaplan lineage, Anaplan dependency, Anaplan unused line items, Anaplan bulk delete, Anaplan lock monitor, Anaplan model busy, Anaplan workspace storage, Anaplan revision tags, Anaplan model builder tools, Anaplan Blueprint, Anaplan impact analysis, Anaplan formula search, Anaplan lint, Anaplan Planual checker, Anaplan model documentation generator";

const chromeStoreUrl = "https://chromewebstore.google.com/detail/anaplan-toolkit/kbbgidpmmiechmccmmjpjkidihojdgnj";
const firefoxStoreUrl = "https://addons.mozilla.org/en-US/firefox/addon/anaplan-toolkit/";

const version = "2.12";
const sponsorUrl = "https://github.com/sponsors/umang350";

const whatsNew = [
    { title: "Impact analysis", body: "For every line item, which formulas use it and which it uses, directly and all the way down, with the modules and App pages that reach. A Modules tab shows which modules feed which." },
    { title: "Planual lint", body: "Checks the model against Anaplan's Planual. Every finding shows the rule's own number, linked to its page, plus a Housekeeping tab for unused line items and lists." },
    { title: "Planual where you build", body: "The part of a formula that breaks a rule is underlined in the editor with its rule number, and Blueprint view shows a badge after each line item. Hide a rule, or switch either off in Settings." },
    { title: "Search every formula", body: "Find a line item by words, an \"exact phrase\" or a /regular expression/ across every formula in the model." },
    { title: "Model documentation", body: "From Summary, write the model's lists, modules, line items and formulas as a Markdown file, or copy a compact version to paste into an AI assistant. Nothing is sent anywhere." },
    { title: "Used by, Depends on", body: "Hover a line item in the formula editor to see what uses it and what it depends on; hover a module for the modules it feeds and is fed by." },
];

const reportGroups = [
    {
        group: "Summary",
        items: [
            { name: "Model Summary", desc: "Model name, IDs, size, structure counts and which reports are loaded. Get all data, download every report as CSVs in one .zip, or write the model\u2019s documentation as Markdown." },
        ],
    },
    {
        group: "Actions",
        items: [
            { name: "Actions & File IDs", desc: "Internal IDs for Processes, Imports, Exports and Files — search by name or ID and copy one with a click." },
            { name: "Action Usages", desc: "Where every Action is wired up across Apps, Pages and widgets." },
            { name: "Process Steps", desc: "The actions each process runs, in order, with each import's source and target — plus a Copy API call button." },
        ],
    },
    {
        group: "Pages",
        items: [
            { name: "Linked Pages", desc: "Which Apps and Pages consume each module, so you can trace lineage from backend to frontend." },
            { name: "Filters & Conditional Formatting", desc: "Line Items used as page filters or formatting rules, shown beside their conditions and colours — rules on hidden line items are tagged Hidden on grid." },
            { name: "Line Items on Pages", desc: "Every line item shown on the App pages you pick, and where: rows, columns, page selector, filter, formatting, sort or hidden. By page or by line item." },
        ],
    },
    {
        group: "Saved Views",
        items: [
            { name: "All Saved Views", desc: "Every Saved View in the model, grouped by module." },
            { name: "Saved Views in Screens", desc: "Which Saved View each App Page widget reads from." },
            { name: "Saved Views in Actions", desc: "Imports whose source is a Saved View." },
        ],
    },
    {
        group: "Structure",
        items: [
            { name: "Modules", desc: "Every module with its dimensions, time scale, time range, line item and saved view counts, and the App pages that use it." },
            { name: "Line Items", desc: "Every line item with its format, applies-to, time scale and formula. Search matches formulas too." },
            { name: "Lists & Properties", desc: "Every list with its parent and item count, and every property with its format and formula." },
            { name: "Delete Line Items & Delete Modules", desc: "Upload a CSV (the Line Items or Modules export works as is), review what Anaplan will accept, then delete in an order that avoids refusals. The only views that change your model." },
        ],
    },
    {
        group: "Analysis",
        items: [
            { name: "Impact", desc: "Which formulas use each line item and which it uses, directly and downstream, with the modules and App pages reached." },
            { name: "Lint", desc: "Findings against Anaplan's Planual, each with its rule number, plus housekeeping checks for unused line items and lists." },
            { name: "Formulas", desc: "Search every formula by words, an exact phrase or a regular expression." },
        ],
    },
    {
        group: "Revisions & Lock",
        items: [
            { name: "Revision Tags", desc: "Who created each revision tag, when and where, and every model it was applied to." },
            { name: "Lock Monitor", desc: "Checks at an interval you choose whether the model is available, busy, locked or offline, with a timeline, reply times and every check." },
        ],
    },
    {
        group: "Workspace",
        items: [
            { name: "Workspace Models & Storage", desc: "Active, archived and deleted models with sizes, under an in-use vs allowance meter." },
            { name: "All Workspaces", desc: "Storage for every workspace you can access, and every active model across them." },
        ],
    },
];

// Roadmap lanes: what the Toolkit already covers, versus what Anaplan's own
// interfaces make possible. A direction, not a commitment.
type RoadmapStatus = "shipped" | "next" | "exploring" | "not";

const roadmapStatus: Record<RoadmapStatus, { label: string; badge: string }> = {
    shipped: { label: "Shipped", badge: "bg-green-500/15 text-green-300" },
        next: { label: "Planned", badge: "bg-amber-500/15 text-amber-300" },
    exploring: { label: "Exploring", badge: "bg-white/10 text-gray-300" },
    not: { label: "Not planned", badge: "bg-red-500/15 text-red-300" },
};

const roadmap: { status: RoadmapStatus; title: string; body: string }[] = [
    { status: "shipped", title: "Read the model's structure", body: "Modules, line items, lists, properties, dimensions, formulas and where each is used — as searchable, exportable reports." },
    { status: "shipped", title: "Delete structure, safely", body: "Delete Line Items and Delete Modules: checked against the live model first, ordered from the formulas, with a run log." },
    { status: "shipped", title: "Model status and workspaces", body: "Lock Monitor, workspace storage and model lists — read-only." },
    { status: "shipped", title: "Impact, Planual lint and documentation", body: "Formula impact in both directions, Planual findings in reports, the formula editor and Blueprint grid, and the model written out as Markdown." },
    { status: "shipped", title: "Revisions and process steps", body: "Revision tags and where they were applied, plus the ordered actions behind every process." },
    { status: "next", title: "Bulk create from CSV", body: "The counterpart to bulk delete: upload modules, line items or lists and review them against the model before anything is created." },
    { status: "next", title: "Bulk edit formulas and formats", body: "Change formula, format, style or summary on many line items at once, with a before / after diff and the same type-the-count confirmation." },
    { status: "next", title: "Bulk rename with references", body: "Rename modules and line items from a CSV, listing every formula, page and view that mentions the old name." },
    { status: "exploring", title: "Import, export and process definitions", body: "Read how imports, exports and processes are defined, not only where they are used. Editing them is a later question." },
    { status: "exploring", title: "Sync and revision discovery", body: "Show which models sync from or to this one and the revision pairs between them. Discovery only; it would not run a sync." },
    { status: "exploring", title: "Move and reorder", body: "Reorder line items, lists and modules from a CSV. Anaplan applies these changes strictly in order, so the check step matters most here." },
    { status: "not", title: "Creating a model from scratch", body: "Anaplan offers copy and delete, not create. The Toolkit will not try to work around that." },
    { status: "not", title: "Page, board and card authoring", body: "The biggest gap in tooling around Anaplan today. Reports on pages stay; building them is out of scope." },
    { status: "not", title: "Versions, calendar and subsets", body: "These sit outside Anaplan's own public API, so they will not be built." },
];

const faqs = [
    { q: "What is the best free Anaplan helper tool for model builders?", a: "Anaplan Toolkit is a free Chrome and Firefox extension that adds a side panel to the model you have open. It finds action, import, export and process IDs for the Anaplan API, traces where line items and modules are used, searches every formula, lints against the Planual, documents the whole model, bulk deletes modules and line items, and monitors model locks. It is independent of Anaplan, Inc. and runs entirely in your browser." },
    { q: "How do I find an Anaplan action, import, export or process ID for the API?", a: "Open the model, open the Toolkit side panel and choose Actions & File IDs. Every process, import, export and file is listed with its internal ID, searchable by name, with a one-click copy. Process Steps adds a Copy API call button that builds an Anaplan Integration API v2 curl command for you to run with your own token." },
    { q: "Is there an Anaplan tool to document or audit a whole model?", a: "Yes. Get all data loads every report for the open model and Download all as CSV gives you modules, line items, lists, formulas, saved views, page usage and more in one .zip. Summary can also write the model's documentation as a Markdown file, or copy a compact version to paste into an AI assistant; the extension sends nothing anywhere." },
    { q: "How can I see where a line item or module is used in Anaplan?", a: "Impact lists which formulas use each line item and which it uses, directly and downstream. Linked Pages shows which Apps and Pages use each module, Line Items on Pages shows where each line item appears on a page, and the formula editor shows Used by and Depends on when you hover a reference. Formulas searches every formula by word, phrase or regular expression." },
    { q: "Can I bulk delete Anaplan line items or modules?", a: "Yes. Delete Line Items and Delete Modules read a CSV, check every row against the live model, order the deletes so Anaplan accepts them, and ask you to type the count before anything changes. They are the only views that write to your model." },
    { q: "Does Anaplan Toolkit check the Planual?", a: "It underlines per-line-item Planual rules in the formula editor with the rule number, adds badges in the Blueprint grid, and the Lint report lists findings across the model with each rule linked to its Planual page. Checks target the Classic engine and approximate the rules, so treat findings as prompts to look, not verdicts." },
    { q: "How do I know whether an Anaplan model is busy or locked?", a: "Lock Monitor checks the model at an interval you choose, from every second to every minute for up to 12 hours, and records whether it is available, updating, busy, locked or offline, with what is running when busy." },
    { q: "Is it safe? Does it send my Anaplan data anywhere?", a: "The extension only talks to Anaplan, over the session you are already signed in with. It has no analytics, no telemetry and never asks for a password or token. Results stay in your browser's session storage." },
    { q: "Which browsers does Anaplan Toolkit support, and is it free?", a: "It is free for Chrome, Edge and other Chromium browsers from the Chrome Web Store, and for Firefox 140 and later from Firefox Add-ons. It is an independent tool and not affiliated with Anaplan, Inc." },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Anaplan Toolkit",
        alternateName: "Anaplan Toolkit browser extension",
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "Browser extension",
        operatingSystem: "Chrome, Edge, Firefox",
        softwareVersion: version,
        url: "https://umang.dev/anaplan",
        image: "https://umang.dev/anaplan/summary.png",
        description: pageDesc,
        downloadUrl: [chromeStoreUrl, firefoxStoreUrl],
        installUrl: chromeStoreUrl,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        author: { "@type": "Person", name: "Umang Chauhan", url: "https://umang.dev" },
        featureList: reportGroups.flatMap((g) => g.items.map((i) => i.name)),
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
];

const steps = [
    { title: "Open a model", body: "Sign in to Anaplan as usual and open any model. The toolkit uses your existing session — no extra login." },
    { title: "Open the side panel", body: "Click the toolbar icon. A panel opens next to the model, starting on the Model Summary." },
    { title: "Get the data", body: "Pick a report and hit Get data — or Get all data from the Summary. Results are cached per model, searchable, sortable and export to CSV in one click." },
];

const privacy = [
    { title: "Talks only to Anaplan", body: "Every network call goes to Anaplan, over the session you're already signed into. No other server is ever contacted, and no password or token is ever asked for." },
    { title: "No analytics or telemetry", body: "No tracking, crash reporting or advertising SDKs. Firefox listing declares data collection: none." },
    { title: "Reports only read", body: "Every report reads model metadata and changes nothing. Only Delete Line Items and Delete Modules write, and only after you check a CSV and type the number to delete." },
    { title: "Session-only cache", body: "Results live in browser session storage, keyed per model, and expire after 6 hours or when the browser closes." },
];

const shortcuts = [
    { keys: "⌘⌥I", where: "Actions tab", opens: "Actions & File IDs" },
    { keys: "⌘⌥O", where: "Actions tab", opens: "Action Usages" },
    { keys: "⌘⌥I", where: "Modules tab", opens: "Linked Pages" },
    { keys: "⌘⌥O", where: "Modules tab", opens: "Filters & Conditional Formatting" },
];

const shots = [
    { src: "/anaplan/actions-ids.png", alt: "Actions & File IDs report", caption: "Actions & File IDs" },
    { src: "/anaplan/pages-filters.png", alt: "Page Filters & Conditional Formatting report", caption: "Filters & Conditional Formatting" },
    { src: "/anaplan/saved-views-list.png", alt: "All Saved Views report", caption: "All Saved Views" },
];


type Store = "chrome" | "firefox";

const stores: Record<Store, { url: string; logo: string; eyebrow: string; name: string; label: string }> = {
    chrome: {
        url: chromeStoreUrl,
        logo: "/anaplan/badges/chrome.svg",
        eyebrow: "Available in the",
        name: "Chrome Web Store",
        label: "Add Anaplan Toolkit to Chrome from the Chrome Web Store",
    },
    firefox: {
        url: firefoxStoreUrl,
        logo: "/anaplan/badges/firefox.svg",
        eyebrow: "Get the add-on for",
        name: "Firefox",
        label: "Add Anaplan Toolkit to Firefox from Firefox Add-ons",
    },
};

const marquee = [
    "Action IDs", "Process steps", "Impact analysis", "Planual lint", "Formula search", "Model docs as Markdown", "Lock Monitor",
    "Saved views", "Linked pages", "Bulk delete", "Revision tags", "Workspace storage", "CSV export",
];

const Dot = () => <span className="h-1.5 w-1.5 flex-none rounded-full bg-red-500" />;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">{children}</p>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">{children}</h2>
);

const card = "rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm";

const StoreButton = ({ store, tone = "light" }: { store: Store; tone?: "light" | "dark" }) => {
    const s = stores[store];
    const toneClass =
        tone === "light"
            ? "bg-white text-gray-900 hover:bg-gray-100 ring-white/40"
            : "bg-gray-900 text-white hover:bg-gray-800 ring-white/10";
    return (
        <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`group inline-flex h-14 min-w-[13rem] items-center gap-3 rounded-2xl px-4 shadow-lg ring-1 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${toneClass}`}
        >
            <Image src={s.logo} alt="" width={32} height={32} unoptimized className="h-8 w-8 flex-none" />
            <span className="flex flex-col text-left leading-tight">
                <span className={`text-[11px] font-medium ${tone === "light" ? "text-gray-500" : "text-gray-300"}`}>{s.eyebrow}</span>
                <span className="text-base font-semibold tracking-tight">{s.name}</span>
            </span>
        </a>
    );
};

const AnaplanToolkit = () => {
    const [tab, setTab] = useState(0);

    const group = reportGroups[tab];

    return (
        <ToolkitShell
            title={pageTitle}
            desc={pageDesc}
            path="/anaplan"
            ogImage="https://umang.dev/anaplan/summary.png"
            ogTitle="Anaplan Toolkit — free Anaplan model analyzer & API helper"
            onLanding
            dark
            keywords={pageKeywords}
            jsonLd={jsonLd}
        >
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute left-[-10rem] top-[-10rem] h-[32rem] w-[44rem] rounded-full bg-red-600/25 blur-[140px]" />
                    <div className="absolute right-[-8rem] top-24 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-[120px]" />
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "56px 56px",
                            maskImage: "radial-gradient(ellipse 80% 70% at 50% 20%, #000, transparent)",
                            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 20%, #000, transparent)",
                        }}
                    />
                </div>

                <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-gray-200">
                            <Dot />
                            Free Chrome &amp; Firefox extension for Anaplan · v{version}
                        </span>
                        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
                            The side panel Anaplan{" "}
                            <span className="bg-gradient-to-r from-red-400 via-red-500 to-orange-400 bg-clip-text text-transparent">is missing.</span>
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
                            Stop digging through blueprints, tabs and exports to answer simple questions about your model. Open the panel beside any
                            model and get the answer in one click.
                        </p>

                        <ul className="mt-6 grid gap-x-6 gap-y-2.5 text-[15px] text-gray-200 sm:grid-cols-2">
                            {[
                                ["Find IDs", "action, import, export and process IDs for the API"],
                                ["Trace impact", "what uses a line item, and what it depends on"],
                                ["Lint & document", "Planual checks and the model as Markdown"],
                                ["Watch locks", "know when the model is busy, locked or free"],
                            ].map(([t, b]) => (
                                <li key={t} className="flex gap-2.5">
                                    <span className="mt-2"><Dot /></span>
                                    <span><b className="font-semibold text-white">{t}</b> <span className="text-gray-400">· {b}</span></span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <StoreButton store="chrome" />
                            <StoreButton store="firefox" tone="dark" />
                        </div>
                        <p className="mt-4 text-sm text-gray-400">
                            Free · Reports are read-only · No data leaves your browser · Independent of Anaplan, Inc.
                        </p>
                    </div>

                    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                        <div className="pointer-events-none absolute -right-6 -top-6 hidden w-64 rotate-3 overflow-hidden rounded-2xl border border-white/10 opacity-40 sm:block" aria-hidden="true">
                            <Image src="/anaplan/summary-panel.png" alt="" width={1408} height={1948} priority />
                        </div>
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111118]/95 shadow-[0_40px_120px_-20px_rgba(244,63,94,0.35)] backdrop-blur">
                            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                                <span className="ml-3 text-[11px] text-gray-400">Anaplan Toolkit · one click each</span>
                            </div>
                            <div className="space-y-3 p-4 sm:p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">Questions Anaplan can&apos;t answer on one screen</p>
                                {[
                                    { q: "What breaks if I change Gross Revenue?", a: "14 formulas · 6 modules · 3 App pages", src: "Impact" },
                                    { q: "What's the ID of my “Load Actuals” import?", a: "112000000087", src: "Actions & File IDs", copy: true },
                                    { q: "Can I start my import, or is the model busy?", a: "Busy for 41s · a process is running", src: "Lock Monitor", warn: true },
                                    { q: "Which App pages read this saved view?", a: "Sales Board · P&L Overview", src: "Saved Views in Screens" },
                                ].map((r) => (
                                    <div key={r.q} className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="text-sm font-medium text-white">{r.q}</div>
                                            <span className="flex-none rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300">{r.src}</span>
                                        </div>
                                        <div className={`mt-2 flex items-center gap-2 font-mono text-[13px] ${r.warn ? "text-amber-300" : "text-green-300"}`}>
                                            <span aria-hidden="true">→</span>
                                            <span>{r.a}</span>
                                            {r.copy && <span className="rounded bg-red-500/20 px-1.5 py-0.5 font-sans text-[10px] text-red-300">copy</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <section className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-5" aria-hidden="true">
                <div className="tk-marquee flex w-max gap-10 whitespace-nowrap text-sm font-medium text-gray-400" style={{ animation: "tk-marquee 40s linear infinite" }}>
                    {[...marquee, ...marquee].map((m, i) => (
                        <span key={i} className="flex items-center gap-10">{m}<Dot /></span>
                    ))}
                </div>
            </section>

            {/* Stats */}
            <section className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-16 text-center sm:px-6 md:grid-cols-4">
                {[
                    ["22", "reports on model structure, usage and status, one panel"],
                    ["1 click", "to export every report as CSVs in one .zip"],
                    ["0", "passwords, tokens or third-party servers involved"],
                    ["$0", "free to use, no sign-up"],
                ].map(([n, l]) => (
                    <div key={l}>
                        <div className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">{n}</div>
                        <div className="mx-auto mt-2 max-w-[13rem] text-sm leading-snug text-gray-400">{l}</div>
                    </div>
                ))}
            </section>

            {/* Bento: what's new */}
            <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 sm:px-6">
                <div className="max-w-2xl">
                    <Eyebrow>New in {version}</Eyebrow>
                    <Heading>Built for the questions you actually ask</Heading>
                </div>
                <div className="mt-12 grid gap-4 lg:grid-cols-6">
                    {/* Impact */}
                    <div className={`${card} overflow-hidden p-7 lg:col-span-4`}>
                        <h3 className="text-xl font-semibold text-white">{whatsNew[0].title}</h3>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-300">{whatsNew[0].body}</p>
                        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs" aria-hidden="true">
                            {["Units", "Gross Revenue", "Net Revenue", "P&L Summary", "Board Page"].map((n, i, a) => (
                                <span key={n} className="flex items-center gap-2">
                                    <span className={`rounded-lg px-3 py-1.5 ${i === 2 ? "bg-red-500 text-white" : "border border-white/15 bg-white/5 text-gray-200"}`}>{n}</span>
                                    {i < a.length - 1 && <span className="text-red-400">→</span>}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Planual */}
                    <div className={`${card} p-7 lg:col-span-2`}>
                        <h3 className="text-xl font-semibold text-white">{whatsNew[1].title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-300">{whatsNew[1].body}</p>
                    </div>
                    {/* Formula search */}
                    <div className={`${card} p-7 lg:col-span-2`}>
                        <h3 className="text-xl font-semibold text-white">{whatsNew[3].title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-300">{whatsNew[3].body}</p>
                        <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs text-gray-300" aria-hidden="true">
                            <span className="text-red-400">/</span>LOOKUP:.*<span className="text-red-400">/</span> <span className="text-gray-500">· 38 matches</span>
                        </div>
                    </div>
                    {/* Where you build */}
                    <div className={`${card} p-7 lg:col-span-2`}>
                        <h3 className="text-xl font-semibold text-white">{whatsNew[2].title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-300">{whatsNew[2].body}</p>
                        <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs text-gray-300" aria-hidden="true">
                            SUM(Units) <span className="underline decoration-red-500 decoration-wavy underline-offset-4">/ 0</span> <span className="ml-1 rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] text-red-300">Rule 2.07</span>
                        </div>
                    </div>
                    {/* Docs */}
                    <div className={`${card} p-7 lg:col-span-2`}>
                        <h3 className="text-xl font-semibold text-white">{whatsNew[4].title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-300">{whatsNew[4].body}</p>
                        <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs text-gray-400" aria-hidden="true">
                            <div className="text-gray-200"># Forecast Model</div>
                            <div>## Modules (42)</div>
                            <div>- Sales &amp; Revenue</div>
                        </div>
                    </div>
                    {/* Used by */}
                    <div className={`${card} p-7 lg:col-span-6`}>
                        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
                            <div>
                                <h3 className="text-xl font-semibold text-white">{whatsNew[5].title}</h3>
                                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">{whatsNew[5].body}</p>
                            </div>
                            <a href="#reports" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200">
                                Browse all 22 reports →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Report explorer */}
            <section id="reports" className="scroll-mt-20 border-t border-white/10 bg-white/[0.02] py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-2xl">
                        <Eyebrow>Reports</Eyebrow>
                        <Heading>Answers Anaplan doesn&apos;t put on one screen</Heading>
                        <p className="mt-4 text-gray-300">
                            Each report is gathered on demand from the model in your active tab, cached for that model, searchable and exportable to CSV.
                        </p>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-2" role="tablist">
                        {reportGroups.map((g, i) => (
                            <button
                                key={g.group}
                                role="tab"
                                aria-selected={tab === i}
                                onClick={() => setTab(i)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${tab === i ? "bg-red-500 text-white" : "border border-white/15 bg-white/5 text-gray-300 hover:bg-white/10"}`}
                            >
                                {g.group}
                            </button>
                        ))}
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3" role="tabpanel">
                        {group.items.map((r) => (
                            <div key={r.name} className={`${card} p-6`}>
                                <h3 className="font-semibold text-white">{r.name}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-300">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                    <ul className="mt-10 grid gap-x-8 gap-y-3 text-sm text-gray-300 sm:grid-cols-2 lg:grid-cols-3">
                        {["Fuzzy search across every column", "Sort by any column header", "One-click CSV export, in your sort order", "Cached per model — switch freely", "Live progress while large models load", "Fast on tables with thousands of rows"].map((t) => (
                            <li key={t} className="flex items-center gap-2.5"><Dot />{t}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Gallery */}
            <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
                <div className="max-w-2xl">
                    <Eyebrow>In the panel</Eyebrow>
                    <Heading>Lives right beside your model</Heading>
                    <p className="mt-4 text-gray-300">
                        The panel follows the model in front of you. Switch tabs or models and it switches with you, keeping each model&apos;s results under its own key.
                    </p>
                </div>
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {shots.map((s) => (
                        <figure key={s.src} className="group">
                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-gray-800 transition duration-300 group-hover:-translate-y-1 group-hover:border-red-500/40">
                                <Image src={s.src} alt={s.alt} width={1280} height={800} />
                            </div>
                            <figcaption className="mt-3 text-sm text-gray-400">{s.caption}</figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            {/* Formula editor + Lock monitor */}
            <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className={`${card} p-8 sm:p-10`}>
                        <Eyebrow>Formula editor</Eyebrow>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Navigate formulas like code</h2>
                        <p className="mt-3 text-sm leading-relaxed text-gray-300">
                            Work through a dependency chain without hunting through tabs. Everything reads Anaplan&apos;s in-page model data; no server is contacted and nothing is changed.
                        </p>
                        <ul className="mt-6 space-y-4">
                            {[
                                ["Jump to a reference", "Cmd/Ctrl+click opens a module, line item, list or subset; Shift opens a new tab."],
                                ["Readable hover cards", "Format, applies to, time scale and a formula with THEN/ELSE on their own lines, plus used by and depends on."],
                                ["Function help", "Hover ITEM(, [LOOKUP: …], IF and more for the category, description and a help link."],
                                ["Spot slips early", "Markers for unbalanced brackets, unterminated quotes and a Module.'x' that doesn't exist."],
                            ].map(([t, b]) => (
                                <li key={t} className="flex gap-3">
                                    <span className="mt-1.5"><Dot /></span>
                                    <div>
                                        <div className="font-semibold text-white">{t}</div>
                                        <p className="mt-0.5 text-sm leading-relaxed text-gray-400">{b}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`${card} flex flex-col p-8 sm:p-10`}>
                        <Eyebrow>Lock Monitor</Eyebrow>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Know when the model is free</h2>
                        <p className="mt-3 text-sm leading-relaxed text-gray-300">
                            Before a big import or a deployment, find out whether anything else is running. It asks Anaplan for the model&apos;s status at an interval you choose, from every second to every minute for up to 12 hours, and records every answer.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2 text-xs">
                            {[["Available", "bg-green-500/15 text-green-300"], ["Updating", "bg-blue-500/15 text-blue-300"], ["Busy", "bg-amber-500/15 text-amber-300"], ["Locked", "bg-red-500/15 text-red-300"], ["Offline", "bg-gray-500/20 text-gray-300"]].map(([t, c]) => (
                                <span key={t} className={`rounded-full px-3 py-1 font-medium ${c}`}>{t}</span>
                            ))}
                        </div>
                        <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl border border-white/10" style={{ minHeight: 220, maxHeight: 340 }}>
                            <Image
                                src="/anaplan/lock-monitor.png"
                                alt="Lock Monitor checks: the model available for 100% of 12 checks a second apart, median reply 208 ms, with each check listed"
                                width={1404}
                                height={1936}
                                className="w-full"
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#101016] to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how" className="scroll-mt-20 border-t border-white/10 bg-white/[0.02] py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <Eyebrow>How it works</Eyebrow>
                    <Heading>Three steps, no setup</Heading>
                    <ol className="mt-12 grid gap-4 md:grid-cols-3">
                        {steps.map((s, i) => (
                            <li key={s.title} className={`${card} relative p-7`}>
                                <div className="text-6xl font-extrabold leading-none text-white/10">0{i + 1}</div>
                                <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-300">{s.body}</p>
                            </li>
                        ))}
                    </ol>
                    <div className={`${card} mt-4 overflow-hidden`}>
                        <div className="border-b border-white/10 px-6 py-4">
                            <h3 className="font-semibold text-white">Keyboard shortcuts</h3>
                            <p className="mt-1 text-sm text-gray-400">
                                Inside the Anaplan modelling UI. <kbd className="font-mono">⌘⌥</kbd> on macOS, <kbd className="font-mono">Ctrl+Alt</kbd> on Windows and Linux.
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Shortcut</th>
                                        <th className="px-6 py-3 font-medium">In Anaplan&apos;s</th>
                                        <th className="px-6 py-3 font-medium">Opens</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {shortcuts.map((k) => (
                                        <tr key={k.where + k.keys}>
                                            <td className="px-6 py-3"><kbd className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-xs text-white">{k.keys}</kbd></td>
                                            <td className="px-6 py-3 text-gray-400">{k.where}</td>
                                            <td className="px-6 py-3 font-medium text-gray-100">{k.opens}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy */}
            <section id="privacy" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
                <div className="max-w-2xl">
                    <Eyebrow>Privacy</Eyebrow>
                    <Heading>Your model data stays yours</Heading>
                </div>
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {privacy.map((p) => (
                        <div key={p.title} className={`${card} p-6`}>
                            <svg viewBox="0 0 20 20" className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                                <path d="M10 2l6 2.5v5c0 4-2.6 6.7-6 8-3.4-1.3-6-4-6-8v-5L10 2z" strokeLinejoin="round" />
                                <path d="M7.2 10l2 2 3.6-3.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3 className="mt-4 font-semibold text-white">{p.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-300">{p.body}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-sm text-gray-400">
                    Permissions: access to <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-gray-200">https://*.anaplan.com/*</code>, the side panel, and local storage, plus notifications only if you turn on the Lock Monitor&apos;s <em>Notify me</em>. Read the full{" "}
                    <Link href="/anaplan/toolkit/privacy" className="font-medium text-red-400 underline underline-offset-2 hover:text-red-300">privacy policy</Link>.
                </p>
            </section>

            {/* Roadmap */}
            <section id="roadmap" className="scroll-mt-20 border-t border-white/10 bg-white/[0.02] py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-2xl">
                        <Eyebrow>Roadmap</Eyebrow>
                        <Heading>Where the Toolkit is heading</Heading>
                        <p className="mt-4 text-gray-300">A direction, not a promise: order and scope can change.</p>
                    </div>
                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {roadmap.map((r) => (
                            <div key={r.title} className={`${card} p-5 ${r.status === "not" ? "opacity-70" : ""}`}>
                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roadmapStatus[r.status].badge}`}>
                                    {roadmapStatus[r.status].label}
                                </span>
                                <h3 className="mt-3 font-semibold text-white">{r.title}</h3>
                                <p className="mt-1 text-sm leading-relaxed text-gray-400">{r.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-sm text-gray-400">
                        Want something moved up, or something missing?{" "}
                        <a href="mailto:contact@umang.dev?subject=Anaplan%20Toolkit%20roadmap" className="font-medium text-red-400 underline underline-offset-2 hover:text-red-300">Tell me</a>.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-24 sm:px-6">
                <Eyebrow>FAQ</Eyebrow>
                <Heading>Anaplan questions, answered</Heading>
                <div className="mt-10 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03]">
                    {faqs.map((f) => (
                        <details key={f.q} className="group p-5 sm:px-7">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white marker:hidden [&::-webkit-details-marker]:hidden">
                                {f.q}
                                <span className="flex-none text-xl text-red-400 transition group-open:rotate-45">+</span>
                            </summary>
                            <p className="mt-3 text-sm leading-relaxed text-gray-300">{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Guides */}
            <section id="guides" className="mx-auto max-w-4xl scroll-mt-20 px-4 pb-24 sm:px-6">
                <Eyebrow>Guides</Eyebrow>
                <Heading>Better Anaplan models</Heading>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {guides.map((g) => (
                        <Link key={g.slug} href={`/anaplan/guides/${g.slug}`} className={`${card} p-6 transition hover:border-red-500/40 hover:bg-white/[0.06]`}>
                            <p className="font-semibold text-white">{g.title}</p>
                            <p className="mt-2 text-sm leading-relaxed text-gray-300">{g.desc}</p>
                            <p className="mt-4 text-sm font-medium text-red-400">Read the guide →</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Get it */}
            <section id="get" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 sm:px-6">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 px-6 py-16 text-center text-white sm:px-12">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
                    <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/20 blur-3xl" aria-hidden="true" />
                    <Image src="/anaplan/icon.png" alt="" width={72} height={72} className="relative mx-auto rounded-2xl ring-4 ring-white/25" />
                    <h2 className="relative mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">Stop clicking through blueprints.</h2>
                    <p className="relative mx-auto mt-4 max-w-xl text-red-50">
                        Free on the Chrome Web Store (Chrome, Edge and other Chromium browsers) and Firefox Add-ons (Firefox 140+).
                    </p>
                    <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                        <StoreButton store="chrome" />
                        <StoreButton store="firefox" tone="dark" />
                    </div>
                    <p className="relative mt-6 text-sm text-red-50">
                        Saves you time?{" "}
                        <a href={sponsorUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-white underline underline-offset-2">♥ Sponsor the project on GitHub</a>
                    </p>
                    <p className="relative mt-2 text-sm text-red-50">
                        Questions or feedback?{" "}
                        <a href="mailto:contact@umang.dev?subject=Anaplan%20Toolkit" className="font-medium text-white underline underline-offset-2">contact@umang.dev</a>
                        {" · "}
                        <Link href="/anaplan/toolkit/privacy" className="font-medium text-white underline underline-offset-2">Privacy policy</Link>
                    </p>
                </div>
            </section>
        </ToolkitShell>
    );
};

export default AnaplanToolkit;
