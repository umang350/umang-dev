import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { CSSProperties, useEffect, useRef } from "react";
import type { Post } from "@/lib/substack";
import { copy, instagram, links, Reel, Stop, testimonials, work, WorkPill, youtube } from "@/data/content/home";

const panel = "rounded-[28px] bg-[#141414] text-white ring-1 ring-white/5";

type Copy = typeof copy.en;

// Anton has no Japanese glyphs, so Japanese headings use Dela Gothic One, an equally heavy display face.
const displayFont = (ja: boolean) => (ja ? "font-display-ja" : "font-display uppercase");

const Panel = ({ id, label, ja, children }: { id?: string; label: string; ja: boolean; children: React.ReactNode }) => (
  <section id={id} className={`${panel} mt-6 scroll-mt-24 p-8 sm:p-12`}>
    <h2 className={`${displayFont(ja)} text-[clamp(40px,6vw,72px)] leading-[0.95]`}>{label}</h2>
    <div className="mt-8">{children}</div>
  </section>
);

// The endless strips only animate while on screen, so three of them never run at once off-screen.
const Strip = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => { el.dataset.off = e.isIntersecting ? "" : "1"; }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="reel-strip mt-8 overflow-hidden">{children}</div>;
};

const brandColor = { instagram: "#e1306c", youtube: "#ff0000", substack: "#ff6719" };

// Small platform marks for the section eyebrows.
const BrandIcon = ({ name }: { name: keyof typeof brandColor }) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
    {name === "instagram" && (
      <g fill="none" stroke={brandColor.instagram} strokeWidth={2}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill={brandColor.instagram} stroke="none" />
      </g>
    )}
    {name === "youtube" && (
      <>
        <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill={brandColor.youtube} />
        <path d="M10 8.7v6.6l5.6-3.3z" fill="#fff" />
      </>
    )}
    {name === "substack" && (
      <g fill={brandColor.substack}>
        <rect x="3" y="2.5" width="18" height="2.6" />
        <rect x="3" y="7.2" width="18" height="2.6" />
        <path d="M3 12h18v10l-9-5.2L3 22z" />
      </g>
    )}
  </svg>
);

const Eyebrow = ({ icon, children }: { icon: keyof typeof brandColor; children: React.ReactNode }) => (
  <p className="flex items-center gap-2.5 font-display text-base uppercase tracking-wide"><BrandIcon name={icon} />{children}</p>
);

const delay = (seconds: number): CSSProperties => ({ ["--d" as string]: `${seconds}s` });

const LineIcon = ({ name, className = "h-7 w-7", draw = false }: { name: Stop["icon"] | "cap" | "briefcase"; className?: string; draw?: boolean }) => {
  const paths: Record<string, React.ReactNode> = {
    "india-gate": <path pathLength={1} d="M3 21h18M5 21V8h14v13M9.5 21v-5a2.5 2.5 0 0 1 5 0v5M4 8h16M6 5h12v3H6zM10 3h4v2h-4z" />,
    torii: <path pathLength={1} d="M3 5c6 1.4 12 1.4 18 0M4.5 9h15M7 6.2V21M17 6.2V21M11 9v3h2V9" />,
    skyline: <path pathLength={1} d="M3 21h18M5 21v-7h3v7M10 21V7h4v14M12 7V3M16 21v-9h3v9" />,
    cap: <path pathLength={1} d="M2 9l10-5 10 5-10 5-10-5zM6 11.2V16c3.5 2.4 8.5 2.4 12 0v-4.8M22 9v5" />,
    briefcase: <path pathLength={1} d="M3 8h18v12H3zM8.5 8V5h7v3M3 13h18" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {draw ? (
        <>
          <g opacity={0.3}>{paths[name]}</g>
          <g className="trace">{paths[name]}</g>
        </>
      ) : paths[name]}
    </svg>
  );
};

const pillSize: Record<WorkPill["size"], string> = {
  lg: "px-7 py-4 text-[clamp(28px,4vw,48px)]",
  md: "px-6 py-3 text-[clamp(22px,3vw,34px)]",
  sm: "px-5 py-2.5 text-[clamp(18px,2.2vw,26px)]",
};
const pillTone: Record<WorkPill["tone"], string> = {
  blue: "bg-[#1450f0] text-cream",
  cream: "bg-cream text-[#0a1a4a]",
  amber: "bg-[#f5b041] text-[#2a1a00]",
  outline: "text-white ring-1 ring-inset ring-white/25 hover:ring-white/60",
};
const tilts = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg"];

// Names only, each a link. Pills sit slightly tilted and straighten and lift on hover.
const WorkCollage = () => (
  <ul className="flex flex-wrap items-center gap-3 sm:gap-4">
    {work.map((item, i) => {
      const className = `group inline-flex items-center gap-3 rounded-full font-display uppercase leading-none transition-transform duration-300 hover:-translate-y-1 hover:!rotate-0 ${pillSize[item.size]} ${pillTone[item.tone]}`;
      const content = (
        <>
          {item.name}
          <span className="text-[0.6em] opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true">↗</span>
        </>
      );
      const style = { transform: `rotate(${tilts[i % tilts.length]})` };
      return (
        <li key={item.name}>
          {item.href.startsWith("/")
            ? <Link href={item.href} className={className} style={style}>{content}</Link>
            : <a href={item.href} target="_blank" rel="noreferrer" className={className} style={style}>{content}</a>}
        </li>
      );
    })}
  </ul>
);

const ReelTile = ({ reel, hidden = false }: { reel: Reel; hidden?: boolean }) => (
  <a href={reel.href ?? links.instagram} target="_blank" rel="noreferrer" aria-hidden={hidden} tabIndex={hidden ? -1 : undefined}
    aria-label={hidden ? undefined : `${reel.title}, ${reel.views} views on Instagram`}
    className="group relative block aspect-[493/687] w-[160px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:w-[210px]">
    <Image src={reel.thumb} alt="" fill unoptimized sizes="210px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
    <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur-sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
      {reel.views}
    </span>
  </a>
);

// Every reel runs past in an endless strip (the list is doubled so the loop is seamless).
// It pauses on hover; with reduced motion it stops and scrolls by hand instead.
const ReelsCarousel = ({ t, ja }: { t: Copy; ja: boolean }) => (
  <section className="relative ml-[calc(50%-50vw)] mt-12 w-screen text-left text-black dark:text-white">
    <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-5">
      <div>
        <Eyebrow icon="instagram">{t.onInstagram} · {instagram.handle}</Eyebrow>
        <h2 className={`mt-3 ${displayFont(ja)} text-[clamp(40px,7vw,88px)] leading-[0.95]`}>{t.totalViews}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {t.pillars.map((pillar) => (
            <span key={pillar} className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600 dark:border-white/15 dark:text-white/80">{pillar}</span>
          ))}
        </div>
      </div>
      <a href={links.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-[#1450f0] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        {t.follow}
      </a>
    </div>
    <Strip>
      <div className="reel-track flex w-max gap-4 px-2" style={{ animationDirection: "reverse" }}>
        {instagram.reels.map((reel) => <ReelTile key={reel.thumb} reel={reel} />)}
        {instagram.reels.map((reel) => <ReelTile key={`${reel.thumb}-copy`} reel={reel} hidden />)}
      </div>
    </Strip>
  </section>
);

const VideoTile = ({ v, t, hidden = false }: { v: typeof youtube.videos[number]; t: Copy; hidden?: boolean }) => (
  <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" aria-hidden={hidden} tabIndex={hidden ? -1 : undefined}
    className="group block w-[260px] shrink-0 sm:w-[340px]">
    <span className="relative block aspect-video overflow-hidden rounded-2xl ring-1 ring-black/10 dark:ring-white/10">
      <Image src={v.thumb} alt="" fill unoptimized sizes="340px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff0000] opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="white" className="ml-0.5 h-6 w-6"><path d="M7 4.5v15l13-7.5-13-7.5z" /></svg>
      </span>
      <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/65 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur-sm">{v.views} {t.views}</span>
    </span>
    <span className="mt-3 block text-base font-semibold leading-snug group-hover:underline">{v.title}</span>
  </a>
);

// Same endless strip as the reels: the list is doubled for a seamless loop, and it pauses on hover.
const YoutubeSection = ({ t, ja }: { t: Copy; ja: boolean }) => (
  <section className="relative ml-[calc(50%-50vw)] mt-12 w-screen text-left text-black dark:text-white">
    <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-5">
      <div>
        <Eyebrow icon="youtube">{t.onYoutube} · {youtube.handle}</Eyebrow>
        <h2 className={`mt-3 ${displayFont(ja)} text-[clamp(40px,7vw,88px)] leading-[0.95]`}>{t.youtubeTitle}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600 dark:border-white/15 dark:text-white/80">{t.youtubeViews}</span>
        </div>
      </div>
      <a href={links.youtube} target="_blank" rel="noreferrer" className="rounded-full bg-[#ff0000] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        {t.subscribe}
      </a>
    </div>
    <Strip>
      <div className="reel-track flex w-max gap-4 px-2" style={{ animationDuration: "110s" }}>
        {youtube.videos.map((v) => <VideoTile key={v.id} v={v} t={t} />)}
        {youtube.videos.map((v) => <VideoTile key={`${v.id}-copy`} v={v} t={t} hidden />)}
      </div>
    </Strip>
  </section>
);

const postDate = (iso: string, ja: boolean) =>
  new Date(iso).toLocaleDateString(ja ? "ja-JP" : "en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

const clamp = (n: number): CSSProperties => ({ display: "-webkit-box", WebkitLineClamp: n, WebkitBoxOrient: "vertical", overflow: "hidden" });

const PostCard = ({ p, ja, hidden = false }: { p: Post; ja: boolean; hidden?: boolean }) => (
  <a href={p.href} target="_blank" rel="noreferrer" aria-hidden={hidden} tabIndex={hidden ? -1 : undefined}
    className="group flex w-[280px] shrink-0 flex-col rounded-2xl bg-gray-100 p-5 ring-1 ring-black/10 dark:bg-white/[0.04] dark:ring-white/10 sm:w-[360px]">
    <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white/50">{postDate(p.date, ja)}</span>
    <span className={`mt-2 block min-h-[2.2em] ${ja ? "font-display-ja text-2xl" : "font-display text-[28px] uppercase"} leading-[1.1] group-hover:text-[#ff6719]`} style={clamp(2)}>{p.title}</span>
    <span className="mt-3 block min-h-[3.75rem] text-sm text-gray-500 dark:text-white/60" style={clamp(3)}>{p.blurb}</span>
    <span className="relative mt-5 block aspect-[2.4/1] overflow-hidden rounded-xl bg-gray-200 dark:bg-white/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {p.image && <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />}
    </span>
  </a>
);

// The same endless strip as the reels and videos, with a card per post.
const SubstackSection = ({ posts, t, ja }: { posts: Post[]; t: Copy; ja: boolean }) => (
  <section className="relative ml-[calc(50%-50vw)] mt-12 w-screen text-left text-black dark:text-white">
    <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-5">
      <div>
        <Eyebrow icon="substack">{t.onSubstack} · Umang Raw Enough</Eyebrow>
        <h2 className={`mt-3 ${displayFont(ja)} text-[clamp(40px,7vw,88px)] leading-[0.95]`}>{t.substackTitle}</h2>
      </div>
      <a href={links.substack} target="_blank" rel="noreferrer" className="rounded-full bg-[#ff6719] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        {t.readPosts}
      </a>
    </div>
    <Strip>
      <div className="reel-track flex w-max gap-4 px-2" style={{ animationDuration: `${posts.length * 9}s` }}>
        {posts.map((p) => <PostCard key={p.href} p={p} ja={ja} />)}
        {posts.map((p) => <PostCard key={`${p.href}-copy`} p={p} ja={ja} hidden />)}
      </div>
    </Strip>
  </section>
);

function HomeSections({ posts = [] }: { posts?: Post[] }) {
  const { locale } = useRouter();
  const ja = locale === "ja";
  const t = copy[ja ? "ja" : "en"];

  return (
    <div className="w-full text-left">
      <Panel label={t.aboutTitle} ja={ja}>
        <p className="max-w-3xl text-lg leading-relaxed text-white/90">
          {t.intro}
        </p>

        {/* The journey: each city's icon is drawn, held, wiped and drawn again on a loop, the cities a beat apart,
            with a faint outline underneath so the circles are never empty. */}
        <div>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {t.journey.map((stop, i) => {
              const t0 = i * 0.7;
              return (
                <li key={stop.city} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1450f0] text-cream" style={delay(t0)}>
                      <span style={delay(t0)} className="flex"><LineIcon name={stop.icon} draw /></span>
                    </span>
                    {i < t.journey.length - 1 && (
                      <span className="relative hidden h-px flex-1 bg-white/20 md:block" aria-hidden="true">
                        <span className="rule absolute inset-0 origin-left bg-gradient-to-r from-white/60" style={delay(t0)} />
                      </span>
                    )}
                  </div>
                  <p className={`mt-4 ${displayFont(ja)} text-3xl leading-none sm:text-4xl`}>{stop.city}</p>
                  <p className="mt-1 text-sm text-white/50">{stop.years}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{stop.text}</p>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
            {[
              { icon: "cap" as const, ...t.college },
              { icon: "briefcase" as const, ...t.role },
            ].map((item, i) => (
              <div key={item.label} className="flex items-start gap-4 rounded-2xl bg-white/[0.04] p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-cream" style={delay(2.1 + i * 0.6)}>
                  <LineIcon name={item.icon} className="h-6 w-6" draw />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-white/50">{item.label}</span>
                  <span className="mt-1 block font-semibold">{item.title}</span>
                  <span className="block text-sm text-white/70">{item.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel id="work" label={t.workTitle} ja={ja}>
        <WorkCollage />
      </Panel>

      {posts.length > 0 && <SubstackSection posts={posts} t={t} ja={ja} />}
      <ReelsCarousel t={t} ja={ja} />
      <YoutubeSection t={t} ja={ja} />

      {testimonials.length > 0 && (
        <Panel label={t.testimonialsTitle} ja={ja}>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name}>
                <blockquote className="leading-relaxed text-white/90">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 font-display text-sm uppercase">{t.name}<span className="ml-2 font-sans text-xs normal-case text-white/60">{t.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </Panel>
      )}

      <section className="mt-6 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0a2aa8] via-[#1450f0] to-[#3d8bff] p-8 text-cream sm:p-12">
        <p className="font-display text-sm uppercase tracking-wide">· {t.contact}</p>
        <h2 className={`mt-4 ${displayFont(ja)} text-[clamp(56px,11vw,150px)] leading-[0.9]`}>{t.letsTalk}</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href={`mailto:${links.email}`} className="text-xl font-semibold underline decoration-cream/40 underline-offset-8 hover:decoration-cream">{links.email}</a>
          <span className="flex-1" />
          <a href={links.calendly} target="_blank" rel="noreferrer" className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-[#0a2aa8] transition-opacity hover:opacity-90">{t.bookCall}</a>
        </div>
      </section>
    </div>
  );
}

export default HomeSections;
