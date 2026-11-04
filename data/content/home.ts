// Homepage content. Anything left empty/undefined is hidden by its component,
// so nothing is rendered until there is a real value for it.

export const links = {
    calendly: "https://calendly.com/thisumang",
    email: "contact@umang.dev",
    instagram: "https://instagram.com/thisumang",
    youtube: "https://youtube.com/@GetSaged",
    linkedin: "https://www.linkedin.com/in/thisumang/",
    guide: "https://topmate.io/thisumang", // TODO: confirm the Topmate product URL
}

export type Lang = "en" | "ja"
export type Stop = { city: string; icon: "india-gate" | "torii" | "skyline"; years: string; text: string }

// Every piece of homepage text, per language. Project and product names stay as they are.
export const copy = {
    en: {
        firstName: "Umang",
        lastName: "Chauhan",
        heading: "Umang Chauhan, product manager in Tokyo",
        based: "Currently in Tokyo",
        cities: { tokyo: "Tokyo", newYork: "New York", delhi: "Delhi" },
        open: "Building, filming, always up for a chat",
        aboutTitle: "About me",
        intro: "Hi, I'm Umang. By day I help one of the world's biggest retailers plan what goes on its shelves. By night I build the tools I wish existed, and film the whole thing.",
        journey: [
            { city: "Delhi", icon: "india-gate", years: "2016–20", text: "Studied Mathematics & Computer Engineering at Delhi Technological University." },
            { city: "Tokyo", icon: "torii", years: "2020–24", text: "Joined Fast Retailing (UNIQLO) as a software developer, then led a 9-person engineering team." },
            { city: "New York", icon: "skyline", years: "2024–25", text: "Product manager for the digital supply chain across the US, Canada and Europe." },
        ] as Stop[],
        college: { label: "College", title: "Delhi Technological University", detail: "B.Tech, Mathematics & Computer Engineering" },
        role: { label: "Role", title: "Product Manager", detail: "Fast Retailing (UNIQLO), global HQ in Tokyo" },
        workTitle: "Things I've built",
        onInstagram: "On Instagram",
        views: "views",
        totalViews: "4M+ views",
        pillars: ["Delhi / Tokyo life", "AI builds", "Company teardowns", "Cost of living", "Not getting scammed"],
        follow: "Follow on Instagram",
        onYoutube: "On YouTube",
        youtubeTitle: "54K subscribers",
        subscribe: "Subscribe on YouTube",
        testimonialsTitle: "Kind words",
        contact: "Contact",
        letsTalk: "Let's talk",
        bookCall: "Book a call",
    },
    ja: {
        firstName: "ウマング",
        lastName: "チャウハン",
        heading: "ウマング・チャウハン、東京のプロダクトマネージャー",
        based: "現在は東京にいます",
        cities: { tokyo: "東京", newYork: "ニューヨーク", delhi: "デリー" },
        open: "つくって、撮って、気軽に話そう",
        aboutTitle: "私について",
        intro: "こんにちは、ウマングです。昼は世界有数の小売企業で、店頭に何を並べるかを計画するプロダクトを作っています。夜は自分が欲しかったツールを作り、その過程をまるごと発信しています。",
        journey: [
            { city: "デリー", icon: "india-gate", years: "2016–20", text: "デリー工科大学で数学とコンピュータ工学を専攻。" },
            { city: "東京", icon: "torii", years: "2020–24", text: "ファーストリテイリング（ユニクロ）にソフトウェア開発者として入社し、その後9名のエンジニアチームを率いる。" },
            { city: "ニューヨーク", icon: "skyline", years: "2024–25", text: "米国・カナダ・欧州のデジタルサプライチェーンを担当するプロダクトマネージャー。" },
        ] as Stop[],
        college: { label: "大学", title: "デリー工科大学", detail: "技術学士（数学・コンピュータ工学）" },
        role: { label: "職種", title: "プロダクトマネージャー", detail: "ファーストリテイリング（ユニクロ）グローバル本部・東京" },
        workTitle: "つくったもの",
        onInstagram: "Instagram",
        views: "回再生",
        totalViews: "累計400万回再生",
        pillars: ["デリー／東京の暮らし", "AIでつくる", "企業の分析", "生活費のリアル", "詐欺に遭わないコツ"],
        follow: "Instagramをフォロー",
        onYoutube: "YouTube",
        youtubeTitle: "登録者5.4万人",
        subscribe: "YouTubeを購読",
        testimonialsTitle: "いただいた言葉",
        contact: "お問い合わせ",
        letsTalk: "話しましょう",
        bookCall: "通話を予約",
    },
}

export type Project = {
    title: string
    icon: "extension" | "chart" | "network" | "book" | "play" | "linkedin"
    tag: string
    outcome: string
    href?: string
    cta?: string
    image?: string
    metric?: { value: string; label: string }
    ja: { tag: string; outcome: string; metricLabel?: string }
}

// The first entry is shown as the large card.
export const featured: Project[] = [
    {
        title: "Anaplan Toolkit",
        icon: "extension",
        tag: "Chrome & Firefox extension · Free",
        outcome: "A side panel with 22 reports on the Anaplan model you have open: action IDs, formulas, saved views, page filters and more. Search it, export it, stop clicking through blueprints.",
        href: "/anaplan",
        cta: "See the toolkit",
        image: "/anaplan/summary-panel.png",
        metric: { value: "★★★★★", label: "on the Chrome Web Store" },
        ja: { tag: "Chrome・Firefox拡張機能 · 無料", outcome: "開いているAnaplanモデルについて22種類のレポートを表示するサイドパネル。アクションID、数式、保存ビュー、ページフィルターなどを検索・エクスポートできます。", metricLabel: "Chromeウェブストアでの評価" },
    },
    {
        title: "Inventory risk system",
        icon: "chart",
        tag: "Product · US, Canada & Europe",
        outcome: "Anomaly-driven inventory risk detection for a global retailer's digital supply chain.",
        href: "/about",
        cta: "Read more",
        metric: { value: "5% → 2%", label: "out-of-stock rate, $30M+ recovered" },
        ja: { tag: "プロダクト · 米国・カナダ・欧州", outcome: "グローバル小売企業のデジタルサプライチェーン向けに、異常を検知して在庫リスクを知らせるシステム。", metricLabel: "欠品率（3,000万ドル超の売上を回復）" },
    },
    {
        title: "Network Lab",
        icon: "network",
        tag: "Community · Tokyo & New York",
        outcome: "A community I co-founded, with in-person meetups in Tokyo and New York.",
        href: links.linkedin,
        cta: "See the latest meetup",
        ja: { tag: "コミュニティ · 東京・ニューヨーク", outcome: "共同創業したコミュニティ。東京とニューヨークで対面のミートアップを開催しています。" },
    },
]

export const more: Project[] = [
    {
        title: "AI PM Guide",
        icon: "book",
        tag: "Guide",
        outcome: "A practical guide to product management with AI.",
        href: links.guide,
        cta: "Get the guide",
        ja: { tag: "ガイド", outcome: "AI時代のプロダクトマネジメントの実践ガイド。" },
    },
    {
        title: "LinkedIn",
        icon: "linkedin",
        tag: "Social",
        outcome: "Connect with me on LinkedIn.",
        href: links.linkedin,
        cta: "Connect",
        ja: { tag: "SNS", outcome: "LinkedInでつながりましょう。" },
    },
    {
        title: "Get Saged",
        icon: "play",
        tag: "YouTube",
        outcome: "Videos on careers, AI and life abroad.",
        href: "https://youtube.com/GetSaged",
        cta: "Watch",
        ja: { tag: "YouTube", outcome: "キャリア、AI、海外生活についての動画。" },
    },
]

export type WorkPill = { name: string; href: string; size: "lg" | "md" | "sm"; tone: "blue" | "cream" | "amber" | "outline" }

// The work collage: names only, each one a link. Order sets the layout, size and tone set the look.
export const work: WorkPill[] = [
    { name: "Anaplan Toolkit", href: "/anaplan", size: "lg", tone: "blue" },
    { name: "Network Lab", href: links.linkedin, size: "md", tone: "cream" },
    { name: "Inventory risk system", href: "/about", size: "md", tone: "outline" },
    { name: "AI PM Guide", href: links.guide, size: "lg", tone: "amber" },
    { name: "Get Saged", href: "https://youtube.com/GetSaged", size: "md", tone: "outline" },
    { name: "TV VibeHack", href: "https://github.com/umang350/tv-vibehack", size: "sm", tone: "outline" },
    { name: "CopyMailTo", href: "https://github.com/umang350/CopyMailTo", size: "md", tone: "blue" },
    { name: "OpenReply", href: "https://github.com/umang350/openreply-latest-0810", size: "sm", tone: "cream" },
]

export type Testimonial = { quote: string; name: string; role: string }
// Add real quotes only.
export const testimonials: Testimonial[] = []

export const instagram = {
    handle: "@thisumang",
    // Most viewed first; all of them run in the reels carousel, and `hero` ones also float in the hero.
    // Add each reel's own URL as `href` when you have it.
    reels: [
        { thumb: "/home/reel-cool-stories-27.jpg", views: "1.3M", title: "Cool stories start at 27", href: "https://www.instagram.com/reel/DS3hrOHEwm9/", hero: true },
        { thumb: "/home/reel-ai-tools-daily.jpg", views: "1.2M", title: "AI tools I use daily", href: "https://www.instagram.com/reel/DOUH3FDEVnZ/" },
        { thumb: "/home/reel-first-principles.jpg", views: "906K", title: "First principles", href: "https://www.instagram.com/reel/DNdYQmKNQqS/", hero: true },
        { thumb: "/home/reel-three-networking.jpg", views: "298K", title: "Three networking tips", href: "https://www.instagram.com/reel/DLsR8gsOgq6/", hero: true },
        { thumb: "/home/reel-small-talk-hacks.jpg", views: "121K", title: "Small talk hacks", href: "https://www.instagram.com/reel/DL6puEOOEGx/" },
        { thumb: "/home/reel-mumbai-vs-new-york.jpg", views: "110K", title: "Mumbai vs New York expenses", href: "https://www.instagram.com/reel/DL2Ndc-Jubs/" },
        { thumb: "/home/reel-harvard.jpg", views: "31K", title: "This guy studied at Harvard", href: "https://www.instagram.com/reel/DLg5uOhO9HC/" },
        { thumb: "/home/reel-never-have-i-ever-ai.jpg", views: "22.5K", title: "Never have I ever: AI edition", href: "https://www.instagram.com/reel/DMDPPJSuZR4/" },
        { thumb: "/home/reel-fluent-japanese.jpg", views: "12.3K", title: "Fluent Japanese, obviously chopsticks", href: "https://www.instagram.com/reel/DL9wzRktomR/" },
        { thumb: "/home/reel-10x-salary.jpg", views: "8.7K", title: "10x salary in 4 years", href: "https://www.instagram.com/reel/DL1EtnquNja/" },
        { thumb: "/home/reel-camera-roll.jpg", views: "6.7K", title: "POV: you open my camera roll", href: "https://www.instagram.com/reel/DMG6bC0tHjA/" },
    ] as Reel[],
}

export const youtube = {
    handle: "@GetSaged",
    // Most viewed first.
    videos: [
        { id: "YXEccLAt-Q4", thumb: "/home/yt-iphone-13.jpg", views: "193K", title: "Got iPhone 13 Pro Max for Free | Already booked iPhone 15" },
        { id: "9fHMBSI7GvI", thumb: "/home/yt-data-engineer.jpg", views: "163K", title: "The Ultimate Data Engineer in 2022 | 5 Lakh LPA to 1 Crore" },
        { id: "bo_aSGEmm5c", thumb: "/home/yt-google-recruitment.jpg", views: "128K", title: "Google Recruitment Gyaan | Procedure, Tips, CTC" },
        { id: "FCI6xEkbkT0", thumb: "/home/yt-working-in-japan.jpg", views: "104K", title: "Working in Japan as Engineer | How To Find?" },
        { id: "gPQKSYGJgJQ", thumb: "/home/yt-java-cpp-python.jpg", views: "96K", title: "Choose Java vs C++ vs Python for Placements" },
        { id: "_BxLY46i0Lc", thumb: "/home/yt-goldman-sachs.jpg", views: "91K", title: "Goldman Sachs: The Ultimate Recruitment Guide" },
        { id: "7nHyhlWGb70", thumb: "/home/yt-atlassian.jpg", views: "90K", title: "Atlassian 50+ Lakh CTC for Tier 2,3 Colleges" },
        { id: "OAYiTVBIWL8", thumb: "/home/yt-jp-morgan.jpg", views: "86K", title: "JP Morgan Strategy | Profiles Ka Flex" },
        { id: "EyZYXtjPxj0", thumb: "/home/yt-pwc.jpg", views: "84K", title: "PwC Consulting Jobs for Engineers Demystified" },
        { id: "lB46kwvAwTA", thumb: "/home/yt-morgan-stanley.jpg", views: "84K", title: "Morgan Stanley ka Job Dabba" },
        { id: "EEJn8THLxhg", thumb: "/home/yt-de-shaw.jpg", views: "76K", title: "DE SHAW Detailed | CTC, Interview Procedure" },
        { id: "Jqn3BN_DGqk", thumb: "/home/yt-coding-tests.jpg", views: "70K", title: "How to Prepare for Coding Tests" },
    ],
}

export type Reel = { thumb: string; views: string; title: string; href?: string; hero?: boolean }
