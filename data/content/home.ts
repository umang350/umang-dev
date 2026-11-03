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
    kicker: "Hey, I'm Umang.",
    headline: "I build global planning products in Tokyo, and AI tools people actually use.",
    sub: "Delhi → Tokyo → NYC. Product manager for supply chain and planning platforms across 3 continents, builder of Anaplan Toolkit, co-founder of Network Lab.",
}

export const proof = [
    { value: "$30M+", label: "lost sales recovered" },
    { value: "5% → 2%", label: "out-of-stock rate" },
    { value: "1B+", label: "rows migrated" },
    { value: "5M+", label: "creator views" },
]

export type Project = {
    title: string
    outcome: string
    href?: string
    cta?: string
    image?: string
}

export const featured: Project[] = [
    {
        title: "Anaplan Toolkit",
        outcome: "Free Chrome & Firefox side panel with 22 reports on the Anaplan model you have open. Rated 5 stars.",
        href: "/anaplan",
        cta: "See the toolkit",
        image: "/anaplan/summary.png",
    },
    {
        title: "Global planning platform",
        outcome: "Anomaly-driven inventory risk system across US, Canada and Europe: out-of-stock 5% → 2%, $30M+ in lost sales recovered.",
        href: "/about",
        cta: "Read the story",
    },
    {
        title: "Network Lab",
        outcome: "A community I co-founded, with meetups in Tokyo and New York.",
        href: links.linkedin,
        cta: "Follow the latest",
    },
]

export const more: Project[] = [
    {
        title: "AI PM Guide",
        outcome: "A practical guide to product management with AI.",
        href: links.guide,
        cta: "Get the guide",
    },
    {
        title: "Get Saged",
        outcome: "My YouTube channel on careers, AI and life abroad.",
        href: "https://youtube.com/GetSaged",
        cta: "Watch",
    },
]

export type Testimonial = { quote: string; name: string; role: string }
// Add real quotes only.
export const testimonials: Testimonial[] = []

export const instagram = {
    handle: "@thisumang",
    pillars: ["Delhi / Tokyo life", "AI builds", "Company teardowns", "Cost of life and not getting scammed"],
    // Instagram reel URLs, best performer first, e.g. https://www.instagram.com/reel/XXXX/
    reels: [] as string[],
}
