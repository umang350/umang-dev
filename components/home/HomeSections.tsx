import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { featured, instagram, links, more, Project, proof, testimonials } from "@/data/content/home";
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
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-white/90">
          <p>
            I&apos;m Umang, a product manager in Tokyo. I run supply chain and planning products for a global retailer, from
            demand planning to inventory risk, across Asia, North America and Europe.
          </p>
          <p>
            On the side I build tools I wish existed, like Anaplan Toolkit, and share the life and the builds with a few
            million people on Instagram and YouTube.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label}>
              <p className="whitespace-nowrap font-display text-4xl leading-none xl:text-5xl">{item.value}</p>
              <p className="mt-2 text-sm text-white/60">{item.label}</p>
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

      <Panel label={`On Instagram · ${instagram.handle}`}>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {instagram.reels.map((reel) => (
            <a key={reel.thumb} href={reel.href ?? links.instagram} target="_blank" rel="noreferrer"
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={reel.thumb} alt={reel.title} fill sizes="(min-width: 640px) 300px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black/85 to-transparent p-2 pt-10 sm:p-4 sm:pt-16">
                <span className="font-display text-lg sm:text-3xl">{reel.views}</span>
                <span className="mb-1 ml-2 hidden text-xs text-white/70 sm:inline">views</span>
              </span>
            </a>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {instagram.pillars.map((pillar) => (
            <span key={pillar} className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/80">{pillar}</span>
          ))}
          <a href={links.instagram} target="_blank" rel="noreferrer" className="ml-auto rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90">
            Follow on Instagram
          </a>
        </div>
      </Panel>

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
