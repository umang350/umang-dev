import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties, useEffect, useState } from "react";
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

// Positions are percentages of the hero panel on large screens, clear of the frame path.
const placed: { title: string; left: string; top: string; r: string; delay: string }[] = [
  { title: "Inventory risk system", left: "4%", top: "74%", r: "-6deg", delay: "0s" },
  { title: "Network Lab", left: "12%", top: "86%", r: "4deg", delay: "1.2s" },
  { title: "AI PM Guide", left: "91%", top: "60%", r: "-3deg", delay: "2.1s" },
  { title: "Get Saged", left: "80%", top: "62%", r: "6deg", delay: "0.6s" },
];

const reelSpots: { left: string; top: string; r: string; delay: string }[] = [
  { left: "7%", top: "38%", r: "-8deg", delay: "0.3s" },
  { left: "79%", top: "8%", r: "6deg", delay: "1.5s" },
  { left: "88%", top: "30%", r: "-4deg", delay: "0.9s" },
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

type Spot = { l: number; t: number };
// Where the sharp frame travels, as % of the panel. Each set keeps the frame clear of the floating items.
const frameSize = { lg: { w: 26, h: 56 }, sm: { w: 58, h: 40 } };
const frameSpots: { lg: Spot[]; sm: Spot[] } = {
  lg: [{ l: 37, t: 28 }, { l: 50, t: 16 }, { l: 25, t: 32 }],
  sm: [{ l: 21, t: 30 }, { l: 36, t: 24 }, { l: 8, t: 36 }],
};

// The photo fills the panel, blurred and tinted. A sharp copy of the same photo is clipped
// to a frame that glides to a new spot every few seconds, like a focus lens.
const FocusPhoto = () => {
  const [lg, setLg] = useState(true);
  const [i, setI] = useState(0);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const update = () => setLg(wide.matches);
    update();
    wide.addEventListener("change", update);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => wide.removeEventListener("change", update);
    const timer = window.setInterval(() => setI((n) => n + 1), 3500);
    return () => { wide.removeEventListener("change", update); window.clearInterval(timer); };
  }, []);

  const { w, h } = lg ? frameSize.lg : frameSize.sm;
  const spots = lg ? frameSpots.lg : frameSpots.sm;
  const { l, t } = spots[i % spots.length];
  const ease = "1.4s cubic-bezier(0.77, 0, 0.18, 1)";
  const photo = "scale-110 object-cover object-[50%_55%]";

  return (
    <>
      <Image src="/home/hero.jpg" alt="" fill priority sizes="100vw" className={`${photo} blur-xl`} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2aa8]/80 via-[#1450f0]/55 to-[#3d8bff]/40" aria-hidden="true" />
      <div className="absolute inset-0" style={{ clipPath: `inset(${t}% ${100 - l - w}% ${100 - t - h}% ${l}%)`, transition: `clip-path ${ease}` }}>
        <Image src="/home/hero.jpg" alt="Umang Chauhan" fill priority sizes="100vw" className={photo} />
      </div>
      <div className="pointer-events-none absolute z-10 border border-cream/80" aria-hidden="true"
        style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%`, transition: `left ${ease}, top ${ease}` }}>
        {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((pos) => (
          <span key={pos} className={`absolute h-2 w-2 bg-cream ${pos}`} />
        ))}
      </div>
    </>
  );
};

function Hero() {
  const projects = [...featured, ...more];
  const byTitle = (t: string) => projects.find((p) => p.title === t) as Project;
  const anaplan = byTitle("Anaplan Toolkit");

  return (
    <section className="w-full text-left">
      <div className="relative h-[560px] overflow-hidden rounded-[28px] bg-[#1450f0] text-cream lg:h-[min(780px,calc(100vh-110px))] lg:min-h-[620px]">
        <FocusPhoto />

        <h1 className="sr-only">Umang Chauhan, product manager in Tokyo</h1>
        <p aria-hidden="true" className="absolute left-5 top-5 z-20 font-display text-[22vw] uppercase leading-[0.85] lg:left-8 lg:top-8 lg:text-[168px]">Umang</p>
        <p aria-hidden="true" className="absolute bottom-5 right-5 z-20 font-display text-[19vw] uppercase leading-[0.85] lg:bottom-8 lg:right-8 lg:text-[168px]">Chauhan</p>

        {/* Large screens: work and reels float around the frame's path */}
        <div className="hidden lg:block">
          {instagram.reels.map((reel, i) => (
            <Float key={reel.thumb} href={reel.href ?? links.instagram} label={`${reel.title}, ${reel.views} views on Instagram`}
              style={{ left: reelSpots[i].left, top: reelSpots[i].top, ["--r" as string]: reelSpots[i].r, animationDelay: reelSpots[i].delay }}
              className="z-30 transition-transform hover:scale-105">
              <ReelCard reel={reel} className="h-[150px] w-[112px]" />
            </Float>
          ))}

          <Float href={anaplan.href} label={anaplan.title} style={{ left: "16%", top: "66%", ["--r" as string]: "8deg", animationDelay: "0.4s" }} className="z-30">
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-white shadow-2xl ring-4 ring-white/30">
              <Image src="/anaplan/icon.png" alt="" width={48} height={48} className="rounded-lg" />
            </span>
            <Tooltip p={anaplan} />
          </Float>

          {placed.map((spot) => {
            const p = byTitle(spot.title);
            return (
              <Float key={p.title} href={p.href} label={p.title} style={{ left: spot.left, top: spot.top, ["--r" as string]: spot.r, animationDelay: spot.delay }} className="z-30">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1450f0] shadow-xl ring-4 ring-white/25 transition-colors group-hover:bg-cream">
                  <ProjectIcon icon={p.icon} />
                </span>
                <Tooltip p={p} />
              </Float>
            );
          })}
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
