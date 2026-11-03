import React from "react";
import { experience, experienceJA } from "@/data/content/about";

// One mark per stop, keyed by the entry's `key`: study, internship, developer, team lead, product, product at HQ.
const icons: Record<string, React.ReactNode> = {
    "0": <path d="M2 9l10-5 10 5-10 5-10-5zM6 11.2V16c3.5 2.4 8.5 2.4 12 0v-4.8M22 9v5" />,
    "1": <path d="M4 5h16v11H4zM2 19h20" />,
    "2": <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />,
    "3": <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.5 2.5 0 1 0 0-5M18 14c2.2.4 3.5 2.3 3.5 5" />,
    "4": <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
    "5": <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
};

const Icon = ({ children, className }: { children: React.ReactNode; className: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {children}
    </svg>
);

// A vertical timeline: the year in display type on the left, an icon on the line, the role on the right, newest first.
// The current role gets the tower's amber, every earlier stop is the homepage blue.
export const Experience = ({ ja }: { ja: boolean }) => {
    const items = [...(ja ? experienceJA : experience)].sort((a, b) => Number(b.key) - Number(a.key));

    return (
        <ol className="relative">
            <span className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-white/40 via-white/15 to-transparent md:left-[195px]" aria-hidden="true" />
            {items.map((item, i) => {
                const current = i === 0;
                return (
                    <li key={item.key} className="relative grid gap-x-8 pb-10 pl-14 last:pb-0 md:grid-cols-[170px_1fr] md:pl-0">
                        <span className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-[#141414] md:left-[175px] ${current ? "bg-[#f5b041] text-[#2a1a00]" : "bg-[#1450f0] text-cream"}`} aria-hidden="true">
                            <Icon className="h-5 w-5">{icons[item.key]}</Icon>
                        </span>
                        <p className={`${ja ? "font-display-ja" : "font-display"} text-3xl leading-none md:pt-2 md:text-right md:text-4xl ${current ? "text-[#f5b041]" : "text-white"}`}>
                            {item.year}
                        </p>
                        <div className="mt-2 md:ml-14 md:mt-0">
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <a href={item.companyLink} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
                                <Icon className="h-4 w-4 shrink-0"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 7.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /></Icon>
                                {item.company}
                            </a>
                            <p className="mt-3 max-w-2xl leading-relaxed text-white/75">{item.desc}</p>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
};
