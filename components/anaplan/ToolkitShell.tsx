import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
    children: React.ReactNode;
};

const ToolkitShell = ({ title, ogTitle, desc, path, ogImage, onLanding = false, children }: Props) => {
    const base = onLanding ? "" : "/anaplan";
    return (
        <div className="min-h-screen w-full bg-white text-gray-900 antialiased">
            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" href="/anaplan/icon.png" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://umang.dev${path}`} />
                <meta property="og:title" content={ogTitle ?? title} />
                <meta property="og:description" content={desc} />
                {ogImage && <meta property="og:image" content={ogImage} />}
                <meta name="twitter:card" content={ogImage ? "summary_large_image" : "summary"} />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <header className="sticky top-0 z-20 border-b border-gray-200/70 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
                    <Link href={onLanding ? "#top" : "/anaplan"} className="flex items-center gap-2.5">
                        <Image src="/anaplan/icon.png" alt="" width={28} height={28} className="rounded-md" />
                        <span className="text-[15px] font-semibold tracking-tight">Anaplan Toolkit</span>
                    </Link>
                    <nav className="hidden items-center gap-7 text-sm text-gray-600 md:flex">
                        <Link href={`${base}#reports`} className="hover:text-gray-900">Reports</Link>
                        <Link href={`${base}#how`} className="hover:text-gray-900">How it works</Link>
                        <Link href={`${base}#privacy`} className="hover:text-gray-900">Privacy</Link>
                    </nav>
                    <Link href={`${base}#get`} className="rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-gray-700">
                        Get it
                    </Link>
                </div>
            </header>

            <main id="top">{children}</main>

            <footer className="border-t border-gray-200">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between">
                    <p>
                        © 2026 Umang Chauhan · <a href="https://umang.dev" className="hover:text-gray-800">umang.dev</a>
                        {" · "}
                        <Link href="/anaplan/toolkit/privacy" className="hover:text-gray-800">Privacy policy</Link>
                    </p>
                    <p className="max-w-xl md:text-right">
                        Anaplan Toolkit is an independent tool and is not affiliated with, endorsed by, or sponsored by Anaplan, Inc.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ToolkitShell;
