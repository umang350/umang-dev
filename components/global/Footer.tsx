import Link from "next/link";
import React from "react";
import { footer, footerJA, Footer as FooterType } from "@/data/global";
import Image from "next/image";
import { useRouter } from "next/router";

function Footer() {
  const { locale, pathname } = useRouter();
  const footerData: FooterType = locale === "ja" ? footerJA : footer;

  return (
    <footer className="border-t border-dash-border mt-auto">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
          {footerData.columns.map((item, index) => (
            <div key={index}>
              <h4 className="text-[11px] uppercase text-dash-muted font-bold tracking-widest mb-4">
                <Link href={item.link || "#"}>{item.title}</Link>
              </h4>
              <div className="space-y-3">
                {item.links.map((link, i) => (
                  <div key={i}>
                    {link.leavesWebsite ? (
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-dash-muted hover:text-dash-acc transition-colors"
                      >
                        {link.icon && (
                          <Image src={link.icon} width={14} height={14} alt="" className="opacity-60 invert" />
                        )}
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.link} className="text-sm text-dash-muted hover:text-dash-acc transition-colors">
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="col-span-2 sm:col-auto pt-6 sm:pt-0 border-t border-dash-border sm:border-0">
            <h4 className="text-[11px] uppercase text-dash-muted font-bold tracking-widest mb-4">
              {footerData.support.title}
            </h4>
            <p className="text-xs text-dash-muted leading-relaxed mb-6">
              {footerData.support.message}
            </p>
            <h4 className="text-[11px] uppercase text-dash-muted font-bold tracking-widest mb-3">
              {footerData.language.title}
            </h4>
            <div className="flex gap-3">
              {footerData.language.languages.map((item, index) => (
                <Link
                  key={index}
                  href={item.locale === "en" ? pathname : item.locale + pathname}
                  locale={false}
                  className={`text-sm transition-colors ${
                    locale === item.locale
                      ? "text-dash-acc font-semibold"
                      : "text-dash-muted hover:text-dash-text"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-dash-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-dash-muted">
            Made by{" "}
            <a href="mailto:contact@umang.dev" className="text-dash-text font-medium hover:text-dash-acc transition-colors">
              {footerData.make.maker}
            </a>
            . {footerData.make.dislaimer}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-dash-muted uppercase tracking-widest font-semibold">
            Built with
            <span className="flex items-center gap-1.5 ml-1">
              <Image
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                width={16}
                height={16}
                alt="React"
              />
              <Image
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg"
                width={28}
                height={28}
                className="invert"
                alt="NextJS"
              />
              <Image
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg"
                width={40}
                height={40}
                alt="TailwindCSS"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
