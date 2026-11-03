import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties } from "react";
import { featured, instagram, links, more, Project } from "@/data/content/home";

export const ProjectIcon = ({ icon, className = "h-5 w-5" }: { icon: Project["icon"]; className?: string }) => {
  const paths: Record<Project["icon"], React.ReactNode> = {
    extension: <path d="M14 4a2 2 0 1 1 4 0v2h3v5h-2a2 2 0 1 0 0 4h2v5h-5v-2a2 2 0 1 0-4 0v2H7v-5H5a2 2 0 1 1 0-4h2V6h7V4z" />,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
    people: <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 10v-1a6 6 0 0 1 12 0v1M17 11a3 3 0 1 0 0-6M22 21v-1a5 5 0 0 0-4-4.9" />,
    book: <path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2V5zm0 16a2 2 0 0 1 2-2h14v2H6" />,
    play: <path d="M2 7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7zm8 1.5v7l6-3.5-6-3.5z" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[icon]}
    </svg>
  );
};

// Positions are percentages of the hero panel on large screens.
const placed: { title: string; left: string; top: string; r: string; delay: string }[] = [
  { title: "Inventory risk system", left: "6%", top: "58%", r: "-6deg", delay: "0s" },
  { title: "Network Lab", left: "15%", top: "80%", r: "4deg", delay: "1.2s" },
  { title: "AI PM Guide", left: "29%", top: "70%", r: "-3deg", delay: "2.1s" },
  { title: "Get Saged", left: "89%", top: "50%", r: "6deg", delay: "0.6s" },
];

const reelSpots: { left: string; top: string; r: string; delay: string }[] = [
  { left: "17%", top: "34%", r: "-8deg", delay: "0.3s" },
  { left: "63%", top: "9%", r: "6deg", delay: "1.5s" },
  { left: "76%", top: "22%", r: "-4deg", delay: "0.9s" },
];

const Tooltip = ({ p }: { p: Project }) => (
  <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-60 -translate-x-1/2 translate-y-1 rounded-xl bg-white p-3 text-left text-black opacity-0 shadow-2xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
    <span className="block text-[11px] font-medium uppercase tracking-wider text-gray-500">{p.tag}</span>
    <span className="mt-0.5 block font-semibold">{p.title}</span>
    <span className="mt-1 block text-xs leading-snug text-gray-600">{p.metric ? `${p.metric.value} ${p.metric.label}` : p.outcome}</span>
  </span>
);

const Float = ({ href, label, style, className, children }: { href?: string; label: string; style: CSSProperties; className: string; children: React.ReactNode }) => {
  const props = { "aria-label": label, style, className: `float-drift group absolute z-20 ${className}` };
  if (!href) return <span {...props}>{children}</span>;
  return href.startsWith("/")
    ? <Link href={href} {...props}>{children}</Link>
    : <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
};

const ReelCard = ({ reel, className = "" }: { reel: typeof instagram.reels[number]; className?: string }) => (
  <span className={`relative block overflow-hidden rounded-xl border-2 border-white/80 shadow-2xl ${className}`}>
    <Image src={reel.thumb} alt={reel.title} fill sizes="160px" className="object-cover" />
    <span className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/80 to-transparent px-2 pb-1.5 pt-6 text-xs font-semibold text-white">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
      {reel.views}
    </span>
  </span>
);

const Portrait = ({ className }: { className: string }) => (
  <div className={className}>
    <div className="absolute -inset-3 border border-cream/70" aria-hidden="true">
      {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((pos) => (
        <span key={pos} className={`absolute h-2 w-2 bg-cream ${pos}`} />
      ))}
    </div>
    <div className="relative h-full w-full overflow-hidden">
      <Image src="/home/portrait.jpg" alt="Umang Chauhan" fill priority sizes="300px" className="object-cover object-top" />
    </div>
  </div>
);

function Hero() {
  const projects = [...featured, ...more];
  const byTitle = (t: string) => projects.find((p) => p.title === t) as Project;
  const anaplan = byTitle("Anaplan Toolkit");

  return (
    <section className="w-full text-left">
      <div className="relative flex flex-col overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0a2aa8] via-[#1450f0] to-[#3d8bff] text-cream lg:block lg:h-[680px]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

        <h1 className="sr-only">Umang Chauhan, product manager in Tokyo</h1>
        <p aria-hidden="true" className="relative z-10 order-1 px-6 pt-6 font-display text-[22vw] uppercase leading-[0.85] lg:absolute lg:left-8 lg:top-8 lg:p-0 lg:text-[168px]">Umang</p>
        <p aria-hidden="true" className="relative z-10 order-3 px-6 pb-6 text-right font-display text-[18vw] uppercase leading-[0.85] lg:absolute lg:bottom-8 lg:right-8 lg:p-0 lg:text-[168px]">Chauhan</p>

        {/* Large screens: everything floats around the portrait */}
        <div className="hidden lg:block">
          <Portrait className="absolute left-1/2 top-1/2 z-10 h-[340px] w-[290px] -translate-x-1/2 -translate-y-1/2" />

          {instagram.reels.map((reel, i) => (
            <Float key={reel.thumb} href={reel.href ?? links.instagram} label={`${reel.title}, ${reel.views} views on Instagram`}
              style={{ left: reelSpots[i].left, top: reelSpots[i].top, ["--r" as string]: reelSpots[i].r, animationDelay: reelSpots[i].delay }}
              className="transition-transform hover:scale-105">
              <ReelCard reel={reel} className="h-[150px] w-[112px]" />
            </Float>
          ))}

          <Float href={anaplan.href} label={anaplan.title} style={{ left: "67%", top: "50%", ["--r" as string]: "8deg", animationDelay: "0.4s" }} className="">
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-white shadow-2xl ring-4 ring-white/30">
              <Image src="/anaplan/icon.png" alt="" width={48} height={48} className="rounded-lg" />
            </span>
            <Tooltip p={anaplan} />
          </Float>

          {placed.map((spot) => {
            const p = byTitle(spot.title);
            return (
              <Float key={p.title} href={p.href} label={p.title} style={{ left: spot.left, top: spot.top, ["--r" as string]: spot.r, animationDelay: spot.delay }} className="">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1450f0] shadow-xl ring-4 ring-white/25 transition-colors group-hover:bg-cream">
                  <ProjectIcon icon={p.icon} />
                </span>
                <Tooltip p={p} />
              </Float>
            );
          })}
        </div>

        {/* Small screens: the same pieces, stacked */}
        <div className="relative order-2 px-6 py-8 lg:hidden">
          <div className="relative mx-auto h-[300px] w-[250px]">
            <Portrait className="relative h-full w-full" />
            <a href={links.instagram} target="_blank" rel="noreferrer" aria-label={`${instagram.reels[0].title} on Instagram`}
              className="float-drift absolute -left-10 top-6 z-20" style={{ ["--r" as string]: "-8deg" } as CSSProperties}>
              <ReelCard reel={instagram.reels[0]} className="h-[110px] w-[82px]" />
            </a>
            <Link href="/anaplan" aria-label="Anaplan Toolkit"
              className="float-drift absolute -right-6 bottom-4 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-2xl" style={{ ["--r" as string]: "8deg" } as CSSProperties}>
              <Image src="/anaplan/icon.png" alt="" width={36} height={36} className="rounded-md" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 px-1 lg:grid-cols-[1fr_auto] lg:items-end">
        <p className="max-w-2xl text-lg leading-relaxed text-black dark:text-white sm:text-xl">
          Product manager in Tokyo. I build global planning products, and AI tools people actually use. Delhi → Tokyo → New York → Tokyo.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#work" className="rounded-full bg-[#1450f0] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">View work</a>
          <a href={links.cv} download className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-black transition-colors hover:border-gray-500 dark:border-white/20 dark:text-white dark:hover:border-white/50">Download CV</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
