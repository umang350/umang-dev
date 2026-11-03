import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
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

// Positions are percentages of the hero stage on large screens, over the sky on either side of the tower.
const placed: { title: string; left: string; top: string; r: string; delay: string }[] = [
  { title: "Inventory risk system", left: "5%", top: "72%", r: "-6deg", delay: "0s" },
  { title: "Network Lab", left: "15%", top: "84%", r: "4deg", delay: "1.2s" },
  { title: "AI PM Guide", left: "26%", top: "72%", r: "-3deg", delay: "2.1s" },
  { title: "Get Saged", left: "82%", top: "62%", r: "6deg", delay: "0.6s" },
];

const reelSpots: { left: string; top: string; r: string; delay: string }[] = [
  { left: "6%", top: "38%", r: "-8deg", delay: "0.3s" },
  { left: "83%", top: "15%", r: "6deg", delay: "1.5s" },
  { left: "89%", top: "37%", r: "-4deg", delay: "0.9s" },
];

// Each letter lifts and warms to the tower's amber as the cursor passes over it, then settles slowly.
const RaisedLetters = ({ text }: { text: string }) => (
  <>
    {text.split("").map((letter, i) => (
      <span key={i} className="inline-block transition-[transform,color] duration-700 ease-out hover:-translate-y-[0.12em] hover:text-[#f5b041] hover:duration-150">
        {letter}
      </span>
    ))}
  </>
);

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
    <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/65 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
      {reel.views}
    </span>
  </span>
);

// The Paris clip fills the hero. Its first and last frames differ, so two copies take turns:
// the next one fades in over the last moments of the current one. Reduced motion keeps the poster.
const LOOP_START = 0;
const FADE = 0.8;

const BackgroundVideo = ({ className }: { className: string }) => {
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [front, setFront] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const videos = refs.map((r) => r.current as HTMLVideoElement);
    let current = 0;
    let fading = false;
    let raf = 0;
    let timer = 0;

    videos[0].currentTime = LOOP_START;
    videos[0].play().catch(() => {});

    const tick = () => {
      const v = videos[current];
      if (!fading && v.duration && v.currentTime >= v.duration - FADE) {
        fading = true;
        const next = videos[1 - current];
        next.currentTime = LOOP_START;
        next.play().catch(() => {});
        current = 1 - current;
        setFront(current);
        timer = window.setTimeout(() => { v.pause(); fading = false; }, FADE * 1000 + 100);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {refs.map((ref, i) => (
        <video key={i} ref={ref} muted playsInline preload="auto" poster="/home/paris-v2-poster.jpg" aria-hidden="true"
          className={className} style={{ opacity: front === i ? 1 : 0, transition: `opacity ${FADE}s ease-in-out` }}>
          <source media="(max-width: 767px)" src="/home/paris-v2-540.mp4" type="video/mp4" />
          <source src="/home/paris-v2-720.mp4" type="video/mp4" />
        </video>
      ))}
    </>
  );
};

function Hero() {
  const projects = [...featured, ...more];
  const byTitle = (t: string) => projects.find((p) => p.title === t) as Project;
  const anaplan = byTitle("Anaplan Toolkit");

  return (
    <section className="-mt-5 w-full text-left">
      <div className="relative ml-[calc(50%-50vw)] h-[620px] w-screen overflow-hidden bg-[#1450f0] text-cream lg:h-[min(860px,100vh)] lg:min-h-[660px]">
        <Image src="/home/paris-v2-poster.jpg" alt="Umang Chauhan in front of the Eiffel Tower" fill priority sizes="100vw" className="object-cover object-[60%_50%] lg:object-center" />
        <BackgroundVideo className="absolute inset-0 h-full w-full object-cover object-[60%_50%] lg:object-center" />
        {/* Deepens the sky behind the name so the cream type stays readable */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true"
          style={{ background: "linear-gradient(90deg, rgba(10,30,110,0.45), rgba(10,30,110,0) 45%), linear-gradient(0deg, rgba(10,20,60,0.4), rgba(10,20,60,0) 35%)" }} />

        {/* Keeps the overlaid nav readable */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[15] h-28 [background:linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0))]" aria-hidden="true" />

        <div className="relative mx-auto h-full max-w-[1600px]">
          <h1 className="sr-only">Umang Chauhan, product manager in Tokyo</h1>
          <p aria-hidden="true" className="absolute left-5 top-20 z-20 cursor-default select-none font-display text-[22vw] uppercase leading-[0.85] [text-shadow:0_4px_40px_rgba(0,0,0,0.35)] lg:left-8 lg:top-24 lg:text-[168px]"><RaisedLetters text="Umang" /></p>
          <p aria-hidden="true" className="absolute bottom-5 right-5 z-20 cursor-default select-none font-display text-[19vw] uppercase leading-[0.85] [text-shadow:0_4px_40px_rgba(0,0,0,0.35)] lg:bottom-8 lg:right-8 lg:text-[168px]"><RaisedLetters text="Chauhan" /></p>

          {/* Large screens: work and reels float over the sky on either side of the tower */}
          <div className="hidden lg:block">
            {instagram.reels.filter((r) => r.hero).map((reel, i) => (
              <Float key={reel.thumb} href={reel.href ?? links.instagram} label={`${reel.title}, ${reel.views} views on Instagram`}
                style={{ left: reelSpots[i].left, top: reelSpots[i].top, ["--r" as string]: reelSpots[i].r, animationDelay: reelSpots[i].delay }}
                className="z-30 transition-transform hover:scale-105">
                <ReelCard reel={reel} className="h-[150px] w-[112px]" />
              </Float>
            ))}

            <Float href={anaplan.href} label={anaplan.title} style={{ left: "21%", top: "54%", ["--r" as string]: "8deg", animationDelay: "0.4s" }} className="z-30">
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
