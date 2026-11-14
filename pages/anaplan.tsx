import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ToolkitShell from "@/components/anaplan/ToolkitShell";
import { HeroArt } from "@/components/anaplan/Viz";
import { guides } from "@/data/anaplan/guides";
import { guidesJa } from "@/data/anaplan/guides.ja";
import { landing, RoadmapStatus } from "@/data/anaplan/landing";

// Standalone landing page for the Anaplan Toolkit extension. Deliberately
// does not use the site's Page/Navbar/Footer so it can stand on its own.
// Every string lives in data/anaplan/landing.ts, in English and Japanese;
// /ja/anaplan renders the Japanese one.

const useT = () => {
    const { locale } = useRouter();
    return landing[locale === "ja" ? "ja" : "en"];
};

const chromeStoreUrl = "https://chromewebstore.google.com/detail/anaplan-toolkit/kbbgidpmmiechmccmmjpjkidihojdgnj";
const firefoxStoreUrl = "https://addons.mozilla.org/en-US/firefox/addon/anaplan-toolkit/";
const firefoxStoreUrlJa = "https://addons.mozilla.org/ja/firefox/addon/anaplan-toolkit/";

const version = "2.12";
const sponsorUrl = "https://github.com/sponsors/umang350";

const roadmapBadge: Record<RoadmapStatus, string> = {
    shipped: "bg-green-500/15 text-green-300",
    next: "bg-amber-500/15 text-amber-300",
    exploring: "bg-white/10 text-gray-300",
    not: "bg-red-500/15 text-red-300",
};

const shotSrc = ["/anaplan/summary.png", "/anaplan/02-modules.png", "/anaplan/03-line_items.png", "/anaplan/04-impact.png", "/anaplan/05-lint.png"];
const heroSrc = ["/anaplan/panel-summary.png", "/anaplan/panel-modules.png", "/anaplan/panel-line_items.png", "/anaplan/panel-impact.png", "/anaplan/panel-lint.png"];
const lockTone = ["bg-green-500/15 text-green-300", "bg-blue-500/15 text-blue-300", "bg-amber-500/15 text-amber-300", "bg-red-500/15 text-red-300", "bg-gray-500/20 text-gray-300"];

type Store = "chrome" | "firefox";

const storeLogo: Record<Store, string> = { chrome: "/anaplan/badges/chrome.svg", firefox: "/anaplan/badges/firefox.svg" };

const Dot = () => <span className="h-1.5 w-1.5 flex-none rounded-full bg-red-500" />;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">{children}</p>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">{children}</h2>
);

const card = "rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm";

const StoreButton = ({ store, tone = "light" }: { store: Store; tone?: "light" | "dark" }) => {
    const t = useT();
    const { locale } = useRouter();
    const s = t.stores[store];
    const url = store === "chrome" ? chromeStoreUrl : locale === "ja" ? firefoxStoreUrlJa : firefoxStoreUrl;
    const toneClass =
        tone === "light"
            ? "bg-white text-gray-900 hover:bg-gray-100 ring-white/40"
            : "bg-gray-900 text-white hover:bg-gray-800 ring-white/10";
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`group inline-flex h-14 min-w-[13rem] items-center gap-3 rounded-2xl px-4 shadow-lg ring-1 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${toneClass}`}
        >
            <Image src={storeLogo[store]} alt="" width={32} height={32} unoptimized className="h-8 w-8 flex-none" />
            <span className="flex flex-col text-left leading-tight">
                <span className={`text-[11px] font-medium ${tone === "light" ? "text-gray-500" : "text-gray-300"}`}>{s.eyebrow}</span>
                <span className="text-base font-semibold tracking-tight">{s.name}</span>
            </span>
        </a>
    );
};

const HeroCarousel = () => {
    const t = useT();
    const u = t.ui;
    const heroSlides = t.heroSlides.map((s, k) => ({ ...s, src: heroSrc[k] }));
    const [i, setI] = useState(0);
    const [hover, setHover] = useState(false);
    const [stopped, setStopped] = useState(false);
    const [reduced, setReduced] = useState(false);
    const n = heroSlides.length;

    React.useEffect(() => {
        setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    React.useEffect(() => {
        if (hover || stopped) return;
        const t = setTimeout(() => setI((x) => (x + 1) % n), 4500);
        return () => clearTimeout(t);
    }, [i, hover, stopped, n]);

    const go = (d: number) => setI((x) => (x + d + n) % n);

    return (
        <div
            className="relative mx-auto w-full max-w-md lg:mr-0"
            role="region"
            aria-roledescription="carousel"
            aria-label={u.carouselLabel}
        >
            <div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_40px_120px_-20px_rgba(244,63,94,0.35)]"
                style={{ aspectRatio: "1408 / 1948" }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
                onPointerLeave={() => setHover(false)}
            >
                {heroSlides.map((s, k) => (
                    <div
                        key={s.src}
                        className={`absolute inset-0 ${reduced ? "" : "transition-opacity duration-500"} ${k === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={u.slideOf(k + 1, n, s.caption)}
                        aria-hidden={k !== i}
                    >
                        <Image src={s.src} alt={s.alt} width={1408} height={1948} priority={k === 0} sizes="(min-width: 1024px) 28rem, 90vw" className="h-full w-full object-cover object-top" />
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
                <div className="relative min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-400">{heroSlides[i].caption}</span>
                        <span className="group">
                            <button
                                type="button"
                                aria-label={u.howHelpsAria(heroSlides[i].caption)}
                                aria-describedby="hero-hint"
                                className="flex h-4 w-4 items-center justify-center rounded-full border border-white/25 text-[10px] font-semibold leading-none text-gray-300 transition hover:border-red-400 hover:text-white focus:outline-none focus-visible:border-red-400 focus-visible:text-white"
                            >
                                ?
                            </button>
                            <span
                                id="hero-hint"
                                role="tooltip"
                                className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-white/15 bg-[#1a1a22] p-3 text-xs leading-relaxed text-gray-200 opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                            >
                                <b className="mb-1 block text-white">{u.howItHelps}</b>
                                {heroSlides[i].solves}
                            </span>
                        </span>
                    </div>
                    <div className="mt-1 text-sm font-semibold leading-snug text-white" aria-live="polite">{heroSlides[i].problem}</div>
                </div>
                <div className="flex flex-none items-center gap-2">
                    <button type="button" onClick={() => setStopped((v) => !v)} aria-label={stopped ? u.play : u.pause} aria-pressed={stopped} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[11px] text-gray-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400">{stopped ? "▶" : "❚❚"}</button>
                    <button type="button" onClick={() => go(-1)} aria-label={u.prev} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400">←</button>
                    <div className="flex items-center gap-1.5">
                        {heroSlides.map((s, k) => (
                            <button key={s.src} type="button" onClick={() => setI(k)} aria-label={u.show(s.caption)} title={s.problem} aria-current={k === i} className={`h-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${k === i ? "w-5 bg-red-500" : "w-1.5 bg-white/25 hover:bg-white/50"}`} />
                        ))}
                    </div>
                    <button type="button" onClick={() => go(1)} aria-label={u.next} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400">→</button>
                </div>
            </div>
        </div>
    );
};

const AnaplanToolkit = () => {
    const [tab, setTab] = useState(0);
    const { locale } = useRouter();
    const ja = locale === "ja";
    const t = useT();
    const u = t.ui;
    const { whatsNew, reportGroups, roadmap, faqs, steps, privacy, shortcuts, marquee } = t;
    const shots = t.shots.map((s, k) => ({ ...s, src: shotSrc[k] }));
    const reportCount = reportGroups.reduce((n, g) => n + g.items.length, 0);
    const group = reportGroups[tab];
    const home = ja ? "https://umang.dev/ja/anaplan" : "https://umang.dev/anaplan";

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
            url: home,
            inLanguage: ja ? "ja" : "en",
            image: "https://umang.dev/anaplan/summary.png",
            description: t.pageDesc,
            downloadUrl: [chromeStoreUrl, firefoxStoreUrl],
            installUrl: chromeStoreUrl,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Umang Chauhan", url: "https://umang.dev" },
            featureList: reportGroups.flatMap((g) => g.items.map((i) => i.name)),
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: ja ? "ja" : "en",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        },
    ];

    return (
        <ToolkitShell
            title={t.pageTitle}
            desc={t.pageDesc}
            path="/anaplan"
            ogImage="https://umang.dev/anaplan/summary.png"
            ogTitle={t.ogTitle}
            onLanding
            dark
            keywords={t.pageKeywords}
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
                            {u.badge} · v{version}
                        </span>
                        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
                            {ja ? "Anaplanに足りなかった" : "The side panel Anaplan"}{" "}
                            <span className={`bg-gradient-to-r from-red-400 via-red-500 to-orange-400 bg-clip-text text-transparent ${ja ? "inline-block" : ""}`}>{ja ? "サイドパネル。" : "is missing."}</span>
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
                            {u.heroLead}
                        </p>

                        <ul className="mt-6 grid gap-x-6 gap-y-2.5 text-[15px] text-gray-200 sm:grid-cols-2">
                            {u.heroPoints.map(([t, b]) => (
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
                            {u.heroNote}
                        </p>
                    </div>

                    <HeroCarousel />
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
                {u.stats(reportCount).map(([n, l]) => (
                    <div key={l}>
                        <div className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">{n}</div>
                        <div className="mx-auto mt-2 max-w-[13rem] text-sm leading-snug text-gray-400">{l}</div>
                    </div>
                ))}
            </section>

            {/* Bento: what's new */}
            <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 sm:px-6">
                <div className="max-w-2xl">
                    <Eyebrow>{u.newIn(version)}</Eyebrow>
                    <Heading>{u.featuresHeading}</Heading>
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
                    {/* Run, create, look */}
                    {[6, 7, 8].map((n) => (
                        <div key={n} className={`${card} p-7 lg:col-span-2`}>
                            <h3 className="text-xl font-semibold text-white">{whatsNew[n].title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-300">{whatsNew[n].body}</p>
                        </div>
                    ))}
                    {/* Used by */}
                    <div className={`${card} p-7 lg:col-span-6`}>
                        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
                            <div>
                                <h3 className="text-xl font-semibold text-white">{whatsNew[5].title}</h3>
                                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">{whatsNew[5].body}</p>
                            </div>
                            <a href="#reports" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200">
                                {u.browseAll(reportCount)}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Report explorer */}
            <section id="reports" className="scroll-mt-20 border-t border-white/10 bg-white/[0.02] py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-2xl">
                        <Eyebrow>{u.reportsEyebrow}</Eyebrow>
                        <Heading>{u.reportsHeading}</Heading>
                        <p className="mt-4 text-gray-300">
                            {u.reportsLead}
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
                        {u.reportPerks.map((t) => (
                            <li key={t} className="flex items-center gap-2.5"><Dot />{t}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Gallery */}
            <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
                <div className="max-w-2xl">
                    <Eyebrow>{u.galleryEyebrow}</Eyebrow>
                    <Heading>{u.galleryHeading}</Heading>
                    <p className="mt-4 text-gray-300">
                        {u.galleryLead}
                    </p>
                </div>
                <div className="mt-10 grid gap-5 md:grid-cols-6">
                    {shots.map((s, i) => (
                        <figure key={s.src} className={`group ${i < 2 ? "md:col-span-3" : "md:col-span-2"}`}>
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
                        <Eyebrow>{u.fxEyebrow}</Eyebrow>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">{u.fxHeading}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-gray-300">
                            {u.fxLead}
                        </p>
                        <ul className="mt-6 space-y-4">
                            {u.fxPoints.map(([t, b]) => (
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
                        <Eyebrow>{u.lockEyebrow}</Eyebrow>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">{u.lockHeading}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-gray-300">
                            {u.lockLead}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2 text-xs">
                            {u.lockStates.map((t, k) => (
                                <span key={t} className={`rounded-full px-3 py-1 font-medium ${lockTone[k]}`}>{t}</span>
                            ))}
                        </div>
                        <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl border border-white/10" style={{ minHeight: 220, maxHeight: 340 }}>
                            <Image
                                src="/anaplan/lock-monitor.png"
                                alt={u.lockAlt}
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
                    <Eyebrow>{u.howEyebrow}</Eyebrow>
                    <Heading>{u.howHeading}</Heading>
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
                            <h3 className="font-semibold text-white">{u.kbTitle}</h3>
                            <p className="mt-1 text-sm text-gray-400">
                                {ja ? (
                                    <>Anaplanのモデリング画面で使えます。macOSでは <kbd className="font-mono">⌘⌥</kbd>、WindowsとLinuxでは <kbd className="font-mono">Ctrl+Alt</kbd> です。</>
                                ) : (
                                    <>Inside the Anaplan modelling UI. <kbd className="font-mono">⌘⌥</kbd> on macOS, <kbd className="font-mono">Ctrl+Alt</kbd> on Windows and Linux.</>
                                )}
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">{u.kbCols[0]}</th>
                                        <th className="px-6 py-3 font-medium">{u.kbCols[1]}</th>
                                        <th className="px-6 py-3 font-medium">{u.kbCols[2]}</th>
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
                    <Eyebrow>{u.privacyEyebrow}</Eyebrow>
                    <Heading>{u.privacyHeading}</Heading>
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
                    {ja ? (
                        <>権限：<code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-gray-200">https://*.anaplan.com/*</code> へのアクセス、サイドパネル、ローカルストレージ。通知は、Lock Monitorの <em>Notify me</em> をオンにした場合にだけ求められます。詳しくは<Link href="/anaplan/toolkit/privacy" className="font-medium text-red-400 underline underline-offset-2 hover:text-red-300">プライバシーポリシー</Link>をご覧ください。</>
                    ) : (
                        <>Permissions: access to <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-gray-200">https://*.anaplan.com/*</code>, the side panel, and local storage, plus notifications only if you turn on the Lock Monitor&apos;s <em>Notify me</em>. Read the full{" "}
                    <Link href="/anaplan/toolkit/privacy" className="font-medium text-red-400 underline underline-offset-2 hover:text-red-300">privacy policy</Link>.</>
                    )}
                </p>
            </section>

            {/* Roadmap */}
            <section id="roadmap" className="scroll-mt-20 border-t border-white/10 bg-white/[0.02] py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-2xl">
                        <Eyebrow>{u.roadmapEyebrow}</Eyebrow>
                        <Heading>{u.roadmapHeading}</Heading>
                        <p className="mt-4 text-gray-300">{u.roadmapLead}</p>
                    </div>
                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {roadmap.map((r) => (
                            <div key={r.title} className={`${card} p-5 ${r.status === "not" ? "opacity-70" : ""}`}>
                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roadmapBadge[r.status]}`}>
                                    {t.roadmapLabels[r.status]}
                                </span>
                                <h3 className="mt-3 font-semibold text-white">{r.title}</h3>
                                <p className="mt-1 text-sm leading-relaxed text-gray-400">{r.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-sm text-gray-400">
                        {u.roadmapAsk}{" "}
                        <a href="mailto:contact@umang.dev?subject=Anaplan%20Toolkit%20roadmap" className="font-medium text-red-400 underline underline-offset-2 hover:text-red-300">{u.roadmapTell}</a>{ja ? "" : "."}
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-24 sm:px-6">
                <Eyebrow>FAQ</Eyebrow>
                <Heading>{u.faqHeading}</Heading>
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
            <section id="guides" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 sm:px-6">
                <Eyebrow>{u.guidesEyebrow}</Eyebrow>
                <Heading>{u.guidesHeading}</Heading>
                <p className="mt-4 text-gray-300">
                    {u.guidesLead}
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {guides.slice(0, 6).map((g) => (
                        <Link key={g.slug} href={`/anaplan/guides/${g.slug}`} className={`${card} group flex flex-col overflow-hidden transition hover:border-red-500/40 hover:bg-white/[0.06]`}>
                            <HeroArt kind={g.hero} label="" className="h-32" />
                            <div className="flex flex-1 flex-col p-5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-400">{ja ? guidesJa[g.slug].category : g.category}</p>
                                <p className="mt-2 font-semibold text-white">{ja ? guidesJa[g.slug].title : g.title}</p>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-300">{ja ? guidesJa[g.slug].desc : g.desc}</p>
                                <p className="mt-4 text-sm font-medium text-red-400">{u.readGuide}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <p className="mt-6">
                    <Link href="/anaplan/guides" className="text-sm font-medium text-red-400 underline underline-offset-2 hover:text-red-300">
                        {u.allGuides(guides.length)}
                    </Link>
                </p>
            </section>

            {/* Get it */}
            <section id="get" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 sm:px-6">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 px-6 py-16 text-center text-white sm:px-12">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
                    <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/20 blur-3xl" aria-hidden="true" />
                    <Image src="/anaplan/icon.png" alt="" width={72} height={72} className="relative mx-auto rounded-2xl ring-4 ring-white/25" />
                    <h2 className="relative mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">{u.getHeading}</h2>
                    <p className="relative mx-auto mt-4 max-w-xl text-red-50">
                        {u.getLead}
                    </p>
                    <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                        <StoreButton store="chrome" />
                        <StoreButton store="firefox" tone="dark" />
                    </div>
                    <p className="relative mt-6 text-sm text-red-50">
                        {u.sponsorQ}{" "}
                        <a href={sponsorUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-white underline underline-offset-2">{u.sponsorLink}</a>
                    </p>
                    <p className="relative mt-2 text-sm text-red-50">
                        {u.feedbackQ}{" "}
                        <a href="mailto:contact@umang.dev?subject=Anaplan%20Toolkit" className="font-medium text-white underline underline-offset-2">contact@umang.dev</a>
                        {" · "}
                        <Link href="/anaplan/toolkit/privacy" className="font-medium text-white underline underline-offset-2">{u.privacyPolicy}</Link>
                    </p>
                </div>
            </section>
        </ToolkitShell>
    );
};

export default AnaplanToolkit;
