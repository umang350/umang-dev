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
        tag: "Chrome & Firefox extension · Free",
        outcome: "A side panel with 22 reports on the Anaplan model you have open: action IDs, formulas, saved views, page filters and more. Search it, export it, stop clicking through blueprints.",
        href: "/anaplan",
        cta: "See the toolkit",
        image: "/anaplan/summary-panel.png",
        metric: { value: "★★★★★", label: "on the Chrome Web Store" },
    },
    {
        title: "Inventory risk system",
        tag: "Product · US, Canada & Europe",
        outcome: "Anomaly-driven inventory risk detection for a global retailer's digital supply chain.",
        href: "/about",
        cta: "Read more",
        metric: { value: "5% → 2%", label: "out-of-stock rate, $30M+ recovered" },
    },
    {
        title: "Network Lab",
        tag: "Community · Tokyo & New York",
        outcome: "A community I co-founded, with in-person meetups in Tokyo and New York.",
        href: links.linkedin,
        cta: "See the latest meetup",
    },
]

export const more: Project[] = [
    {
        title: "AI PM Guide",
        tag: "Guide",
        outcome: "A practical guide to product management with AI.",
        href: links.guide,
        cta: "Get the guide",
    },
    {
        title: "Get Saged",
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
    // Instagram reel URLs, best performer first, e.g. https://www.instagram.com/reel/XXXX/
    reels: [] as string[],
}
