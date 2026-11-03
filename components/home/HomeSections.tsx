import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { featured, instagram, links, more, Project, testimonials } from "@/data/content/home";

const card = "rounded-2xl border border-gray-200 bg-white transition-colors hover:border-gray-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20";

const SectionHead = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="max-w-2xl">
    <p className="text-sm font-semibold uppercase tracking-wider text-fun-pink">{eyebrow}</p>
    <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
  </div>
);

const ProjectLink = ({ p }: { p: Project }) => {
  if (!p.href) return null;
  const className = "mt-auto pt-5 inline-flex text-sm font-semibold text-fun-pink hover:underline underline-offset-4";
  return p.href.startsWith("/")
    ? <Link href={p.href} className={className}>{p.cta} →</Link>
    : <a href={p.href} target="_blank" rel="noreferrer" className={className}>{p.cta} →</a>;
};

const Metric = ({ p }: { p: Project }) => p.metric ? (
  <div className="mt-5 border-t border-gray-200 pt-4 dark:border-white/10">
    <div className="text-2xl font-bold">{p.metric.value}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{p.metric.label}</div>
  </div>
) : null;

const Card = ({ p }: { p: Project }) => (
  <div className={`${card} flex flex-col p-6`}>
    <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{p.tag}</p>
    <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{p.outcome}</p>
    <Metric p={p} />
    <ProjectLink p={p} />
  </div>
);

const LeadCard = ({ p }: { p: Project }) => (
  <div className={`${card} flex flex-col overflow-hidden lg:col-span-2 lg:row-span-2 lg:flex-row`}>
    <div className="flex flex-col p-6 lg:w-1/2 lg:p-8">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{p.tag}</p>
      <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{p.title}</h3>
      <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">{p.outcome}</p>
      <Metric p={p} />
      <ProjectLink p={p} />
    </div>
    {p.image && (
      <div className="relative min-h-[260px] border-t border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-black/30 lg:w-1/2 lg:border-l lg:border-t-0">
        <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover object-top" />
      </div>
    )}
  </div>
);

function HomeSections() {
  const { locale } = useRouter();
  if (locale === "ja") return null;

  const [lead, ...rest] = featured;

  return (
    <div className="w-full text-left text-black dark:text-white">
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-20 sm:px-6">
        <SectionHead eyebrow="Selected work" title="Things I've built" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <LeadCard p={lead} />
          {rest.map((p) => <Card key={p.title} p={p} />)}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {more.map((p) => (
            <a key={p.title} href={p.href} target="_blank" rel="noreferrer" className={`${card} group flex items-center justify-between gap-4 px-6 py-5`}>
              <span>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{p.tag}</span>
                <span className="block font-semibold">{p.title}</span>
                <span className="block text-sm text-gray-600 dark:text-gray-400">{p.outcome}</span>
              </span>
              <span className="text-fun-pink transition-transform group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
          <SectionHead eyebrow="Kind words" title="What people say" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className={`${card} p-6`}>
                <blockquote className="leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-gray-500 dark:text-gray-400">{t.name}, {t.role}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-20 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div className={`${card} p-8`}>
          <p className="text-sm font-semibold uppercase tracking-wider text-fun-pink">Instagram · {instagram.handle}</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">The life and builds behind the work.</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {instagram.pillars.map((pillar) => (
              <span key={pillar} className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 dark:border-white/10 dark:text-gray-300">{pillar}</span>
            ))}
          </div>
          {instagram.reels.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {instagram.reels.map((url) => (
                <iframe key={url} src={`${url.replace(/\/$/, "")}/embed`} className="h-[480px] w-full rounded-xl border-0" loading="lazy" title="Instagram reel" />
              ))}
            </div>
          )}
          <a href={links.instagram} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-lg bg-fun-pink px-5 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90">
            Follow on Instagram
          </a>
        </div>
        <div className={`${card} flex flex-col p-8`}>
          <p className="text-sm font-semibold uppercase tracking-wider text-fun-pink">Contact</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Let&apos;s talk.</h2>
          <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">Hiring, collaborating, or just curious about Tokyo.</p>
          <a href={`mailto:${links.email}`} className="mt-6 text-lg font-semibold hover:text-fun-pink">{links.email}</a>
          <a href={links.calendly} target="_blank" rel="noreferrer" className="mt-auto inline-flex self-start rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition-colors hover:border-gray-500 dark:border-white/15 dark:hover:border-white/40">
            Book a call
          </a>
        </div>
      </section>
    </div>
  );
}

export default HomeSections;
