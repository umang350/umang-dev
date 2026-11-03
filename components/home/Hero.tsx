import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { copy, featured, instagram, links, more, Project } from "@/data/content/home";

// Each project gets a mark you can recognise at a glance: the brand's own glyph where there is one.
const marks: Record<Project["icon"], { filled?: boolean; color?: string; node: React.ReactNode }> = {
  extension: { node: <path d="M14 4a2 2 0 1 1 4 0v2h3v5h-2a2 2 0 1 0 0 4h2v5h-5v-2a2 2 0 1 0-4 0v2H7v-5H5a2 2 0 1 1 0-4h2V6h7V4z" /> },
  // Inventory risk system: a parcel
  chart: { node: <path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3.3 7.5L12 12.5l8.7-5M12 22V12.5M7.5 5.3l9 5.1" /> },
  // Network Lab: LinkedIn "in"
  people: { filled: true, color: "#0a66c2", node: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /> },
  // AI PM Guide: sparkles
  book: { filled: true, node: <path d="M10 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6zM19 14l.9 2.6L22.5 17.5l-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" /> },
  // Get Saged: YouTube
  play: { filled: true, color: "#ff0000", node: <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" /> },
};

export const ProjectIcon = ({ icon, className = "h-5 w-5" }: { icon: Project["icon"]; className?: string }) => {
  const { node, filled, color } = marks[icon];
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : undefined} aria-hidden="true">
      {node}
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
  { left: "5%", top: "34%", r: "-7deg", delay: "0.3s" },
  { left: "80%", top: "11%", r: "6deg", delay: "1.5s" },
  { left: "88%", top: "46%", r: "-4deg", delay: "0.9s" },
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

const Tooltip = ({ p, ja }: { p: Project; ja: boolean }) => {
  const tag = ja ? p.ja.tag : p.tag;
  const metricLabel = p.metric && (ja ? p.ja.metricLabel ?? p.metric.label : p.metric.label);
  const detail = p.metric ? `${p.metric.value} ${metricLabel}` : ja ? p.ja.outcome : p.outcome;
  return (
    <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-60 -translate-x-1/2 translate-y-1 rounded-xl bg-white p-3 text-left text-black opacity-0 shadow-2xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
      <span className="block text-[11px] font-medium uppercase tracking-wider text-gray-500">{tag}</span>
      <span className="mt-0.5 block font-semibold">{p.title}</span>
      <span className="mt-1 block text-xs leading-snug text-gray-600">{detail}</span>
    </span>
  );
};

const Float = ({ href, label, style, className, children }: { href?: string; label: string; style: CSSProperties; className: string; children: React.ReactNode }) => {
  const props = { "aria-label": label, style, className: `float-drift group absolute z-20 ${className}` };
  if (!href) return <span {...props}>{children}</span>;
  return href.startsWith("/")
    ? <Link href={href} {...props}>{children}</Link>
    : <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
};

const ReelCard = ({ reel, className = "" }: { reel: typeof instagram.reels[number]; className?: string }) => (
  <span className={`relative block overflow-hidden rounded-2xl bg-black shadow-[0_18px_40px_rgba(0,10,60,0.45)] ring-[3px] ring-white/90 ${className}`}>
    <Image src={reel.thumb} alt={reel.title} fill sizes="200px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
    <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" aria-hidden="true" />
    <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="white" className="ml-0.5 h-5 w-5"><path d="M7 4.5v15l13-7.5-13-7.5z" /></svg>
    </span>
    <span className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-sm font-bold leading-none text-white drop-shadow">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true"><path d="M7 4.5v15l13-7.5-13-7.5z" /></svg>
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

// Local time in Tokyo, filled in after mount so server and browser renders match.
const TokyoTime = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo" });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return <span className="tabular-nums">{time ?? "--:--"}</span>;
};

const StatusRow = ({ t }: { t: typeof copy.en }) => (
  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 px-1 text-base text-gray-700 dark:text-white/80 sm:text-lg">
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" />
      </svg>
      {t.based}
    </span>
    <span className="hidden h-4 w-px bg-gray-300 dark:bg-white/20 sm:block" aria-hidden="true" />
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
      </svg>
      <span><TokyoTime /> JST</span>
    </span>
    <span className="hidden h-4 w-px bg-gray-300 dark:bg-white/20 sm:block" aria-hidden="true" />
    <a href={`mailto:${links.email}`} className="inline-flex items-center gap-2.5 underline-offset-4 hover:underline">
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
      </span>
      {t.open}
    </a>
  </div>
);

function Hero() {
  const projects = [...featured, ...more];
  const byTitle = (t: string) => projects.find((p) => p.title === t) as Project;
  const anaplan = byTitle("Anaplan Toolkit");
  const { locale } = useRouter();
  const ja = locale === "ja";
  const t = copy[ja ? "ja" : "en"];
  // Katakana is full-width and Anton has no Japanese glyphs, so the Japanese name uses Dela Gothic One, set smaller.
  const nameFont = ja ? "font-display-ja leading-none lg:text-[128px]" : "font-display uppercase leading-[0.85] lg:text-[168px]";
  const [firstSize, lastSize] = ja ? ["text-[18vw]", "text-[16vw]"] : ["text-[22vw]", "text-[19vw]"];

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
          <h1 className="sr-only">{t.heading}</h1>
          <p aria-hidden="true" className={`absolute left-5 top-20 z-20 cursor-default select-none [text-shadow:0_4px_40px_rgba(0,0,0,0.35)] lg:left-8 lg:top-24 ${firstSize} ${nameFont}`}><RaisedLetters text={t.firstName} /></p>
          <p aria-hidden="true" className={`absolute bottom-5 right-5 z-20 cursor-default select-none [text-shadow:0_4px_40px_rgba(0,0,0,0.35)] lg:bottom-8 lg:right-8 ${lastSize} ${nameFont}`}><RaisedLetters text={t.lastName} /></p>

          {/* Large screens: work and reels float over the sky on either side of the tower */}
          <div className="hidden lg:block">
            {instagram.reels.filter((r) => r.hero).map((reel, i) => (
              <Float key={reel.thumb} href={reel.href ?? links.instagram} label={`${reel.title}, ${reel.views} views on Instagram`}
                style={{ left: reelSpots[i].left, top: reelSpots[i].top, ["--r" as string]: reelSpots[i].r, animationDelay: reelSpots[i].delay }}
                className="z-30 transition-transform hover:scale-105">
                <ReelCard reel={reel} className="h-[190px] w-[134px]" />
              </Float>
            ))}

            <Float href={anaplan.href} label={anaplan.title} style={{ left: "21%", top: "54%", ["--r" as string]: "8deg", animationDelay: "0.4s" }} className="z-30">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-white shadow-2xl ring-4 ring-white/30">
                <Image src="/anaplan/logo-a.png" alt="" width={44} height={44} />
              </span>
              <Tooltip p={anaplan} ja={ja} />
            </Float>

            {placed.map((spot) => {
              const p = byTitle(spot.title);
              return (
                <Float key={p.title} href={p.href} label={p.title} style={{ left: spot.left, top: spot.top, ["--r" as string]: spot.r, animationDelay: spot.delay }} className="z-30">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1450f0] shadow-xl ring-4 ring-white/25 transition-colors group-hover:bg-cream">
                    <ProjectIcon icon={p.icon} className="h-8 w-8" />
                  </span>
                  <Tooltip p={p} ja={ja} />
                </Float>
              );
            })}
          </div>
        </div>
      </div>

      <StatusRow t={t} />
    </section>
  );
}

export default Hero;
