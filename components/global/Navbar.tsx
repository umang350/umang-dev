import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { routes, routesJA, Route } from "../../data/global";
import { useRouter } from "next/router";

type currentPageObject = {
  currentPage: string
}

function Navbar({ currentPage }: currentPageObject) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { locale, pathname } = useRouter();
  let routesData: Route[];
  let pageLogoText = "";

  if (locale === "ja") {
    routesData = routesJA;
    pageLogoText = "ウマング.dev";
  } else {
    routesData = routes;
    pageLogoText = "UMANG.dev";
  }

  return (
    <aside className="w-[240px] bg-dash-sidebar/95 glass border-r border-dash-border flex flex-col sticky top-0 h-screen overflow-y-auto flex-shrink-0">
      {/* Brand */}
      <div className="px-6 pt-7 pb-5 border-b border-dash-border">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-dash-acc to-dash-acc2 flex items-center justify-center text-[15px] font-extrabold text-white shadow-lg shadow-dash-acc/30">
            U
          </div>
          <div>
            <div className="text-sm font-bold text-dash-text tracking-tight group-hover:text-dash-acc transition-colors">
              Umang Chauhan
            </div>
            <div className="text-[11px] text-dash-muted font-medium">Product Manager</div>
          </div>
        </Link>
      </div>

      {/* Status badge */}
      <div className="px-6 py-5">
        <div className="noise bg-dash-green/[0.06] border border-dash-green/[0.15] rounded-[10px] px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-[7px] h-[7px] rounded-full bg-dash-green shadow-[0_0_10px_rgba(52,211,153,0.4)] animate-pulse2" />
            <span className="text-[11px] font-bold text-dash-green tracking-wide">Open to work</span>
          </div>
          <p className="text-[11px] text-dash-muted leading-relaxed">PM roles · Tokyo or remote</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3.5">
        {routesData.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[13px] transition-all border-l-2 ${
                isActive
                  ? "bg-dash-acc/10 text-dash-acc font-semibold border-dash-acc"
                  : "text-dash-muted hover:text-dash-text hover:bg-dash-acc/5 font-normal border-transparent"
              }`}
            >
              <span className="text-[11px] opacity-70">
                {item.title === "Home" || item.title === "ホーム" ? "◆" :
                 item.title === "About Me" || item.title === "私について" ? "◉" :
                 item.title === "Projects" || item.title === "プロジェクト" ? "◈" :
                 item.title === "Impact" || item.title === "インパクト" ? "◫" :
                 "▸"}
              </span>
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar footer */}
      <div className="px-6 pt-4 pb-6 border-t border-dash-border mt-auto">
        {/* Social links */}
        <div className="flex gap-2 justify-center mb-3">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/thisumang/", icon: "/icons/linkedin-f.svg" },
            { label: "GitHub", href: "https://github.com/umang350", icon: "/icons/github-f.svg" },
            { label: "Email", href: "mailto:contact@umang.dev", icon: "/icons/mail-f.svg" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-dash-border flex items-center justify-center hover:border-dash-acc transition-colors group"
              aria-label={s.label}
            >
              <Image
                src={s.icon}
                width={14}
                height={14}
                alt={s.label}
                className="opacity-50 group-hover:opacity-90 transition-opacity invert"
              />
            </a>
          ))}
        </div>
        <a
          href="mailto:job@umang.dev"
          className="block text-center bg-gradient-to-r from-dash-acc to-dash-acc2 text-white py-2.5 rounded-[10px] text-xs font-bold tracking-wide animate-glow hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </a>
      </div>
    </aside>
  );
}

export default Navbar;
