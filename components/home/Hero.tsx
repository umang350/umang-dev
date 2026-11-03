import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { hero, heroJA, links, proof } from "@/data/content/home";

function Hero() {

  const { locale } = useRouter();
  const copy = locale === "ja" ? heroJA : hero;

  return (
    <>
      <section className="relative w-full text-left text-black dark:text-white">
        <div className="pointer-events-none absolute inset-x-0 -top-32 flex justify-center" aria-hidden="true">
          <div className="h-[420px] w-[820px] rounded-full bg-gradient-to-br from-fun-pink/20 via-fun-pink/5 to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 md:pt-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-fun-pink/30 bg-fun-pink/10 px-3 py-1 text-xs font-medium text-fun-pink">
              <span className="h-1.5 w-1.5 rounded-full bg-fun-pink" />
              {copy.badge}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-5xl">
              {copy.headline}{" "}
              <span className="text-fun-pink">{copy.accent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">{copy.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="rounded-lg bg-fun-pink px-5 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90">
                {locale === "ja" ? "プロジェクトを見る" : "View projects"}
              </a>
              <a href={links.cv} download className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition-colors hover:border-gray-500 dark:border-white/15 dark:hover:border-white/40">
                {locale === "ja" ? "履歴書 (PDF)" : "Download CV"}
              </a>
              <a href={`mailto:${links.email}`} className="px-2 py-3 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                {links.email}
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[300px] lg:max-w-[340px]">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-b from-fun-pink/25 to-fun-pink/5 dark:border-white/10">
              <Image src="/sq.png" alt="Illustration of Umang" width={1041} height={915} priority className="h-auto w-full translate-y-4" />
            </div>
            <Link href="/anaplan" className="absolute -bottom-5 -left-6 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-fun-pink-darkest">
              <Image src="/anaplan/icon.png" alt="" width={32} height={32} className="rounded-md" />
              <span className="text-left">
                <span className="block text-sm font-semibold">Anaplan Toolkit</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">Free extension · 22 reports</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full border-y border-gray-200 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 text-center sm:px-6 md:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label}>
              <div className="text-2xl font-bold text-black dark:text-white sm:text-3xl">{item.value}</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Hero;
