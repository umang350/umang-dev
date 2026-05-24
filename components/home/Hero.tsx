import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const metrics = [
  { label: "Stores served", value: "50+", sub: "Global supply chain", icon: "🏪" },
  { label: "Daily transactions", value: "10K+", sub: "Retail backend APIs", icon: "⚡" },
  { label: "NPS improvement", value: "+39pts", sub: "SCM modernization", icon: "📈" },
  { label: "Years at UNIQLO", value: "5", sub: "Eng → PM transition", icon: "🎯" },
];

function Hero() {
  const { locale } = useRouter();

  return (
    <section className="pb-6">
      {/* Hero header */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center mb-10 animate-fadeUp">
        <div>
          <p className="section-label">Overview</p>
          {locale === "ja" ? (
            <>
              <p className="text-lg text-dash-muted mb-3">
                こんにちは、<span className="font-bold text-dash-text">ウマング</span> です。
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-[1.15]">
                プロダクト <span className="gradient-text">マネージャー.</span>
                <br />
                <span className="gradient-text">ストラテジー.</span> ビルダー.
              </h1>
            </>
          ) : (
            <>
              <p className="text-lg text-dash-muted mb-3">
                Hey, I&apos;m <span className="font-bold text-dash-text">Umang</span>.
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-[1.15]">
                Product <span className="gradient-text">Manager.</span>
                <br />
                <span className="gradient-text">Strategy.</span> Builder.
              </h1>
            </>
          )}

          <p className="text-dash-muted text-[15px] leading-relaxed max-w-lg mb-6">
            {locale === "ja"
              ? "テクノロジーとリテールの交差点でユーザー中心のプロダクトを構築し、グローバルスケールでインパクトを与えています。"
              : "5 years at Fast Retailing — from building APIs to owning the product roadmap for global supply chain systems. Engineering background that ships with product judgment."}
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="bg-gradient-to-r from-dash-acc to-dash-acc2 text-white px-6 py-2.5 rounded-[10px] text-sm font-bold shadow-lg shadow-dash-acc/20 hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              {locale === "ja" ? "実績を見る" : "View My Work"} <span>→</span>
            </Link>
            <a
              href="mailto:job@umang.dev"
              className="border border-dash-border text-dash-text px-6 py-2.5 rounded-[10px] text-sm font-semibold hover:border-dash-acc hover:text-dash-acc transition-colors"
            >
              {locale === "ja" ? "連絡する" : "Get in Touch"}
            </a>
            <a
              href="/UmangResume.pdf"
              download
              className="border border-dash-border text-dash-muted px-5 py-2.5 rounded-[10px] text-sm font-semibold hover:border-dash-acc hover:text-dash-acc transition-colors hidden sm:inline-flex items-center gap-1"
            >
              Resume ↓
            </a>
          </div>
        </div>

        {/* Floating image */}
        <div className="hidden md:flex justify-center animate-float">
          <div className="relative" style={{ filter: "drop-shadow(0 0 40px rgba(129,140,248,0.2))" }}>
            <Image
              src="/sq.png"
              alt="Decorative geometric shape"
              width={180}
              height={180}
              style={{ objectFit: "contain", opacity: 0.85 }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full -z-10"
              style={{ background: "radial-gradient(circle, rgba(129,140,248,0.2) 0%, transparent 70%)" }}
            />
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={`card-base card-accent-top noise p-5 animate-fadeUp${i > 0 ? (i) : ''}`}
          >
            <div className="flex justify-between items-start mb-3">
              <p className="text-[11px] font-semibold text-dash-muted uppercase tracking-wider">{m.label}</p>
              <span className="text-lg">{m.icon}</span>
            </div>
            <p className="text-3xl font-extrabold gradient-text tracking-tight leading-none mb-1">{m.value}</p>
            <p className="text-[11px] text-dash-muted font-medium">{m.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
