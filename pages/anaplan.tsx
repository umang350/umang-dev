import Image from "next/image";
import Link from "next/link";
import ToolkitShell from "@/components/anaplan/ToolkitShell";

// Standalone landing page for the Anaplan Toolkit extension. Deliberately
// does not use the site's Page/Navbar/Footer so it can stand on its own.

const pageTitle = "Anaplan Toolkit — Free Anaplan Model Analyzer, Formula Editor Tools & API Helper (Chrome & Firefox)";
const pageDesc =
    "Free Chrome and Firefox extension for Anaplan model builders. Find action, import, export and process IDs for the Anaplan API, trace module lineage, audit line item formulas, bulk delete modules and line items, check Planual rules, monitor model locks and review workspace storage. Reads only your Anaplan session; no data leaves your browser.";
const pageKeywords =
    "Anaplan tool, Anaplan Chrome extension, Anaplan Firefox add-on, Anaplan API, Anaplan Integration API action IDs, Anaplan process ID, Anaplan import export ID, Anaplan model documentation, Anaplan model audit, Anaplan formula editor, Anaplan Planual, Anaplan lineage, Anaplan dependency, Anaplan unused line items, Anaplan bulk delete, Anaplan lock monitor, Anaplan model busy, Anaplan workspace storage, Anaplan revision tags, Anaplan model builder tools, Anaplan Blueprint";

const chromeStoreUrl = "https://chromewebstore.google.com/detail/anaplan-toolkit/kbbgidpmmiechmccmmjpjkidihojdgnj";
const firefoxStoreUrl = "https://addons.mozilla.org/en-US/firefox/addon/anaplan-toolkit/";

const version = "2.11";
const sponsorUrl = "https://github.com/sponsors/umang350";

const whatsNew = [
    { title: "Click through formulas", body: "Cmd/Ctrl+click a module, line item, list or subset in a formula to open it — in Blueprint view, with the row selected. Add Shift for a new tab." },
    { title: "Hover for the detail", body: "Hover a reference for its format, dimensions, time scale and a readable formula, or a function for its category, description and help link." },
    { title: "Applies To, clickable", body: "In the Blueprint grid, Cmd/Ctrl+click a list or subset in Applies To to open it, or hover for its parent, item count and the modules that use it." },
    { title: "Bulk delete, checked first", body: "Delete Line Items and Delete Modules read a CSV, check every row against the live model, and ask you to type the count before anything changes." },
    { title: "5x faster module deletes", body: "Modules go up to 10 to a request and ones a process uses are skipped. An 11,197-line-item cleanup dropped from 31 minutes to 6. Export a run log." },
    { title: "Revision Tags & Process Steps", body: "See who tagged each revision and where it was applied, and the ordered actions each process runs — with a Copy API call button." },
];

const reportGroups = [
    {
        group: "Summary",
        items: [
            { name: "Model Summary", desc: "Model name, IDs, size, structure counts and which reports are loaded. Get all data, or download every report as CSVs in one .zip." },
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

// Roadmap lanes follow the status bands of slanaplan's capability matrix
// (https://slanai.slavi.dev/apis): what the Anaplan JSON-RPC/REST surface can
// do, versus what the Toolkit already covers. A direction, not a commitment.
type RoadmapStatus = "shipped" | "building" | "next" | "exploring" | "not";

const roadmapStatus: Record<RoadmapStatus, { label: string; badge: string }> = {
    shipped: { label: "Shipped", badge: "bg-green-50 text-green-700 ring-green-200" },
    building: { label: "In progress", badge: "bg-blue-50 text-blue-700 ring-blue-200" },
    next: { label: "Planned", badge: "bg-amber-50 text-amber-700 ring-amber-200" },
    exploring: { label: "Exploring", badge: "bg-gray-100 text-gray-700 ring-gray-200" },
    not: { label: "Not planned", badge: "bg-red-50 text-red-700 ring-red-200" },
};

const roadmap: { status: RoadmapStatus; title: string; body: string }[] = [
    { status: "shipped", title: "Read the model's structure", body: "Modules, line items, lists, properties, dimensions, formulas and where each is used — as searchable, exportable reports." },
    { status: "shipped", title: "Delete structure, safely", body: "Delete Line Items and Delete Modules: checked against the live model first, ordered from the formulas, with a run log." },
    { status: "shipped", title: "Model status and workspaces", body: "Lock Monitor, workspace storage and model lists — read-only." },
    { status: "shipped", title: "Revisions and process steps", body: "Revision tags and where they were applied, plus the ordered actions behind every process." },
    { status: "building", title: "Planual checks in the editor", body: "Rule markers and Blueprint grid badges for per-line-item Planual rules. Being tested against real models." },
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
    { q: "How do I find an Anaplan action, import, export or process ID for the API?", a: "Open the model, open the Toolkit side panel and choose Actions & File IDs. Every process, import, export and file is listed with its internal ID, searchable by name, with a one-click copy. Process Steps adds a Copy API call button that builds an Anaplan Integration API v2 curl command for you to run with your own token." },
    { q: "Is there an Anaplan tool to document or audit a whole model?", a: "Yes. Get all data loads every report for the open model and Download all as CSV gives you modules, line items, lists, formulas, saved views, page usage and more in one .zip. Summary can also write model documentation as a Markdown file." },
    { q: "How can I see where a line item or module is used in Anaplan?", a: "Linked Pages shows which Apps and Pages use each module, Line Items on Pages shows where each line item appears on a page, and the formula editor shows Used by and Depends on when you hover a reference." },
    { q: "Can I bulk delete Anaplan line items or modules?", a: "Yes. Delete Line Items and Delete Modules read a CSV, check every row against the live model, order the deletes so Anaplan accepts them, and ask you to type the count before anything changes. They are the only views that write to your model." },
    { q: "Does Anaplan Toolkit check the Planual?", a: "It marks a set of per-line-item Planual rules in the formula editor and the Blueprint grid, and the Lint report lists them across the model with each rule linked to its Planual page. They are approximations of the rules, not a replacement for review." },
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

const Check = () => (
    <svg viewBox="0 0 20 20" className="h-5 w-5 flex-none text-red-600" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
    </svg>
);

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

// Store badge with the browser's own logo. "dark" sits on light backgrounds,
// "light" on the red call-to-action panel.
const StoreButton = ({ store, tone = "dark" }: { store: Store; tone?: "dark" | "light" }) => {
    const s = stores[store];
    const toneClass =
        tone === "dark"
            ? "bg-gray-900 text-white ring-gray-900 hover:bg-gray-800"
            : "bg-white text-gray-900 ring-white/40 hover:bg-gray-50";
    return (
        <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`group inline-flex h-14 min-w-[13rem] items-center gap-3 rounded-xl px-4 shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${toneClass}`}
        >
            <Image src={s.logo} alt="" width={32} height={32} unoptimized className="h-8 w-8 flex-none" />
            <span className="flex flex-col text-left leading-tight">
                <span className={`text-[11px] font-medium ${tone === "dark" ? "text-gray-300" : "text-gray-500"}`}>{s.eyebrow}</span>
                <span className="text-base font-semibold tracking-tight">{s.name}</span>
            </span>
        </a>
    );
};

const AnaplanToolkit = () => {
    return (
        <ToolkitShell
            title={pageTitle}
            desc={pageDesc}
            path="/anaplan"
            ogImage="https://umang.dev/anaplan/summary.png"
            ogTitle="Anaplan Toolkit — free Anaplan model analyzer & API helper"
            onLanding
            keywords={pageKeywords}
            jsonLd={jsonLd}
        >
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 -top-40 -z-0 flex justify-center" aria-hidden="true">
                    <div className="h-[480px] w-[900px] rounded-full bg-gradient-to-br from-red-100 via-rose-50 to-transparent opacity-80 blur-3xl" />
                </div>
                <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 md:pt-24 lg:grid-cols-2">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                            Chrome &amp; Firefox extension · v{version}
                        </span>
                        <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                            See how your Anaplan model <span className="text-red-600">fits together.</span>
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
                            A side panel that reports on the structure of the model you have open — action IDs and
                            process steps, where actions and modules are used, page filters, saved views, line item
                            formulas, revision tags, lock status and workspace storage. Search it, sort it, export it
                            to CSV, and stop clicking through blueprints.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <StoreButton store="chrome" />
                            <StoreButton store="firefox" />
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            Free and built in spare time.{" "}
                            <a href={sponsorUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">♥ Sponsor on GitHub</a>
                        </p>
                        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><Check /> Reports are read-only</li>
                            <li className="flex items-center gap-2"><Check /> No data leaves your browser</li>
                            <li className="flex items-center gap-2"><Check /> CSV export everywhere</li>
                        </ul>
                    </div>
                    <div className="relative mx-auto w-full max-w-md">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-2xl shadow-gray-900/10">
                            <Image
                                src="/anaplan/summary-panel.png"
                                alt="Anaplan Toolkit extension side panel showing an Anaplan model summary: model IDs, size, module and line item counts"
                                width={1408}
                                height={1948}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats strip */}
            <section className="border-y border-gray-200 bg-gray-50">
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 text-center sm:px-6 md:grid-cols-4">
                    {[
                        ["19", "reports + summary"],
                        ["1 .zip", "every report as CSV"],
                        ["0", "third-party servers"],
                        ["6h", "per-model cache"],
                    ].map(([n, l]) => (
                        <div key={l}>
                            <div className="text-2xl font-bold tracking-tight sm:text-3xl">{n}</div>
                            <div className="mt-1 text-sm text-gray-500">{l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* What's new */}
            <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-wider text-red-600">New in {version}</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">What&apos;s new</h2>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {whatsNew.map((n) => (
                        <div key={n.title} className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-5">
                            <Check />
                            <div>
                                <h3 className="font-semibold">{n.title}</h3>
                                <p className="mt-1 text-sm leading-relaxed text-gray-600">{n.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reports */}
            <section id="reports" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-wider text-red-600">Reports</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Answers Anaplan doesn&apos;t put on one screen</h2>
                    <p className="mt-4 text-gray-600">
                        Each report is gathered on demand from the model in your active tab, cached for that model,
                        searchable, and exportable to CSV.
                    </p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reportGroups.map((g) => (
                        <div key={g.group} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{g.group}</div>
                            <ul className="mt-4 space-y-4">
                                {g.items.map((r) => (
                                    <li key={r.name}>
                                        <div className="font-semibold">{r.name}</div>
                                        <p className="mt-1 text-sm leading-relaxed text-gray-600">{r.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">In every report</div>
                        <ul className="mt-4 space-y-3 text-sm text-gray-700">
                            <li className="flex gap-2"><Check /> Fuzzy search across every column</li>
                            <li className="flex gap-2"><Check /> Sort by any column header</li>
                            <li className="flex gap-2"><Check /> One-click CSV export, in your sort order</li>
                            <li className="flex gap-2"><Check /> Cached per model — switch models freely</li>
                            <li className="flex gap-2"><Check /> Live progress while large models load</li>
                            <li className="flex gap-2"><Check /> Stays fast on tables with thousands of rows</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Formula editor spotlight */}
            <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
                <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-red-50/60 p-8 sm:p-12">
                    <p className="text-sm font-semibold uppercase tracking-wider text-red-600">Formula editor</p>
                    <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Navigate formulas like code</h2>
                    <p className="mt-4 max-w-2xl text-gray-600">
                        Work through a dependency chain without hunting through tabs. Everything reads Anaplan&apos;s
                        in-page model data — no server is contacted and nothing is changed.
                    </p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["Jump to a reference", "Cmd/Ctrl+click opens a module, line item, list or subset; Shift opens a new tab."],
                            ["Readable hover cards", "Format, applies to, time scale and a formula with THEN/ELSE on their own lines."],
                            ["Function help", "Hover ITEM(, [LOOKUP: …], IF and more for the category, description and a help link."],
                            ["Spot slips early", "Markers for unbalanced brackets, unterminated quotes and a Module.'x' that doesn't exist."],
                        ].map(([t, b]) => (
                            <div key={t} className="rounded-2xl border border-gray-200 bg-white p-5">
                                <h3 className="font-semibold">{t}</h3>
                                <p className="mt-1 text-sm leading-relaxed text-gray-600">{b}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lock Monitor spotlight */}
            <section className="border-t border-gray-200 bg-gray-50 py-20">
                <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">Lock Monitor</p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Know when the model is free</h2>
                        <p className="mt-4 text-gray-600">
                            Before a big import or a deployment, find out whether anything else is running. The Lock
                            Monitor asks Anaplan for the model&apos;s status at an interval you choose and records every
                            answer.
                        </p>
                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            <li className="flex gap-2"><Check /> Available, Updating, Busy, Locked or Offline — and what&apos;s running when it&apos;s busy</li>
                            <li className="flex gap-2"><Check /> Every second up to every minute, for up to 12 hours</li>
                            <li className="flex gap-2"><Check /> A timeline plus every check with its reply time, exportable to CSV</li>
                            <li className="flex gap-2"><Check /> Optional notifications when the model has been busy for 30 seconds, and when it&apos;s free again</li>
                        </ul>
                    </div>
                    <div className="mx-auto w-full max-w-md">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10">
                            <Image
                                src="/anaplan/lock-monitor.png"
                                alt="Lock Monitor checks: the model available for 100% of 12 checks a second apart, median reply 208 ms, with each check listed"
                                width={1404}
                                height={1936}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap */}
            <section id="roadmap" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-wider text-red-600">Roadmap</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Where the Toolkit is heading</h2>
                    <p className="mt-4 text-gray-600">
                        Mapped against what Anaplan&apos;s own interfaces can do, using the capability matrix of{" "}
                        <a href="https://slanai.slavi.dev/apis" target="_blank" rel="noopener noreferrer" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">slanaplan</a>
                        , a separate project that documents what is built, what is partial and what is not possible.
                        A direction, not a promise: order and scope can change.
                    </p>
                </div>
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {roadmap.map((r) => (
                        <div key={r.title} className={`rounded-2xl border border-gray-200 bg-white p-5 ${r.status === "not" ? "opacity-80" : ""}`}>
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${roadmapStatus[r.status].badge}`}>
                                {roadmapStatus[r.status].label}
                            </span>
                            <h3 className="mt-3 font-semibold">{r.title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-gray-600">{r.body}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-sm text-gray-600">
                    Want something moved up, or something missing?{" "}
                    <a href="mailto:contact@umang.dev?subject=Anaplan%20Toolkit%20roadmap" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">Tell me</a>.
                </p>
            </section>

            {/* Screenshots */}
            <section className="bg-gray-900 py-20 text-white">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Lives right beside your model</h2>
                    <p className="mt-4 max-w-2xl text-gray-300">
                        The panel follows the model in front of you. Switch tabs or models and it switches with you,
                        keeping each model&apos;s results under its own key.
                    </p>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {shots.map((s) => (
                            <figure key={s.src}>
                                <div className="overflow-hidden rounded-xl border border-white/10 bg-gray-800">
                                    <Image src={s.src} alt={s.alt} width={1280} height={800} />
                                </div>
                                <figcaption className="mt-3 text-sm text-gray-400">{s.caption}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-red-600">How it works</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Three steps, no setup</h2>
                <ol className="mt-12 grid gap-6 md:grid-cols-3">
                    {steps.map((s, i) => (
                        <li key={s.title} className="rounded-2xl border border-gray-200 p-6">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">{i + 1}</div>
                            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.body}</p>
                        </li>
                    ))}
                </ol>

                <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                        <h3 className="font-semibold">Keyboard shortcuts</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Inside the Anaplan modelling UI. <kbd className="font-mono">⌘⌥</kbd> on macOS,{" "}
                            <kbd className="font-mono">Ctrl+Alt</kbd> on Windows and Linux.
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
                            <tbody className="divide-y divide-gray-100">
                                {shortcuts.map((k) => (
                                    <tr key={k.where + k.keys}>
                                        <td className="px-6 py-3">
                                            <kbd className="rounded-md border border-gray-300 bg-white px-2 py-0.5 font-mono text-xs shadow-sm">{k.keys}</kbd>
                                        </td>
                                        <td className="px-6 py-3 text-gray-600">{k.where}</td>
                                        <td className="px-6 py-3 font-medium">{k.opens}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Privacy */}
            <section id="privacy" className="scroll-mt-20 border-t border-gray-200 bg-gray-50 py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-red-600">Privacy</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Your model data stays yours</h2>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {privacy.map((p) => (
                            <div key={p.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                                <h3 className="font-semibold">{p.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-sm text-gray-600">
                        Permissions: access to <code className="rounded bg-gray-200/70 px-1.5 py-0.5 text-xs">https://*.anaplan.com/*</code>,
                        the side panel, and local storage — plus notifications, only if you turn on the Lock
                        Monitor&apos;s <em>Notify me</em>. Read the full{" "}
                        <Link href="/anaplan/toolkit/privacy" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">
                            privacy policy
                        </Link>.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-4 pb-20 sm:px-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-red-600">FAQ</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Anaplan questions, answered</h2>
                <div className="mt-10 divide-y divide-gray-200 rounded-2xl border border-gray-200">
                    {faqs.map((f) => (
                        <details key={f.q} className="group p-5">
                            <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Get it */}
            <section id="get" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
                <div className="relative overflow-hidden rounded-3xl bg-red-600 px-6 py-14 text-center text-white sm:px-12">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                    <Image src="/anaplan/icon.png" alt="" width={64} height={64} className="mx-auto rounded-2xl ring-4 ring-white/20" />
                    <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Get Anaplan Toolkit</h2>
                    <p className="mx-auto mt-4 max-w-xl text-red-50">
                        Free on the Chrome Web Store (Chrome, Edge and other Chromium browsers)
                        and Firefox Add-ons (Firefox 140+).
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <StoreButton store="chrome" tone="light" />
                        <StoreButton store="firefox" tone="light" />
                    </div>
                    <p className="mt-6 text-sm text-red-100">
                        Saves you time?{" "}
                        <a href={sponsorUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-white underline underline-offset-2">♥ Sponsor the project on GitHub</a>
                    </p>
                    <p className="mt-2 text-sm text-red-100">
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
