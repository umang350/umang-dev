// Homepage content. Anything left empty/undefined is hidden by its component,
// so nothing is rendered until there is a real value for it.

export const links = {
    cv: "/UmangResume.pdf",
    calendly: "https://calendly.com/thisumang",
    email: "contact@umang.dev",
    instagram: "https://instagram.com/thisumang",
    linkedin: "https://www.linkedin.com/in/umang350/",
    guide: "https://topmate.io/thisumang", // TODO: confirm the Topmate product URL
}

export const hero = {
    badge: "Product Manager · Tokyo",
    headline: "I build global planning products",
    accent: "and AI tools people use.",
    sub: "Delhi → Tokyo → New York → Tokyo. I run supply chain and planning products at global scale, and ship my own tools on the side, like Anaplan Toolkit.",
}

export const heroJA = {
    badge: "プロダクトマネージャー · 東京",
    headline: "グローバルな計画プロダクトと、",
    accent: "本当に使われるAIツールを作っています。",
    sub: "デリー → 東京 → ニューヨーク → 東京。グローバル規模のサプライチェーン・計画プロダクトを担当し、Anaplan Toolkit などのツールも開発しています。",
}

export const proof = [
    { value: "$30M+", label: "lost sales recovered" },
    { value: "5% → 2%", label: "out-of-stock rate" },
    { value: "1B+", label: "rows migrated" },
    { value: "5M+", label: "views as a creator" },
]

export type Project = {
    title: string
    icon: "extension" | "chart" | "people" | "book" | "play"
    tag: string
    outcome: string
    href?: string
    cta?: string
    image?: string
    metric?: { value: string; label: string }
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
    },
    {
        title: "Inventory risk system",
        icon: "chart",
        tag: "Product · US, Canada & Europe",
        outcome: "Anomaly-driven inventory risk detection for a global retailer's digital supply chain.",
        href: "/about",
        cta: "Read more",
        metric: { value: "5% → 2%", label: "out-of-stock rate, $30M+ recovered" },
    },
    {
        title: "Network Lab",
        icon: "people",
        tag: "Community · Tokyo & New York",
        outcome: "A community I co-founded, with in-person meetups in Tokyo and New York.",
        href: links.linkedin,
        cta: "See the latest meetup",
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
    },
    {
        title: "Get Saged",
        icon: "play",
        tag: "YouTube",
        outcome: "Videos on careers, AI and life abroad.",
        href: "https://youtube.com/GetSaged",
        cta: "Watch",
    },
]

export type Testimonial = { quote: string; name: string; role: string }
// Add real quotes only.
export const testimonials: Testimonial[] = []

export const instagram = {
    handle: "@thisumang",
    pillars: ["Delhi / Tokyo life", "AI builds", "Company teardowns", "Cost of living", "Not getting scammed"],
    // Most viewed first; all of them run in the reels carousel, and `hero` ones also float in the hero.
    // Add each reel's own URL as `href` when you have it.
    reels: [
        { thumb: "/home/reel-cool-stories-27.jpg", views: "1.3M", title: "Cool stories start at 27" },
        { thumb: "/home/reel-ai-tools-daily.jpg", views: "1.2M", title: "AI tools I use daily" },
        { thumb: "/home/reel-first-principles.jpg", views: "906K", title: "First principles" },
        { thumb: "/home/reel-three-networking.jpg", views: "298K", title: "Three networking tips", hero: true },
        { thumb: "/home/reel-small-talk-hacks.jpg", views: "121K", title: "Small talk hacks", hero: true },
        { thumb: "/home/reel-mumbai-vs-new-york.jpg", views: "110K", title: "Mumbai vs New York expenses", hero: true },
        { thumb: "/home/reel-harvard.jpg", views: "31K", title: "This guy studied at Harvard" },
        { thumb: "/home/reel-never-have-i-ever-ai.jpg", views: "22.5K", title: "Never have I ever: AI edition" },
        { thumb: "/home/reel-fluent-japanese.jpg", views: "12.3K", title: "Fluent Japanese, obviously chopsticks" },
        { thumb: "/home/reel-10x-salary.jpg", views: "8.7K", title: "10x salary in 4 years" },
        { thumb: "/home/reel-camera-roll.jpg", views: "6.7K", title: "POV: you open my camera roll" },
    ] as Reel[],
    totalViews: "4M+",
}

export type Reel = { thumb: string; views: string; title: string; href?: string; hero?: boolean }
