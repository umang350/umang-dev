import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { featured, instagram, journey, links, more, Project, Reel, Stop, testimonials, today } from "@/data/content/home";
import { ProjectIcon } from "./Hero";

const panel = "rounded-[28px] bg-[#141414] text-white ring-1 ring-white/5";

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="font-display text-sm uppercase tracking-wide text-white">· {children}</p>
);

const Panel = ({ id, label, children }: { id?: string; label: string; children: React.ReactNode }) => (
  <section id={id} className={`${panel} mt-6 grid scroll-mt-24 gap-8 p-8 sm:p-12 lg:grid-cols-[200px_1fr]`}>
    <Label>{label}</Label>
    <div>{children}</div>
  </section>
);

const ProjectLink = ({ p, className, children, onEnter }: { p: Project; className: string; children: React.ReactNode; onEnter: () => void }) => {
  const props = { className, onMouseEnter: onEnter, onFocus: onEnter };
  if (!p.href) return <div {...props}>{children}</div>;
  return p.href.startsWith("/")
    ? <Link href={p.href} {...props}>{children}</Link>
    : <a href={p.href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
};

const LineIcon = ({ name, className = "h-7 w-7" }: { name: Stop["icon"] | "cap" | "briefcase"; className?: string }) => {
  const paths: Record<string, React.ReactNode> = {
    "india-gate": <path d="M3 21h18M5 21V8h14v13M9.5 21v-5a2.5 2.5 0 0 1 5 0v5M4 8h16M6 5h12v3H6zM10 3h4v2h-4z" />,
    torii: <path d="M3 5c6 1.4 12 1.4 18 0M4.5 9h15M7 6.2V21M17 6.2V21M11 9v3h2V9" />,
    skyline: <path d="M3 21h18M5 21v-7h3v7M10 21V7h4v14M12 7V3M16 21v-9h3v9" />,
    cap: <path d="M2 9l10-5 10 5-10 5-10-5zM6 11.2V16c3.5 2.4 8.5 2.4 12 0v-4.8M22 9v5" />,
    briefcase: <path d="M3 8h18v12H3zM8.5 8V5h7v3M3 13h18" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

const ReelTile = ({ reel, hidden = false }: { reel: Reel; hidden?: boolean }) => (
  <a href={reel.href ?? links.instagram} target="_blank" rel="noreferrer" aria-hidden={hidden} tabIndex={hidden ? -1 : undefined}
    aria-label={hidden ? undefined : `${reel.title}, ${reel.views} views on Instagram`}
    className="group relative block aspect-[493/687] w-[160px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:w-[210px]">
    <Image src={reel.thumb} alt="" fill sizes="210px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
    <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur-sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
      {reel.views}
    </span>
  </a>
);

// Every reel runs past in an endless strip (the list is doubled so the loop is seamless).
// It pauses on hover; with reduced motion it stops and scrolls by hand instead.
const ReelsCarousel = () => (
  <section className="relative ml-[calc(50%-50vw)] mt-6 w-screen text-left text-black dark:text-white">
    <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-5">
      <div>
        <p className="font-display text-sm uppercase tracking-wide">· On Instagram · {instagram.handle}</p>
        <h2 className="mt-3 font-display text-[clamp(40px,7vw,88px)] uppercase leading-[0.9]">{instagram.totalViews} views</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {instagram.pillars.map((pillar) => (
            <span key={pillar} className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600 dark:border-white/15 dark:text-white/80">{pillar}</span>
          ))}
        </div>
      </div>
      <a href={links.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-[#1450f0] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        Follow on Instagram
      </a>
    </div>
    <div className="reel-strip mt-8 overflow-hidden">
      <div className="reel-track flex w-max gap-4 px-2">
        {instagram.reels.map((reel) => <ReelTile key={reel.thumb} reel={reel} />)}
        {instagram.reels.map((reel) => <ReelTile key={`${reel.thumb}-copy`} reel={reel} hidden />)}
      </div>
    </div>
  </section>
);

const Preview = ({ p }: { p: Project }) => (
  <div className="overflow-hidden rounded-2xl bg-[#1450f0]">
    {p.image ? (
      <div className="relative aspect-[4/5]">
        <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="300px" className="object-cover object-top" />
      </div>
    ) : (
      <div className="flex aspect-[4/5] flex-col justify-between p-6 text-cream">
        <ProjectIcon icon={p.icon} className="h-10 w-10" />
        <div>
          {p.metric && <p className="font-display text-5xl leading-none">{p.metric.value}</p>}
          <p className="mt-3 text-sm leading-snug text-cream/80">{p.metric ? p.metric.label : p.outcome}</p>
        </div>
      </div>
    )}
  </div>
);

function HomeSections() {
  const projects = [...featured, ...more];
  const [active, setActive] = useState(0);

  return (
    <div className="w-full text-left">
      <Panel label="About me">
        <p className="max-w-3xl text-lg leading-relaxed text-white/90">
          I&apos;m Umang. I build planning products for a global retailer, and on the side the tools I wish existed, like
          Anaplan Toolkit. I share the life and the builds on Instagram and YouTube.
        </p>

        {/* The journey: each city is a stop on one line, with an arrow to the next */}
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {journey.map((stop, i) => (
            <li key={stop.city} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1450f0] text-cream">
                  <LineIcon name={stop.icon} />
                </span>
                {i < journey.length - 1 && (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-white/40 md:block" aria-hidden="true" />
                )}
              </div>
              <p className="mt-4 font-display text-3xl uppercase leading-none sm:text-4xl">{stop.city}</p>
              <p className="mt-1 text-sm text-white/50">{stop.years}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{stop.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
          {[
            { icon: "cap" as const, label: "College", ...today.college },
            { icon: "briefcase" as const, label: "Role", ...today.role },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 rounded-2xl bg-white/[0.04] p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-cream">
                <LineIcon name={item.icon} className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase tracking-wider text-white/50">{item.label}</span>
                <span className="mt-1 block font-semibold">{item.title}</span>
                <span className="block text-sm text-white/70">{item.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel id="work" label="Selected work">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <ul className="group/list">
            {projects.map((p, i) => (
              <li key={p.title} className="border-b border-white/10 last:border-0">
                <ProjectLink p={p} onEnter={() => setActive(i)}
                  className={`flex items-baseline justify-between gap-4 py-4 transition-opacity ${active === i ? "opacity-100" : "opacity-40 hover:opacity-100"}`}>
                  <span>
                    <span className="block font-display text-[clamp(32px,5vw,60px)] uppercase leading-none">{p.title}</span>
                    <span className="mt-2 block text-xs font-medium text-white/60">[ {p.tag} ]</span>
                  </span>
                  <span className="shrink-0 text-xl" aria-hidden="true">↗</span>
                </ProjectLink>
                <p className={`pb-4 text-sm leading-relaxed text-white/70 lg:hidden`}>{p.outcome}</p>
              </li>
            ))}
          </ul>
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Preview p={projects[active]} />
              <p className="mt-4 text-sm leading-relaxed text-white/70">{projects[active].outcome}</p>
            </div>
          </div>
        </div>
      </Panel>

      <ReelsCarousel />

      {testimonials.length > 0 && (
        <Panel label="Kind words">
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
        <p className="font-display text-sm uppercase tracking-wide">· Contact</p>
        <h2 className="mt-4 font-display text-[clamp(56px,11vw,150px)] uppercase leading-[0.85]">Let&apos;s talk</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href={`mailto:${links.email}`} className="text-xl font-semibold underline decoration-cream/40 underline-offset-8 hover:decoration-cream">{links.email}</a>
          <span className="flex-1" />
          <a href={links.calendly} target="_blank" rel="noreferrer" className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-[#0a2aa8] transition-opacity hover:opacity-90">Book a call</a>
          <a href={links.cv} download className="rounded-full border border-cream/50 px-6 py-3 text-sm font-semibold transition-colors hover:border-cream">Download CV</a>
        </div>
      </section>
    </div>
  );
}

export default HomeSections;
