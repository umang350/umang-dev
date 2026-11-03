import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { featured, instagram, links, more, proof, Project, testimonials } from "@/data/content/home";

const Section = ({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="w-full max-w-5xl mx-auto px-4 py-12 scroll-mt-20 dark:text-white text-black z-50 relative">
    <h2 className="text-3xl font-bold tracking-tighter mb-6">{title}</h2>
    {children}
  </section>
);

const ProjectLink = ({ p }: { p: Project }) => {
  if (!p.href) return null;
  const className = "text-fun-pink font-semibold mt-3 inline-block";
  return p.href.startsWith("/")
    ? <Link href={p.href} className={className}>{p.cta} →</Link>
    : <a href={p.href} target="_blank" rel="noreferrer" className={className}>{p.cta} →</a>;
};

const Card = ({ p }: { p: Project }) => (
  <div className="rounded-xl border border-fun-pink-dark p-5 flex flex-col">
    {p.image && (
      <Image src={p.image} alt={p.title} width={640} height={400} className="rounded-lg mb-4 w-full h-auto" />
    )}
    <h3 className="text-xl font-bold">{p.title}</h3>
    <p className="opacity-80 mt-2">{p.outcome}</p>
    <ProjectLink p={p} />
  </div>
);

function HomeSections() {
  const { locale } = useRouter();
  if (locale === "ja") return null;

  return (
    <>
      <section className="w-full max-w-5xl mx-auto px-4 py-6 z-50 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {proof.map((item) => (
            <div key={item.label} className="rounded-xl border border-fun-pink-dark py-5 dark:text-white text-black">
              <div className="text-3xl font-black text-fun-pink">{item.value}</div>
              <div className="text-sm opacity-70 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Section id="projects" title="Featured projects">
        <div className="grid md:grid-cols-3 gap-6">{featured.map((p) => <Card key={p.title} p={p} />)}</div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">{more.map((p) => <Card key={p.title} p={p} />)}</div>
      </Section>

      {testimonials.length > 0 && (
        <Section title="What people say">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-xl border border-fun-pink-dark p-5">
                <blockquote className="opacity-90">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-3 text-sm opacity-70">{t.name}, {t.role}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section title="Follow along on Instagram">
        <p className="mb-4 opacity-80">
          <a href={instagram.handle ? links.instagram : "#"} target="_blank" rel="noreferrer" className="text-fun-pink font-semibold">{instagram.handle}</a>
          {" "}is where I post: {instagram.pillars.join(", ").toLowerCase()}.
        </p>
        {instagram.reels.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {instagram.reels.map((url) => (
              <iframe key={url} src={`${url.replace(/\/$/, "")}/embed`} className="w-full h-[480px] rounded-lg border-0" loading="lazy" title="Instagram reel" />
            ))}
          </div>
        )}
        <a href={links.instagram} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg font-bold bg-fun-pink text-black inline-block">
          Follow on Instagram
        </a>
      </Section>

      <Section title="Let's talk">
        <p className="opacity-80 mb-4">
          Hiring, collaborating, or just curious: email me at <a className="text-fun-pink font-semibold" href={`mailto:${links.email}`}>{links.email}</a> or book a call.
        </p>
        <a href={links.calendly} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg font-bold border border-fun-pink text-fun-pink inline-block">
          Book a call
        </a>
      </Section>
    </>
  );
}

export default HomeSections;
