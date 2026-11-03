import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Experience } from "./Experience";
import { information, informationJA } from "@/data/content/about";
import { links } from "@/data/content/home";

const panel = "rounded-[28px] bg-[#141414] text-white ring-1 ring-white/5";

// Same pairing as the homepage: Anton for Latin, Dela Gothic One where Japanese glyphs are needed.
const displayFont = (ja: boolean) => (ja ? "font-display-ja" : "font-display uppercase");

const Panel = ({ label, ja, children }: { label: string; ja: boolean; children: React.ReactNode }) => (
  <section className={`${panel} mt-6 p-8 sm:p-12`}>
    <h2 className={`${displayFont(ja)} text-[clamp(40px,6vw,72px)] leading-[0.95]`}>{label}</h2>
    <div className="mt-8">{children}</div>
  </section>
);

// Skill groups rotate through the same pill tones as "Things I've built".
const tones = ["bg-[#1450f0] text-cream", "bg-cream text-[#0a1a4a]", "bg-[#f5b041] text-[#2a1a00]"];

export const AboutMe = () => {
  const { locale } = useRouter();
  const ja = locale === "ja";
  const t = ja ? informationJA : information;

  return (
    <section className="-mt-5 w-full text-left">
      {/* Full-bleed blue band, the same Paris sky as the homepage hero, shorter */}
      <div className="relative ml-[calc(50%-50vw)] h-[380px] w-screen overflow-hidden bg-[#1450f0] text-cream lg:h-[min(600px,70vh)]">
        <Image src="/home/paris-v2-poster.jpg" alt="Umang Chauhan in front of the Eiffel Tower" fill priority sizes="100vw" className="object-cover object-[60%_85%] lg:object-[50%_72%]" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true"
          style={{ background: "linear-gradient(90deg, rgba(10,30,110,0.45), rgba(10,30,110,0) 45%), linear-gradient(0deg, rgba(10,20,60,0.4), rgba(10,20,60,0) 35%)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[15] h-28 [background:linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0))]" aria-hidden="true" />

        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-8 lg:px-8 lg:pb-10">
          <p className="font-display text-sm uppercase tracking-wide">· {t.eyebrow}</p>
          <h1 className={`mt-3 ${ja ? "font-display-ja text-[16vw] leading-none lg:text-[128px]" : "font-display uppercase text-[22vw] leading-[0.85] lg:text-[168px]"} [text-shadow:0_4px_40px_rgba(0,0,0,0.35)]`}>
            {t.title}
          </h1>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 px-1">
        {t.roles.map((role) => (
          <span key={role} className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 dark:border-white/15 dark:text-white/80">{role}</span>
        ))}
      </div>

      <Panel label={ja ? "ひとこと" : "In short"} ja={ja}>
        <p className="max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{t.desc}</p>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {t.descPoints.map((point, i) => (
            <li key={i} className="rounded-2xl bg-white/[0.04] p-6">
              <span className="font-display text-4xl leading-none text-[#f5b041]">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-sm leading-relaxed text-white/80">{point}</p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel label={t.experienceTitle} ja={ja}>
        <Experience ja={ja} />
      </Panel>

      <Panel label={t.skillsTitle} ja={ja}>
        <div className="grid gap-8 md:grid-cols-3">
          {t.skills.map(({ label, tags }, g) => (
            <div key={label}>
              <p className="text-xs font-medium uppercase tracking-wider text-white/50">{label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${tones[g % tones.length]}`}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <section className="mt-6 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0a2aa8] via-[#1450f0] to-[#3d8bff] p-8 text-cream sm:p-12">
        <p className="font-display text-sm uppercase tracking-wide">· {t.contact}</p>
        <h2 className={`mt-4 ${displayFont(ja)} text-[clamp(56px,11vw,150px)] leading-[0.9]`}>{t.letsTalk}</h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-cream/90">{t.contactText}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href={`mailto:${links.email}`} className="text-xl font-semibold underline decoration-cream/40 underline-offset-8 hover:decoration-cream">{links.email}</a>
          <span className="flex-1" />
          <a href={links.calendly} target="_blank" rel="noreferrer" className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-[#0a2aa8] transition-opacity hover:opacity-90">{t.bookCall}</a>
        </div>
      </section>
    </section>
  );
};
