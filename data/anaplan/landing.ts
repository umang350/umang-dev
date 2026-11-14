// Every string on the /anaplan landing page, in English and Japanese. The
// page (pages/anaplan.tsx) picks one by router locale. Report and tab names
// stay in English in both: they are the labels the extension's panel shows.

export type RoadmapStatus = "shipped" | "next" | "exploring" | "not";

type Pair = { title: string; body: string };

export type Landing = {
    pageTitle: string;
    pageDesc: string;
    pageKeywords: string;
    ogTitle: string;
    whatsNew: Pair[];
    reportGroups: { group: string; items: { name: string; desc: string }[] }[];
    roadmapLabels: Record<RoadmapStatus, string>;
    roadmap: { status: RoadmapStatus; title: string; body: string }[];
    faqs: { q: string; a: string }[];
    steps: Pair[];
    privacy: Pair[];
    shortcuts: { keys: string; where: string; opens: string }[];
    shots: { alt: string; caption: string }[];
    heroSlides: { alt: string; caption: string; problem: string; solves: string }[];
    stores: Record<"chrome" | "firefox", { eyebrow: string; name: string; label: string }>;
    marquee: string[];
    ui: {
        carouselLabel: string;
        slideOf: (k: number, n: number, caption: string) => string;
        howHelpsAria: (caption: string) => string;
        howItHelps: string;
        play: string;
        pause: string;
        prev: string;
        next: string;
        show: (caption: string) => string;
        badge: string;
        heroLead: string;
        heroPoints: [string, string][];
        heroNote: string;
        stats: (reportCount: number) => [string, string][];
        newIn: (version: string) => string;
        featuresHeading: string;
        browseAll: (n: number) => string;
        reportsEyebrow: string;
        reportsHeading: string;
        reportsLead: string;
        reportPerks: string[];
        galleryEyebrow: string;
        galleryHeading: string;
        galleryLead: string;
        fxEyebrow: string;
        fxHeading: string;
        fxLead: string;
        fxPoints: [string, string][];
        lockEyebrow: string;
        lockHeading: string;
        lockLead: string;
        lockStates: string[];
        lockAlt: string;
        howEyebrow: string;
        howHeading: string;
        kbTitle: string;
        kbCols: [string, string, string];
        privacyEyebrow: string;
        privacyHeading: string;
        roadmapEyebrow: string;
        roadmapHeading: string;
        roadmapLead: string;
        roadmapAsk: string;
        roadmapTell: string;
        faqHeading: string;
        guidesEyebrow: string;
        guidesHeading: string;
        guidesLead: string;
        readGuide: string;
        allGuides: (n: number) => string;
        getHeading: string;
        getLead: string;
        sponsorQ: string;
        sponsorLink: string;
        feedbackQ: string;
        privacyPolicy: string;
    };
};

const shortcutKeys = ["⌘⌥I", "⌘⌥O", "⌘⌥I", "⌘⌥O"];
const shortcutOpens = ["Actions & File IDs", "Action Usages", "Linked Pages", "Filters & Conditional Formatting"];

const en: Landing = {
    pageTitle: "Anaplan Toolkit — Free Anaplan Helper Tool for Model Builders (Chrome & Firefox)",
    pageDesc:
        "Free Chrome and Firefox extension for Anaplan model builders. Find action, import, export and process IDs for the Anaplan API, trace module lineage and formula impact, search every formula, lint against the Planual, document the model, run actions from a CSV, bulk create and delete modules and line items, monitor model locks and review workspace storage. Reads only your Anaplan session; no data leaves your browser.",
    pageKeywords:
        "Anaplan tool, Anaplan Chrome extension, Anaplan Firefox add-on, Anaplan API, Anaplan Integration API action IDs, Anaplan process ID, Anaplan import export ID, Anaplan model documentation, Anaplan model audit, Anaplan formula editor, Anaplan Planual, Anaplan lineage, Anaplan dependency, Anaplan unused line items, Anaplan bulk delete, Anaplan lock monitor, Anaplan model busy, Anaplan workspace storage, Anaplan revision tags, Anaplan model builder tools, Anaplan Blueprint, Anaplan impact analysis, Anaplan formula search, Anaplan run actions CSV, Anaplan bulk create modules, Anaplan lint, Anaplan Planual checker, Anaplan model documentation generator, how to improve Anaplan model, improve Anaplan model performance, Anaplan model best practices, Anaplan model health check, reduce Anaplan model size",
    ogTitle: "Anaplan Toolkit — free Anaplan model analyzer & API helper",
    whatsNew: [
        { title: "Impact analysis", body: "For every line item, which formulas use it and which it uses, directly and all the way down, with the modules and App pages that reach. A Modules tab shows which modules feed which." },
        { title: "Planual lint", body: "Checks the model against Anaplan's Planual. Every finding shows the rule's own number, linked to its page, plus a Housekeeping tab for unused line items and lists." },
        { title: "Planual where you build", body: "The part of a formula that breaks a rule is underlined in the editor with its rule number, and Blueprint view shows a badge after each line item. Hide a rule, or switch either off in Settings." },
        { title: "Search every formula", body: "Find a line item by words, an \"exact phrase\" or a /regular expression/ across every formula in the model." },
        { title: "Model documentation", body: "From Summary, write the model's lists, modules, line items and formulas as a Markdown file, or copy a compact version to paste into an AI assistant. Nothing is sent anywhere." },
        { title: "Used by, Depends on", body: "Hover a line item in the formula editor to see what uses it and what it depends on; hover a module for the modules it feeds and is fed by." },
        { title: "Run actions from a CSV", body: "Run processes, imports, exports and other actions one after another, on the open model or on others without opening them. Every row is validated first, nothing starts until you type the count, and each action's own result is shown." },
        { title: "Create modules and line items", body: "Create modules with the lists they apply to, and line items with a formula and a format, from a CSV, or add line items to modules that exist. Checked against the model first." },
        { title: "A fresh look", body: "A new logo and a refreshed side panel: clearer tabs, softer cards, and a Summary that opens straight onto your model." },
    ],
    reportGroups: [
        {
            group: "Summary",
            items: [
                { name: "Model Summary", desc: "Model name, IDs, size, structure counts and which reports are loaded. Get all data, download every report as CSVs in one .zip, or write the model’s documentation as Markdown." },
            ],
        },
        {
            group: "Actions",
            items: [
                { name: "Actions & File IDs", desc: "Internal IDs for Processes, Imports, Exports and Files — search by name or ID and copy one with a click." },
                { name: "Action Usages", desc: "Where every Action is wired up across Apps, Pages and widgets." },
                { name: "Process Steps", desc: "The actions each process runs, in order, with each import's source and target — plus a Copy API call button." },
                { name: "Run Actions", desc: "Runs processes, imports, exports and other actions from a CSV, in order, on this model or others without opening them. Validated first; changes the model only after you type the count." },
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
                { name: "Create Modules & Create Items", desc: "Create modules (with their lists and subsets) and line items (with a formula and a format) from a CSV, or add line items to modules that exist. Checked against the model first." },
                { name: "Delete Line Items & Delete Modules", desc: "Upload a CSV (the Line Items or Modules export works as is), review what Anaplan will accept, then delete in an order that avoids refusals." },
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
    ],
    roadmapLabels: { shipped: "Shipped", next: "Planned", exploring: "Exploring", not: "Not planned" },
    // Roadmap lanes: what the Toolkit already covers, versus what Anaplan's own
    // interfaces make possible. A direction, not a commitment.
    roadmap: [
        { status: "shipped", title: "Read the model's structure", body: "Modules, line items, lists, properties, dimensions, formulas and where each is used — as searchable, exportable reports." },
        { status: "shipped", title: "Create and delete structure, safely", body: "Create Modules, Create Items, Delete Line Items and Delete Modules: checked against the live model first, ordered so Anaplan accepts them, with a run log." },
        { status: "shipped", title: "Run actions from a CSV", body: "Processes, imports, exports and other actions, in order, on this model or others without opening them, each validated before anything starts." },
        { status: "shipped", title: "Model status and workspaces", body: "Lock Monitor, workspace storage and model lists — read-only." },
        { status: "shipped", title: "Impact, Planual lint and documentation", body: "Formula impact in both directions, Planual findings in reports, the formula editor and Blueprint grid, and the model written out as Markdown." },
        { status: "shipped", title: "Revisions and process steps", body: "Revision tags and where they were applied, plus the ordered actions behind every process." },
        { status: "next", title: "Bulk edit formulas and formats", body: "Change formula, format, style or summary on many line items at once, with a before / after diff and the same type-the-count confirmation." },
        { status: "next", title: "Bulk rename with references", body: "Rename modules and line items from a CSV, listing every formula, page and view that mentions the old name." },
        { status: "exploring", title: "Import, export and process definitions", body: "Read how imports, exports and processes are defined, not only where they are used. Editing them is a later question." },
        { status: "exploring", title: "Sync and revision discovery", body: "Show which models sync from or to this one and the revision pairs between them. Discovery only; it would not run a sync." },
        { status: "exploring", title: "Move and reorder", body: "Reorder line items, lists and modules from a CSV. Anaplan applies these changes strictly in order, so the check step matters most here." },
        { status: "not", title: "Creating a model from scratch", body: "Anaplan offers copy and delete, not create. The Toolkit will not try to work around that." },
        { status: "not", title: "Page, board and card authoring", body: "The biggest gap in tooling around Anaplan today. Reports on pages stay; building them is out of scope." },
        { status: "not", title: "Versions, calendar and subsets", body: "These sit outside Anaplan's own public API, so they will not be built." },
    ],
    faqs: [
        { q: "What is the best free Anaplan helper tool for model builders?", a: "Anaplan Toolkit is a free Chrome and Firefox extension that adds a side panel to the model you have open. It finds action, import, export and process IDs for the Anaplan API, traces where line items and modules are used, searches every formula, lints against the Planual, documents the whole model, runs actions from a CSV, bulk creates and deletes modules and line items, and monitors model locks. It is independent of Anaplan, Inc. and runs entirely in your browser." },
        { q: "How do I find an Anaplan action, import, export or process ID for the API?", a: "Open the model, open the Toolkit side panel and choose Actions & File IDs. Every process, import, export and file is listed with its internal ID, searchable by name, with a one-click copy. Process Steps adds a Copy API call button that builds an Anaplan Integration API v2 curl command for you to run with your own token." },
        { q: "Is there an Anaplan tool to document or audit a whole model?", a: "Yes. Get all data loads every report for the open model and Download all as CSV gives you modules, line items, lists, formulas, saved views, page usage and more in one .zip. Summary can also write the model's documentation as a Markdown file, or copy a compact version to paste into an AI assistant; the extension sends nothing anywhere." },
        { q: "How can I see where a line item or module is used in Anaplan?", a: "Impact lists which formulas use each line item and which it uses, directly and downstream. Linked Pages shows which Apps and Pages use each module, Line Items on Pages shows where each line item appears on a page, and the formula editor shows Used by and Depends on when you hover a reference. Formulas searches every formula by word, phrase or regular expression." },
        { q: "Can I bulk delete Anaplan line items or modules?", a: "Yes. Delete Line Items and Delete Modules read a CSV, check every row against the live model, order the deletes so Anaplan accepts them, and ask you to type the count before anything changes. Create Modules, Create Items and Run Actions work the same way; those five are the only views that write to your model." },
        { q: "Does Anaplan Toolkit check the Planual?", a: "It underlines per-line-item Planual rules in the formula editor with the rule number, adds badges in the Blueprint grid, and the Lint report lists findings across the model with each rule linked to its Planual page. Checks target the Classic engine and approximate the rules, so treat findings as prompts to look, not verdicts." },
        { q: "How do I know whether an Anaplan model is busy or locked?", a: "Lock Monitor checks the model at an interval you choose, from every second to every minute for up to 12 hours, and records whether it is available, updating, busy, locked or offline, with what is running when busy." },
        { q: "How do I improve an Anaplan model?", a: "Work in this order: measure the model first (module, line item and list counts, dimensions, size), fix structure such as oversized modules and dimensions that are not needed, retire line items nothing uses, make formulas readable and run the Planual checks, then repeat the health check monthly. Anaplan Toolkit's Summary, Modules, Impact, Lint and Formulas reports give you the evidence for each step. The step-by-step routine is in the guide How to improve an Anaplan model and how your team uses it, and a size-focused version is in How to reduce the size of an Anaplan model." },
        { q: "Is it safe? Does it send my Anaplan data anywhere?", a: "The extension only talks to Anaplan, over the session you are already signed in with. It has no analytics, no telemetry and never asks for a password or token. Results stay in your browser's session storage." },
        { q: "Which browsers does Anaplan Toolkit support, and is it free?", a: "It is free for Chrome, Edge and other Chromium browsers from the Chrome Web Store, and for Firefox 140 and later from Firefox Add-ons. It is an independent tool and not affiliated with Anaplan, Inc." },
    ],
    steps: [
        { title: "Open a model", body: "Sign in to Anaplan as usual and open any model. The toolkit uses your existing session — no extra login." },
        { title: "Open the side panel", body: "Click the toolbar icon. A panel opens next to the model, starting on the Model Summary." },
        { title: "Get the data", body: "Pick a report and hit Get data — or Get all data from the Summary. Results are cached per model, searchable, sortable and export to CSV in one click." },
    ],
    privacy: [
        { title: "Talks only to Anaplan", body: "Every network call goes to Anaplan, over the session you're already signed into. No other server is ever contacted, and no password or token is ever asked for." },
        { title: "No analytics or telemetry", body: "No tracking, crash reporting or advertising SDKs. Firefox listing declares data collection: none." },
        { title: "Reports only read", body: "Every report reads model metadata and changes nothing. Only Run Actions, Create Modules, Create Items, Delete Line Items and Delete Modules write, and only after you check a CSV and type the number to delete." },
        { title: "Session-only cache", body: "Results live in browser session storage, keyed per model, and expire after 6 hours or when the browser closes." },
    ],
    shortcuts: ["Actions tab", "Actions tab", "Modules tab", "Modules tab"].map((where, i) => ({ keys: shortcutKeys[i], where, opens: shortcutOpens[i] })),
    shots: [
        { alt: "Summary: the model's name, IDs, size and structure counts", caption: "Summary" },
        { alt: "Modules report with dimensions, time scale and the App pages that read each module", caption: "Modules" },
        { alt: "Line Items report with formats, applies-to and formulas", caption: "Line Items and formulas" },
        { alt: "Impact: what uses each line item and what it depends on", caption: "Impact" },
        { alt: "Lint: findings against the Planual, each with its rule number", caption: "Planual lint" },
    ],
    heroSlides: [
        { alt: "Summary: the model's name, IDs, size and structure counts", caption: "Summary", problem: "How big is this model, and what is in it?", solves: "Model name, IDs, size and structure counts on one screen, with every report one click away, instead of opening settings, Model Management and the blueprint to piece it together." },
        { alt: "Modules report with dimensions, time scale and the App pages that read each module", caption: "Modules", problem: "Which modules feed an App page, and which feed nothing?", solves: "Every module with its dimensions, time scale and the pages that read it. The Not on a page tab lists modules no page uses, so you can see what is safe to question." },
        { alt: "Line Items report with formats, applies-to and formulas", caption: "Line Items", problem: "Where is that formula, and what else looks like it?", solves: "Every line item's format, applies-to and formula in one searchable, sortable table, so you can find a pattern across the model without opening module after module." },
        { alt: "Impact: what uses each line item and what it depends on", caption: "Impact", problem: "What breaks if I change this line item?", solves: "For every line item, which formulas use it and which it uses, directly and all the way down, with the modules and App pages reached. Line items nothing uses show up too." },
        { alt: "Lint: findings against the Planual, each with its rule number", caption: "Planual lint", problem: "Does this model follow the Planual?", solves: "Findings against Anaplan's Planual, each with the rule's own number linked to its page. They are prompts to look, not verdicts, and the same checks mark the formula editor and Blueprint view." },
    ],
    stores: {
        chrome: { eyebrow: "Available in the", name: "Chrome Web Store", label: "Add Anaplan Toolkit to Chrome from the Chrome Web Store" },
        firefox: { eyebrow: "Get the add-on for", name: "Firefox", label: "Add Anaplan Toolkit to Firefox from Firefox Add-ons" },
    },
    marquee: [
        "Action IDs", "Process steps", "Impact analysis", "Planual lint", "Formula search", "Model docs as Markdown", "Lock Monitor",
        "Saved views", "Linked pages", "Run actions", "Bulk create & delete", "Revision tags", "Workspace storage", "CSV export",
    ],
    ui: {
        carouselLabel: "Anaplan Toolkit side panel screenshots",
        slideOf: (k, n, caption) => `${k} of ${n}: ${caption}`,
        howHelpsAria: (caption) => `How ${caption} helps`,
        howItHelps: "How it helps",
        play: "Play slideshow",
        pause: "Pause slideshow",
        prev: "Previous screenshot",
        next: "Next screenshot",
        show: (caption) => `Show ${caption}`,
        badge: "Free Chrome & Firefox extension for Anaplan",
        heroLead: "Stop digging through blueprints, tabs and exports to answer simple questions about your model. Open the panel beside any model and get the answer in one click.",
        heroPoints: [
            ["Find IDs", "action, import, export and process IDs for the API"],
            ["Trace impact", "what uses a line item, and what it depends on"],
            ["Lint & document", "Planual checks and the model as Markdown"],
            ["Watch locks", "know when the model is busy, locked or free"],
        ],
        heroNote: "Free · Reports are read-only · No data leaves your browser · Independent of Anaplan, Inc.",
        stats: (reportCount) => [
            [String(reportCount), "reports on model structure, usage and status, one panel"],
            ["1 click", "to export every report as CSVs in one .zip"],
            ["0", "passwords, tokens or third-party servers involved"],
            ["$0", "free to use, no sign-up"],
        ],
        newIn: (version) => `New in ${version}`,
        featuresHeading: "Built for the questions you actually ask",
        browseAll: (n) => `Browse all ${n} reports →`,
        reportsEyebrow: "Reports",
        reportsHeading: "Answers Anaplan doesn't put on one screen",
        reportsLead: "Each report is gathered on demand from the model in your active tab, cached for that model, searchable and exportable to CSV.",
        reportPerks: ["Fuzzy search across every column", "Sort by any column header", "One-click CSV export, in your sort order", "Cached per model — switch freely", "Live progress while large models load", "Fast on tables with thousands of rows"],
        galleryEyebrow: "In the panel",
        galleryHeading: "Lives right beside your model",
        galleryLead: "The panel follows the model in front of you. Switch tabs or models and it switches with you, keeping each model's results under its own key.",
        fxEyebrow: "Formula editor",
        fxHeading: "Navigate formulas like code",
        fxLead: "Work through a dependency chain without hunting through tabs. Everything reads Anaplan's in-page model data; no server is contacted and nothing is changed.",
        fxPoints: [
            ["Jump to a reference", "Cmd/Ctrl+click opens a module, line item, list or subset; Shift opens a new tab."],
            ["Readable hover cards", "Format, applies to, time scale and a formula with THEN/ELSE on their own lines, plus used by and depends on."],
            ["Function help", "Hover ITEM(, [LOOKUP: …], IF and more for the category, description and a help link."],
            ["Spot slips early", "Markers for unbalanced brackets, unterminated quotes and a Module.'x' that doesn't exist."],
        ],
        lockEyebrow: "Lock Monitor",
        lockHeading: "Know when the model is free",
        lockLead: "Before a big import or a deployment, find out whether anything else is running. It asks Anaplan for the model's status at an interval you choose, from every second to every minute for up to 12 hours, and records every answer.",
        lockStates: ["Available", "Updating", "Busy", "Locked", "Offline"],
        lockAlt: "Lock Monitor checks: the model available for 100% of 12 checks a second apart, median reply 208 ms, with each check listed",
        howEyebrow: "How it works",
        howHeading: "Three steps, no setup",
        kbTitle: "Keyboard shortcuts",
        kbCols: ["Shortcut", "In Anaplan's", "Opens"],
        privacyEyebrow: "Privacy",
        privacyHeading: "Your model data stays yours",
        roadmapEyebrow: "Roadmap",
        roadmapHeading: "Where the Toolkit is heading",
        roadmapLead: "A direction, not a promise: order and scope can change.",
        roadmapAsk: "Want something moved up, or something missing?",
        roadmapTell: "Tell me",
        faqHeading: "Anaplan questions, answered",
        guidesEyebrow: "Guides",
        guidesHeading: "How to improve an Anaplan model",
        guidesLead: "Practical routines for builders and CoE leads: measure the model, fix structure, retire unused line items, keep formulas readable and check model health every month.",
        readGuide: "Read the guide →",
        allGuides: (n) => `All ${n} Anaplan guides →`,
        getHeading: "Stop clicking through blueprints.",
        getLead: "Free on the Chrome Web Store (Chrome, Edge and other Chromium browsers) and Firefox Add-ons (Firefox 140+).",
        sponsorQ: "Saves you time?",
        sponsorLink: "♥ Sponsor the project on GitHub",
        feedbackQ: "Questions or feedback?",
        privacyPolicy: "Privacy policy",
    },
};

const ja: Landing = {
    pageTitle: "Anaplan Toolkit — モデルビルダーのための無料Anaplan拡張機能（Chrome / Firefox）",
    pageDesc:
        "Anaplanモデルビルダー向けの無料Chrome・Firefox拡張機能。Anaplan APIで使うアクション・インポート・エクスポート・プロセスのIDの確認、モジュールの利用先と数式の影響範囲の追跡、全数式の検索、Planualに基づくチェック、モデルのドキュメント化、CSVからのアクション実行、モジュールとラインアイテムの一括作成・削除、モデルのロック監視、ワークスペース容量の確認ができます。Anaplanのセッションだけを使い、データがブラウザーの外へ出ることはありません。",
    pageKeywords:
        "Anaplan ツール, Anaplan 拡張機能, Anaplan Chrome拡張, Anaplan Firefox アドオン, Anaplan API, Anaplan アクションID, Anaplan プロセスID, Anaplan インポート エクスポート ID, Anaplan モデル ドキュメント, Anaplan モデル 監査, Anaplan 数式エディター, Anaplan Planual, Anaplan 依存関係, Anaplan 影響分析, Anaplan 未使用 ラインアイテム, Anaplan 一括削除, Anaplan ロック 監視, Anaplan モデル ビジー, Anaplan ワークスペース 容量, Anaplan リビジョンタグ, Anaplan モデルビルダー, Anaplan ブループリント, Anaplan 数式 検索, Anaplan モデル 改善, Anaplan モデル サイズ 削減, Anaplan ベストプラクティス",
    ogTitle: "Anaplan Toolkit — 無料のAnaplanモデル分析・APIヘルパー",
    whatsNew: [
        { title: "影響分析（Impact）", body: "ラインアイテムごとに、それを使っている数式と、それが使っている数式を、直接の参照から末端までたどって表示します。到達するモジュールとアプリのページも分かります。Modulesタブでは、どのモジュールがどのモジュールにデータを渡しているかを確認できます。" },
        { title: "Planualチェック（Lint）", body: "モデルをAnaplanのPlanualに照らしてチェックします。指摘にはそれぞれルール番号が付き、該当するPlanualのページへリンクします。未使用のラインアイテムとリストを挙げるHousekeepingタブもあります。" },
        { title: "作業中の画面にPlanualを表示", body: "数式エディターでは、ルールに反している箇所にルール番号付きの下線が引かれ、ブループリントビューでは各ラインアイテムの後ろにバッジが付きます。ルール単位で非表示にでき、Settingsでそれぞれオフにもできます。" },
        { title: "全数式を検索", body: "単語、\"完全一致のフレーズ\"、/正規表現/ で、モデル内のすべての数式からラインアイテムを探せます。" },
        { title: "モデルのドキュメント化", body: "Summaryから、モデルのリスト、モジュール、ラインアイテム、数式をMarkdownファイルとして書き出せます。AIアシスタントに貼り付けるためのコンパクト版のコピーも可能です。どこにも送信されません。" },
        { title: "Used by / Depends on", body: "数式エディターでラインアイテムにカーソルを合わせると、それを使っているものと依存先が表示されます。モジュールに合わせると、データの渡し先と受け取り元のモジュールが分かります。" },
        { title: "CSVからアクションを実行", body: "プロセス、インポート、エクスポートなどのアクションを順番に実行します。開いているモデルだけでなく、ほかのモデルも開かずに実行できます。すべての行を事前に検証し、件数を入力するまで何も始まりません。各アクションの結果はAnaplanが返した内容のまま表示されます。" },
        { title: "モジュールとラインアイテムの作成", body: "適用対象のリストを指定したモジュールや、数式とフォーマットを指定したラインアイテムをCSVから作成できます。既存のモジュールへのラインアイテム追加にも対応します。実行前にモデルと照合します。" },
        { title: "新しいデザイン", body: "新しいロゴと、見やすくなったサイドパネル。タブが整理され、Summaryは開いているモデルをすぐに表示します。" },
    ],
    reportGroups: [
        {
            group: "Summary",
            items: [
                { name: "Model Summary", desc: "モデル名、ID、サイズ、構造の件数と、読み込み済みのレポート。Get all dataで全データを取得し、全レポートをCSVにして1つの.zipでダウンロードしたり、モデルのドキュメントをMarkdownで書き出したりできます。" },
            ],
        },
        {
            group: "Actions",
            items: [
                { name: "Actions & File IDs", desc: "プロセス、インポート、エクスポート、ファイルの内部ID。名前やIDで検索し、クリック1回でコピーできます。" },
                { name: "Action Usages", desc: "各アクションが、どのアプリ、ページ、ウィジェットに設定されているか。" },
                { name: "Process Steps", desc: "各プロセスが実行するアクションを順番どおりに、インポートのソースとターゲット付きで表示します。Copy API callボタンもあります。" },
                { name: "Run Actions", desc: "プロセス、インポート、エクスポートなどのアクションをCSVの順に実行します。このモデルでも、ほかのモデルでも（開かずに）実行できます。事前に検証し、件数を入力した後にだけモデルを変更します。" },
            ],
        },
        {
            group: "Pages",
            items: [
                { name: "Linked Pages", desc: "各モジュールを使っているアプリとページ。バックエンドからフロントエンドまでのつながりをたどれます。" },
                { name: "Filters & Conditional Formatting", desc: "ページのフィルターや条件付き書式に使われているラインアイテムを、その条件と色とともに表示します。グリッドで非表示のラインアイテムに付いたルールには Hidden on grid のタグが付きます。" },
                { name: "Line Items on Pages", desc: "選んだアプリのページに表示されているすべてのラインアイテムと、その位置（行、列、ページセレクター、フィルター、書式、並べ替え、非表示）。ページ別、ラインアイテム別に見られます。" },
            ],
        },
        {
            group: "Saved Views",
            items: [
                { name: "All Saved Views", desc: "モデル内のすべての保存済みビューをモジュール別に表示します。" },
                { name: "Saved Views in Screens", desc: "アプリの各ページのウィジェットが、どの保存済みビューを読んでいるか。" },
                { name: "Saved Views in Actions", desc: "保存済みビューをソースにしているインポート。" },
            ],
        },
        {
            group: "Structure",
            items: [
                { name: "Modules", desc: "すべてのモジュールと、そのディメンション、タイムスケール、時間範囲、ラインアイテム数、保存済みビュー数、利用しているアプリのページ。" },
                { name: "Line Items", desc: "すべてのラインアイテムと、そのフォーマット、適用対象、タイムスケール、数式。検索は数式にも一致します。" },
                { name: "Lists & Properties", desc: "すべてのリストとその親リスト、アイテム数。すべてのプロパティとそのフォーマット、数式。" },
                { name: "Create Modules & Create Items", desc: "モジュール（リストとサブセット付き）とラインアイテム（数式とフォーマット付き）をCSVから作成します。既存のモジュールへのラインアイテム追加も可能です。実行前にモデルと照合します。" },
                { name: "Delete Line Items & Delete Modules", desc: "CSVをアップロードし（Line ItemsやModulesのエクスポートがそのまま使えます）、Anaplanが受け付ける内容を確認してから、拒否されにくい順序で削除します。" },
            ],
        },
        {
            group: "Analysis",
            items: [
                { name: "Impact", desc: "各ラインアイテムを使っている数式と、それが使っている数式を、直接の参照と下流まで表示します。到達するモジュールとアプリのページも分かります。" },
                { name: "Lint", desc: "AnaplanのPlanualに照らした指摘をルール番号付きで表示します。未使用のラインアイテムとリストを挙げるハウスキーピングのチェックもあります。" },
                { name: "Formulas", desc: "単語、完全一致のフレーズ、正規表現で、すべての数式を検索します。" },
            ],
        },
        {
            group: "Revisions & Lock",
            items: [
                { name: "Revision Tags", desc: "各リビジョンタグを、誰が、いつ、どこで作成したか。適用先のすべてのモデルも表示します。" },
                { name: "Lock Monitor", desc: "指定した間隔で、モデルが利用可能か、ビジーか、ロック中か、オフラインかを確認します。タイムライン、応答時間、すべての確認結果を記録します。" },
            ],
        },
        {
            group: "Workspace",
            items: [
                { name: "Workspace Models & Storage", desc: "アクティブ、アーカイブ済み、削除済みのモデルとそのサイズ。使用量と割り当て容量を比べるメーター付き。" },
                { name: "All Workspaces", desc: "アクセスできるすべてのワークスペースの容量と、その中のすべてのアクティブなモデル。" },
            ],
        },
    ],
    roadmapLabels: { shipped: "提供中", next: "予定", exploring: "検討中", not: "予定なし" },
    roadmap: [
        { status: "shipped", title: "モデルの構造を読む", body: "モジュール、ラインアイテム、リスト、プロパティ、ディメンション、数式と、それぞれの利用先を、検索・エクスポートできるレポートで。" },
        { status: "shipped", title: "構造を安全に作成・削除する", body: "Create Modules、Create Items、Delete Line Items、Delete Modules。実行前に実際のモデルと照合し、Anaplanが受け付ける順序に並べ、実行ログを残します。" },
        { status: "shipped", title: "CSVからアクションを実行", body: "プロセス、インポート、エクスポートなどのアクションを順番に実行。このモデルでも、ほかのモデルでも開かずに実行でき、開始前に1件ずつ検証します。" },
        { status: "shipped", title: "モデルの状態とワークスペース", body: "Lock Monitor、ワークスペースの容量、モデル一覧。読み取り専用です。" },
        { status: "shipped", title: "影響分析、Planualチェック、ドキュメント", body: "数式の影響を双方向に追跡。Planualの指摘はレポート、数式エディター、ブループリントのグリッドに表示。モデルはMarkdownで書き出せます。" },
        { status: "shipped", title: "リビジョンとプロセスのステップ", body: "リビジョンタグとその適用先、各プロセスが順に実行するアクション。" },
        { status: "next", title: "数式とフォーマットの一括編集", body: "多数のラインアイテムの数式、フォーマット、スタイル、集計方法をまとめて変更。変更前後の差分を表示し、同じく件数の入力で確認します。" },
        { status: "next", title: "参照を確認できる一括リネーム", body: "モジュールとラインアイテムの名前をCSVから変更し、古い名前に触れているすべての数式、ページ、ビューを一覧にします。" },
        { status: "exploring", title: "インポート、エクスポート、プロセスの定義", body: "インポート、エクスポート、プロセスがどこで使われているかだけでなく、どう定義されているかを読み取ります。編集はその先の課題です。" },
        { status: "exploring", title: "同期とリビジョンの関係の把握", body: "このモデルと同期元・同期先の関係にあるモデルと、その間のリビジョンの組み合わせを表示します。把握のみで、同期は実行しません。" },
        { status: "exploring", title: "移動と並べ替え", body: "ラインアイテム、リスト、モジュールをCSVから並べ替えます。Anaplanはこうした変更を厳密に順番どおり適用するため、事前チェックがとくに重要になります。" },
        { status: "not", title: "モデルの新規作成", body: "Anaplanが提供しているのはコピーと削除で、作成はありません。Toolkitがそれを回避することはしません。" },
        { status: "not", title: "ページ、ボード、カードの作成", body: "現在のAnaplan周辺ツールで最も手薄な部分ですが、ページに関するレポートの提供にとどめ、作成機能は対象外とします。" },
        { status: "not", title: "バージョン、カレンダー、サブセット", body: "Anaplan自身の公開APIの範囲外にあるため、対応しません。" },
    ],
    faqs: [
        { q: "モデルビルダー向けの無料のAnaplan補助ツールはありますか？", a: "Anaplan Toolkitは、開いているモデルの横にサイドパネルを追加する無料のChrome・Firefox拡張機能です。Anaplan API用のアクション、インポート、エクスポート、プロセスのIDを確認でき、ラインアイテムやモジュールの利用先の追跡、全数式の検索、Planualに基づくチェック、モデル全体のドキュメント化、CSVからのアクション実行、モジュールとラインアイテムの一括作成・削除、モデルのロック監視ができます。Anaplan, Inc. とは無関係の独立したツールで、すべてブラウザー内で動作します。" },
        { q: "Anaplan APIで使うアクション、インポート、エクスポート、プロセスのIDはどう調べますか？", a: "モデルを開き、Toolkitのサイドパネルで Actions & File IDs を選びます。すべてのプロセス、インポート、エクスポート、ファイルが内部ID付きで一覧表示され、名前で検索してワンクリックでコピーできます。Process Steps には Copy API call ボタンがあり、Anaplan Integration API v2 のcurlコマンドを組み立てます。実行はご自身のトークンで行ってください。" },
        { q: "モデル全体をドキュメント化したり監査したりできるAnaplanツールはありますか？", a: "はい。Get all data で開いているモデルの全レポートを読み込み、Download all as CSV でモジュール、ラインアイテム、リスト、数式、保存済みビュー、ページでの利用状況などを1つの.zipにまとめて取得できます。Summaryからは、モデルのドキュメントをMarkdownファイルとして書き出したり、AIアシスタントに貼り付けるコンパクト版をコピーしたりもできます。拡張機能がどこかへ送信することはありません。" },
        { q: "Anaplanでラインアイテムやモジュールがどこで使われているかを確認するには？", a: "Impact は、各ラインアイテムを使っている数式と、それが使っている数式を、直接の参照と下流まで一覧にします。Linked Pages は各モジュールを使っているアプリとページを、Line Items on Pages は各ラインアイテムがページのどこに表示されているかを示します。数式エディターでは、参照にカーソルを合わせると Used by と Depends on が表示されます。Formulas は単語、フレーズ、正規表現ですべての数式を検索します。" },
        { q: "Anaplanのラインアイテムやモジュールを一括削除できますか？", a: "はい。Delete Line Items と Delete Modules はCSVを読み込み、すべての行を実際のモデルと照合し、Anaplanが受け付ける順序に並べ替えます。件数を入力するまで何も変更されません。Create Modules、Create Items、Run Actions も同じ流れで動作します。モデルに書き込むのはこの5つのビューだけです。" },
        { q: "Anaplan ToolkitはPlanualをチェックしますか？", a: "数式エディターでは、ラインアイテム単位のPlanualルールに反する箇所にルール番号付きの下線を引き、ブループリントのグリッドにはバッジを表示します。Lintレポートはモデル全体の指摘を一覧にし、各ルールをPlanualのページにリンクします。チェックはClassicエンジンを対象にルールを近似したものなので、指摘は結論ではなく、確認のきっかけとして扱ってください。" },
        { q: "Anaplanのモデルがビジーかロック中かを知るには？", a: "Lock Monitor は、1秒ごとから1分ごとまでの指定した間隔で、最長12時間モデルを確認します。利用可能、更新中、ビジー、ロック中、オフラインのどれかを記録し、ビジーのときは何が実行中かも表示します。" },
        { q: "Anaplanのモデルを改善するにはどうすればよいですか？", a: "次の順で進めます。まずモデルを計測します（モジュール数、ラインアイテム数、リスト数、ディメンション、サイズ）。次に、大きすぎるモジュールや不要なディメンションなど構造の問題を直します。どこからも使われていないラインアイテムを廃止し、数式を読みやすくしてPlanualのチェックを行い、このヘルスチェックを毎月繰り返します。Anaplan ToolkitのSummary、Modules、Impact、Lint、Formulasの各レポートが、それぞれの段階の根拠になります。手順の詳細はガイド（英語）にまとめています。" },
        { q: "安全ですか？ Anaplanのデータがどこかに送信されることはありますか？", a: "拡張機能が通信する相手はAnaplanだけで、すでにサインインしているセッションを使います。アクセス解析もテレメトリーもなく、パスワードやトークンを求めることもありません。結果はブラウザーのセッションストレージに保存されます。" },
        { q: "Anaplan Toolkitの対応ブラウザーは？ 無料ですか？", a: "無料です。Chrome、Edgeなど Chromium系のブラウザーではChromeウェブストアから、Firefox 140以降では Firefox Add-ons から入手できます。Anaplan, Inc. とは提携関係のない独立したツールです。" },
    ],
    steps: [
        { title: "モデルを開く", body: "いつもどおりAnaplanにサインインして、モデルを開きます。Toolkitは今のセッションをそのまま使うので、追加のログインは不要です。" },
        { title: "サイドパネルを開く", body: "ツールバーのアイコンをクリックします。モデルの横にパネルが開き、Model Summaryから始まります。" },
        { title: "データを取得する", body: "レポートを選んで Get data を押します。Summaryの Get all data でまとめて取得することもできます。結果はモデルごとにキャッシュされ、検索、並べ替え、ワンクリックのCSVエクスポートに対応します。" },
    ],
    privacy: [
        { title: "通信先はAnaplanだけ", body: "すべての通信は、すでにサインインしているセッションを使ってAnaplanに送られます。ほかのサーバーに接続することはなく、パスワードやトークンを求めることもありません。" },
        { title: "アクセス解析・テレメトリーなし", body: "トラッキング、クラッシュレポート、広告SDKは含まれません。Firefoxの掲載情報でも「データ収集：なし」と申告しています。" },
        { title: "レポートは読み取りのみ", body: "すべてのレポートはモデルのメタデータを読むだけで、何も変更しません。書き込みを行うのは Run Actions、Create Modules、Create Items、Delete Line Items、Delete Modules だけで、CSVを確認して件数を入力した後に限られます。" },
        { title: "セッション限りのキャッシュ", body: "結果はモデルごとにブラウザーのセッションストレージに保存され、6時間後、またはブラウザーを閉じたときに消えます。" },
    ],
    shortcuts: ["Actions タブ", "Actions タブ", "Modules タブ", "Modules タブ"].map((where, i) => ({ keys: shortcutKeys[i], where, opens: shortcutOpens[i] })),
    shots: [
        { alt: "Summary：モデル名、ID、サイズ、構造の件数", caption: "Summary（サマリー）" },
        { alt: "Modulesレポート：ディメンション、タイムスケール、各モジュールを読んでいるアプリのページ", caption: "Modules（モジュール）" },
        { alt: "Line Itemsレポート：フォーマット、適用対象、数式", caption: "Line Items（ラインアイテムと数式）" },
        { alt: "Impact：各ラインアイテムを使っているものと依存先", caption: "Impact（影響分析）" },
        { alt: "Lint：Planualに照らした指摘とルール番号", caption: "Lint（Planualチェック）" },
    ],
    heroSlides: [
        { alt: "Summary：モデル名、ID、サイズ、構造の件数", caption: "Summary", problem: "このモデルはどのくらいの大きさで、何が入っている？", solves: "モデル名、ID、サイズ、構造の件数が1画面にまとまり、どのレポートにもワンクリックで移れます。設定、モデル管理、ブループリントを開いて情報を集める必要はありません。" },
        { alt: "Modulesレポート：ディメンション、タイムスケール、各モジュールを読んでいるアプリのページ", caption: "Modules", problem: "どのモジュールがページで使われ、どれが使われていない？", solves: "すべてのモジュールを、ディメンション、タイムスケール、読んでいるページとともに表示します。Not on a page タブには、どのページからも使われていないモジュールが並び、見直しの候補が分かります。" },
        { alt: "Line Itemsレポート：フォーマット、適用対象、数式", caption: "Line Items", problem: "あの数式はどこにあって、似た数式はほかにどこにある？", solves: "すべてのラインアイテムのフォーマット、適用対象、数式を、検索・並べ替えできる1つの表にまとめます。モジュールを1つずつ開かなくても、モデル全体からパターンを見つけられます。" },
        { alt: "Impact：各ラインアイテムを使っているものと依存先", caption: "Impact", problem: "このラインアイテムを変えたら、どこに影響する？", solves: "ラインアイテムごとに、それを使っている数式と、それが使っている数式を、直接の参照から末端まで表示します。到達するモジュールとアプリのページも分かり、どこからも使われていないラインアイテムも見つかります。" },
        { alt: "Lint：Planualに照らした指摘とルール番号", caption: "Planual lint", problem: "このモデルはPlanualに沿っている？", solves: "AnaplanのPlanualに照らした指摘を、ルール番号とそのページへのリンク付きで表示します。結論ではなく確認のきっかけです。同じチェックが数式エディターとブループリントビューにも表示されます。" },
    ],
    stores: {
        chrome: { eyebrow: "入手先", name: "Chrome ウェブストア", label: "ChromeウェブストアからAnaplan ToolkitをChromeに追加" },
        firefox: { eyebrow: "アドオンを入手", name: "Firefox", label: "Firefox Add-onsからAnaplan ToolkitをFirefoxに追加" },
    },
    marquee: [
        "アクションID", "プロセスのステップ", "影響分析", "Planualチェック", "数式検索", "Markdownでモデルをドキュメント化", "ロック監視",
        "保存済みビュー", "モジュールとページのつながり", "アクション実行", "一括作成・削除", "リビジョンタグ", "ワークスペース容量", "CSVエクスポート",
    ],
    ui: {
        carouselLabel: "Anaplan Toolkit サイドパネルのスクリーンショット",
        slideOf: (k, n, caption) => `${n}枚中${k}枚目：${caption}`,
        howHelpsAria: (caption) => `${caption} が役立つ場面`,
        howItHelps: "こんなときに",
        play: "スライドショーを再生",
        pause: "スライドショーを一時停止",
        prev: "前のスクリーンショット",
        next: "次のスクリーンショット",
        show: (caption) => `${caption} を表示`,
        badge: "Anaplan向けの無料Chrome・Firefox拡張機能",
        heroLead: "モデルについてのちょっとした疑問のために、ブループリントやタブ、エクスポートを行き来するのはもう終わりです。モデルの横にパネルを開けば、ワンクリックで答えが見つかります。",
        heroPoints: [
            ["IDを調べる", "API用のアクション、インポート、エクスポート、プロセスのID"],
            ["影響をたどる", "ラインアイテムの利用先と依存先"],
            ["チェックと文書化", "PlanualチェックとMarkdownでのモデル出力"],
            ["ロックを監視", "モデルがビジーか、ロック中か、空いているか"],
        ],
        heroNote: "無料 · レポートは読み取り専用 · データはブラウザーの外に出ません · Anaplan, Inc. とは無関係の独立したツール",
        stats: (reportCount) => [
            [String(reportCount), "モデルの構造、利用状況、状態のレポートを1つのパネルに"],
            ["1クリック", "で全レポートをCSVにして1つの.zipで出力"],
            ["0", "パスワード、トークン、第三者のサーバーは一切不要"],
            ["¥0", "無料、登録不要"],
        ],
        newIn: (version) => `${version} の新機能`,
        featuresHeading: "現場で実際に出てくる疑問に答える",
        browseAll: (n) => `全${n}種類のレポートを見る →`,
        reportsEyebrow: "レポート",
        reportsHeading: "Anaplanが1画面では見せてくれない答え",
        reportsLead: "レポートは、アクティブなタブで開いているモデルから必要なときに取得されます。モデルごとにキャッシュされ、検索とCSVエクスポートに対応します。レポート名は拡張機能の画面に合わせて英語で記載しています。",
        reportPerks: ["すべての列をあいまい検索", "列見出しのクリックで並べ替え", "並べ替えた順のままワンクリックでCSV出力", "モデルごとにキャッシュ。切り替えも自由", "大きなモデルの読み込み中は進捗を表示", "数千行の表でも軽快に動作"],
        galleryEyebrow: "パネルの中身",
        galleryHeading: "いつもモデルのすぐ横に",
        galleryLead: "パネルは今開いているモデルに追従します。タブやモデルを切り替えるとパネルも切り替わり、結果はモデルごとに別々に保持されます。",
        fxEyebrow: "数式エディター",
        fxHeading: "コードのように数式をたどる",
        fxLead: "タブを探し回らずに、依存関係をたどれます。読み取るのはAnaplanのページ内にあるモデルデータだけで、サーバーへの通信も変更も行いません。",
        fxPoints: [
            ["参照先へジャンプ", "Cmd/Ctrl+クリックでモジュール、ラインアイテム、リスト、サブセットを開きます。Shiftを加えると新しいタブで開きます。"],
            ["読みやすいホバーカード", "フォーマット、適用対象、タイムスケールと、THEN/ELSEで改行した数式。利用先と依存先も表示します。"],
            ["関数のヘルプ", "ITEM(、[LOOKUP: …]、IF などにカーソルを合わせると、カテゴリ、説明、ヘルプへのリンクが表示されます。"],
            ["ミスを早めに発見", "括弧の不一致、閉じられていない引用符、存在しない Module.'x' にマーカーを表示します。"],
        ],
        lockEyebrow: "Lock Monitor",
        lockHeading: "モデルが空くタイミングを知る",
        lockLead: "大きなインポートやデプロイの前に、ほかの処理が動いていないかを確認できます。1秒ごとから1分ごとまでの指定した間隔で、最長12時間、Anaplanにモデルの状態を問い合わせ、すべての応答を記録します。",
        lockStates: ["利用可能", "更新中", "ビジー", "ロック中", "オフライン"],
        lockAlt: "Lock Monitorの確認結果：1秒間隔の12回の確認すべてでモデルは利用可能、応答時間の中央値は208ミリ秒",
        howEyebrow: "使い方",
        howHeading: "3ステップ、設定不要",
        kbTitle: "キーボードショートカット",
        kbCols: ["ショートカット", "Anaplanの画面", "開くレポート"],
        privacyEyebrow: "プライバシー",
        privacyHeading: "モデルのデータは、あなたの手元に",
        roadmapEyebrow: "ロードマップ",
        roadmapHeading: "Toolkitのこれから",
        roadmapLead: "方向性を示すもので、約束ではありません。順序や範囲は変わることがあります。",
        roadmapAsk: "優先してほしいもの、足りないものはありますか？",
        roadmapTell: "お知らせください",
        faqHeading: "Anaplanのよくある質問",
        guidesEyebrow: "ガイド",
        guidesHeading: "Anaplanモデルを改善するには",
        guidesLead: "モデルビルダーとCoEリード向けの実践的な手順です。モデルを計測し、構造を直し、未使用のラインアイテムを廃止し、数式を読みやすく保ち、毎月モデルの健全性を確認します。",
        readGuide: "ガイドを読む →",
        allGuides: (n) => `Anaplanガイド全${n}本 →`,
        getHeading: "ブループリントを行き来する毎日に、終止符を。",
        getLead: "Chromeウェブストア（Chrome、Edgeなど Chromium系ブラウザー）と Firefox Add-ons（Firefox 140以降）で無料公開中。",
        sponsorQ: "時間の節約になりましたか？",
        sponsorLink: "♥ GitHubでプロジェクトを支援する",
        feedbackQ: "ご質問・ご意見は",
        privacyPolicy: "プライバシーポリシー",
    },
};

export const landing: Record<"en" | "ja", Landing> = { en, ja };
