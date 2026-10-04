import Image from "next/image";
import Link from "next/link";
import ToolkitShell from "@/components/anaplan/ToolkitShell";

// Standalone landing page for the Anaplan Toolkit extension. Deliberately
// does not use the site's Page/Navbar/Footer so it can stand on its own.

const pageTitle = "Anaplan Toolkit — See how your Anaplan model fits together";
const pageDesc =
    "A Chrome and Firefox side panel that reports on the structure of the Anaplan model you have open: action IDs and process steps, module lineage, page filters, saved views, modules, line items and lists, revision tags, lock status and workspace storage. Read-only, nothing leaves your browser.";

const chromeStoreUrl = "https://chromewebstore.google.com/detail/anaplan-toolkit/kbbgidpmmiechmccmmjpjkidihojdgnj";
const firefoxStoreUrl = "https://addons.mozilla.org/en-US/firefox/addon/anaplan-toolkit/";

const version = "2.6";

const whatsNew = [
    { title: "Structure reports", body: "Modules (with time scale and range), Line Items with searchable formulas, and Lists with their properties." },
    { title: "Process Steps", body: "Each process's actions in order, with a Copy API call button for every process and action." },
    { title: "Revisions", body: "Every revision tag, who created it and when, and each model it was applied to." },
    { title: "Lock Monitor", body: "Watches whether the model is available, busy, locked or offline — and says what's running." },
    { title: "Get all & Download all", body: "Gather every report in one go from the Summary, then save them all as CSVs in a single .zip." },
    { title: "Sort any column", body: "Click a column header to sort; CSV export follows the order you've sorted." },
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
            { name: "Actions & File IDs", desc: "Internal IDs for Processes, Imports, Exports and Files — ready to paste into API integrations." },
            { name: "Action Usages", desc: "Where every Action is wired up across Apps, Pages and widgets." },
            { name: "Process Steps", desc: "The actions each process runs, in order, with each import's source and target — plus a Copy API call button." },
        ],
    },
    {
        group: "Pages",
        items: [
            { name: "Linked Pages", desc: "Which Apps and Pages consume each module, so you can trace lineage from backend to frontend." },
            { name: "Filters & Conditional Formatting", desc: "Line Items used as page filters or formatting rules, shown beside their conditions and colours." },
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
        ],
    },
    {
        group: "Revisions & Lock",
        items: [
            { name: "Revision Tags", desc: "Who created each revision tag, when and where, and every model it was applied to." },
            { name: "Lock Monitor", desc: "Checks at an interval you choose whether the model is available, busy, locked or offline, with a timeline of what was running." },
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

const steps = [
    { title: "Open a model", body: "Sign in to Anaplan as usual and open any model. The toolkit uses your existing session — no extra login." },
    { title: "Open the side panel", body: "Click the toolbar icon. A panel opens next to the model, starting on the Model Summary." },
    { title: "Get the data", body: "Pick a report and hit Get data — or Get all data from the Summary. Results are cached per model, searchable, sortable and export to CSV in one click." },
];

const privacy = [
    { title: "Talks only to Anaplan", body: "Every network call goes to Anaplan, over the session you're already signed into. No other server is ever contacted, and no password or token is ever asked for." },
    { title: "No analytics or telemetry", body: "No tracking, crash reporting or advertising SDKs. Firefox listing declares data collection: none." },
    { title: "Read-only", body: "Every report only reads model metadata. Nothing in your model is created, changed or deleted." },
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
            ogTitle="Anaplan Toolkit"
            onLanding
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
                        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><Check /> Read-only</li>
                            <li className="flex items-center gap-2"><Check /> No data leaves your browser</li>
                            <li className="flex items-center gap-2"><Check /> CSV export everywhere</li>
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-2xl shadow-gray-900/10">
                            <Image
                                src="/anaplan/summary.png"
                                alt="Anaplan Toolkit side panel showing the Model Summary: IDs, cell count, size, structure counts and loaded reports"
                                width={1280}
                                height={800}
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
                        ["15", "reports + summary"],
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
                        </ul>
                    </div>
                </div>
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
