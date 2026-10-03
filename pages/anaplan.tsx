import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

// Standalone landing page for the Anaplan Toolkit extension. Deliberately
// does not use the site's Page/Navbar/Footer so it can stand on its own.

const pageTitle = "Anaplan Toolkit — See how your Anaplan model fits together";
const pageDesc =
    "A Chrome and Firefox side panel that reports on the structure of the Anaplan model you have open: action IDs, usages, module lineage, page filters, saved views and workspace storage. Read-only, nothing leaves your browser.";

const chromeStoreUrl = "https://chromewebstore.google.com/detail/anaplan-toolkit/kbbgidpmmiechmccmmjpjkidihojdgnj";
const firefoxStoreUrl = "https://addons.mozilla.org/en-US/firefox/addon/anaplan-toolkit/";

const reportGroups = [
    {
        group: "Summary",
        items: [
            { name: "Model Summary", desc: "Model name, IDs, cell count, size, structure counts, and which reports are already loaded." },
        ],
    },
    {
        group: "Actions",
        items: [
            { name: "Actions & File IDs", desc: "Internal IDs for Processes, Imports, Exports and Files — ready to paste into API integrations." },
            { name: "Action Usages", desc: "Where every Action is wired up across Apps, Pages and widgets." },
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
    { title: "Get the data", body: "Pick a report and hit Get data. Results are cached per model, searchable, and export to CSV in one click." },
];

const privacy = [
    { title: "Talks only to Anaplan", body: "The only network calls go to the Anaplan tenant you're already signed into. No other server is ever contacted." },
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

const AnaplanToolkit = () => {
    return (
        <div className="min-h-screen w-full bg-white text-gray-900 antialiased">
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" href="/anaplan/icon.png" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://umang.dev/anaplan" />
                <meta property="og:title" content="Anaplan Toolkit" />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:image" content="https://umang.dev/anaplan/summary.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            {/* Header */}
            <header className="sticky top-0 z-20 border-b border-gray-200/70 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
                    <a href="#top" className="flex items-center gap-2.5">
                        <Image src="/anaplan/icon.png" alt="" width={28} height={28} className="rounded-md" />
                        <span className="text-[15px] font-semibold tracking-tight">Anaplan Toolkit</span>
                    </a>
                    <nav className="hidden items-center gap-7 text-sm text-gray-600 md:flex">
                        <a href="#reports" className="hover:text-gray-900">Reports</a>
                        <a href="#how" className="hover:text-gray-900">How it works</a>
                        <a href="#privacy" className="hover:text-gray-900">Privacy</a>
                    </nav>
                    <a href="#get" className="rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-gray-700">
                        Get it
                    </a>
                </div>
            </header>

            <main id="top">
                {/* Hero */}
                <section className="relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-x-0 -top-40 -z-0 flex justify-center" aria-hidden="true">
                        <div className="h-[480px] w-[900px] rounded-full bg-gradient-to-br from-red-100 via-rose-50 to-transparent opacity-80 blur-3xl" />
                    </div>
                    <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 md:pt-24 lg:grid-cols-2">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                                Chrome &amp; Firefox extension · v2.5
                            </span>
                            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                                See how your Anaplan model <span className="text-red-600">fits together.</span>
                            </h1>
                            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
                                A side panel that reports on the structure of the model you have open — action IDs,
                                where actions and modules are used, page filters, saved views and workspace storage.
                                Search it, export it to CSV, and stop clicking through blueprints.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <a href={chromeStoreUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700">
                                    Add to Chrome
                                </a>
                                <a href={firefoxStoreUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                                    Add to Firefox
                                </a>
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
                            ["10", "reports + summary"],
                            ["1 click", "CSV export"],
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
                                <li className="flex gap-2"><Check /> One-click CSV export</li>
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
                            the side panel, and local storage. Read the full{" "}
                            <Link href="/privacy/anaplan-toolkit" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">
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
                            <a href={chromeStoreUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-50">
                                Add to Chrome
                            </a>
                            <a href={firefoxStoreUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-50">
                                Add to Firefox
                            </a>
                        </div>
                        <p className="mt-6 text-sm text-red-100">
                            Questions or feedback?{" "}
                            <a href="mailto:contact@umang.dev?subject=Anaplan%20Toolkit" className="font-medium text-white underline underline-offset-2">contact@umang.dev</a>
                            {" · "}
                            <Link href="/privacy/anaplan-toolkit" className="font-medium text-white underline underline-offset-2">Privacy policy</Link>
                        </p>
                    </div>
                </section>
            </main>

            <footer className="border-t border-gray-200">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between">
                    <p>© 2026 Umang Chauhan · <a href="https://umang.dev" className="hover:text-gray-800">umang.dev</a></p>
                    <p className="max-w-xl md:text-right">
                        Anaplan Toolkit is an independent tool and is not affiliated with, endorsed by, or sponsored by Anaplan, Inc.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default AnaplanToolkit;
