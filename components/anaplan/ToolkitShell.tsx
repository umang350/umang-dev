import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

// Header, footer and head tags shared by every page under /anaplan. These
// pages deliberately don't use the site's Page/Navbar/Footer so the
// Anaplan Toolkit area can stand on its own.

type Props = {
    title: string;
    ogTitle?: string; // defaults to title
    desc: string;
    path: string; // e.g. "/anaplan" - used for og:url
    ogImage?: string;
    // On the landing page the nav jumps to sections in place; elsewhere it
    // links back to them on /anaplan.
    onLanding?: boolean;
    keywords?: string;
    // Structured data, rendered as application/ld+json.
    jsonLd?: object[];
    noindex?: boolean;
    ogType?: "website" | "article";
    // Dark chrome for the landing page.
    dark?: boolean;
    // False when the page has no Japanese version (the guide articles): under
    // /ja it then names the English URL as canonical and lists no alternates.
    translated?: boolean;
    children: React.ReactNode;
};

// Japanese has no spaces to break lines at: break headings between phrases
// where the browser can (auto-phrase), and loosen the tight Latin leading.
const jaType = "[&_h1]:[word-break:auto-phrase] [&_h2]:[word-break:auto-phrase] [&_h3]:[word-break:auto-phrase] [&_h1]:!leading-[1.2] [&_h2]:!leading-[1.25]";

const ToolkitShell = ({ title, ogTitle, desc, path, ogImage, onLanding = false, keywords, jsonLd, noindex = false, ogType = "website", dark = false, translated = true, children }: Props) => {
    const base = onLanding ? "" : "/anaplan";
    const ja = useRouter().locale === "ja";
    const enUrl = `https://umang.dev${path}`;
    const jaUrl = `https://umang.dev/ja${path}`;
    const pageUrl = ja && translated ? jaUrl : enUrl;
    const nav = ja
        ? { reports: "レポート", how: "使い方", roadmap: "ロードマップ", guides: "ガイド", faq: "FAQ", privacy: "プライバシー", sponsor: "♥ 支援する", get: "入手する", policy: "プライバシーポリシー", sponsorFoot: "支援する", disclaimer: "Anaplan Toolkit は独立したツールであり、Anaplan, Inc. との提携、同社による承認や後援を受けたものではありません。" }
        : { reports: "Reports", how: "How it works", roadmap: "Roadmap", guides: "Guides", faq: "FAQ", privacy: "Privacy", sponsor: "♥ Sponsor", get: "Get it", policy: "Privacy policy", sponsorFoot: "Sponsor", disclaimer: "Anaplan Toolkit is an independent tool and is not affiliated with, endorsed by, or sponsored by Anaplan, Inc." };
    return (
        <div className={`min-h-screen w-full antialiased ${ja ? jaType : ""} ${dark ? "bg-[#09090d] text-gray-100" : "bg-white text-gray-900"}`}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" href="/anaplan/icon.png" />
                <link rel="canonical" href={pageUrl} />
                {translated && <link rel="alternate" hrefLang="en" href={enUrl} />}
                {translated && <link rel="alternate" hrefLang="ja" href={jaUrl} />}
                {translated && <link rel="alternate" hrefLang="x-default" href={enUrl} />}
                {keywords && <meta name="keywords" content={keywords} />}
                <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
                <meta name="author" content="Umang Chauhan" />
                <meta property="og:site_name" content="Anaplan Toolkit" />
                <meta property="og:locale" content={ja && translated ? "ja_JP" : "en_US"} />
                {translated && <meta property="og:locale:alternate" content={ja ? "en_US" : "ja_JP"} />}
                <meta property="og:type" content={ogType} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={ogTitle ?? title} />
                <meta property="og:description" content={desc} />
                {ogImage && <meta property="og:image" content={ogImage} />}
                <meta name="twitter:title" content={ogTitle ?? title} />
                <meta name="twitter:description" content={desc} />
                {ogImage && <meta name="twitter:image" content={ogImage} />}
                <meta name="twitter:card" content={ogImage ? "summary_large_image" : "summary"} />
                <meta name="theme-color" content={dark ? "#09090d" : "#ffffff"} />
                {jsonLd?.map((d, i) => (
                    <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
                ))}
            </Head>

            <header className={`sticky top-0 z-30 border-b backdrop-blur ${dark ? "border-white/10 bg-[#09090d]/70" : "border-gray-200/70 bg-white/80"}`}>
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
                    <Link href={onLanding ? "#top" : "/anaplan"} className="flex items-center gap-2.5">
                        <Image src="/anaplan/icon.png" alt="" width={28} height={28} className="rounded-md" />
                        <span className="text-[15px] font-semibold tracking-tight">Anaplan Toolkit</span>
                    </Link>
                    <nav className={`hidden items-center gap-7 text-sm md:flex ${dark ? "text-gray-400 [&_a:hover]:text-white" : "text-gray-600"}`}>
                        <Link href={`${base}#reports`} className="hover:text-gray-900">{nav.reports}</Link>
                        <Link href={`${base}#how`} className="hover:text-gray-900">{nav.how}</Link>
                        <Link href={`${base}#roadmap`} className="hover:text-gray-900">{nav.roadmap}</Link>
                        <Link href={`${base}#guides`} className="hover:text-gray-900">{nav.guides}</Link>
                        <Link href={`${base}#faq`} className="hover:text-gray-900">{nav.faq}</Link>
                        <Link href={`${base}#privacy`} className="hover:text-gray-900">{nav.privacy}</Link>
                        <a href="https://github.com/sponsors/umang350" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">{nav.sponsor}</a>
                    </nav>
                    <div className="flex items-center gap-3">
                        {(translated || ja) && (
                            <Link href={path} locale={ja ? "en" : "ja"} hrefLang={ja ? "en" : "ja"} lang={ja ? "en" : "ja"} className={`text-sm font-medium ${dark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
                                {ja ? "English" : "日本語"}
                            </Link>
                        )}
                        <Link href={`${base}#get`} className={`rounded-lg px-3.5 py-2 text-sm font-medium ${dark ? "bg-white text-gray-900 hover:bg-gray-200" : "bg-gray-900 text-white hover:bg-gray-700"}`}>
                            {nav.get}
                        </Link>
                    </div>
                </div>
            </header>

            <main id="top">{children}</main>

            <footer className={`border-t ${dark ? "border-white/10 [&_a:hover]:text-white" : "border-gray-200"}`}>
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between">
                    <p>
                        © 2026 Umang Chauhan · <a href="https://umang.dev" className="hover:text-gray-800">umang.dev</a>
                        {" · "}
                        <Link href="/anaplan/toolkit/privacy" className="hover:text-gray-800">{nav.policy}</Link>
                        {" · "}
                        <a href="https://github.com/sponsors/umang350" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">{nav.sponsorFoot}</a>
                    </p>
                    <p className="max-w-xl md:text-right">
                        {nav.disclaimer}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ToolkitShell;
