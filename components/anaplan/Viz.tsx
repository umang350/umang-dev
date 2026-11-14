import React from "react";
import type { HeroKind } from "@/data/anaplan/guides";

// Dependency-free charts, diagrams and hero illustrations for the Anaplan
// guides. Everything is inline SVG or plain HTML/CSS, so it renders on the
// server, scales to any width and needs no chart library.

const fmt = (n: number) => n.toLocaleString("en-US");

export const Figure = ({ title, caption, children }: { title?: string; caption?: string; children: React.ReactNode }) => (
    <figure className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        {title && <p className="text-sm font-semibold text-gray-900">{title}</p>}
        <div className={title ? "mt-4" : ""}>{children}</div>
        {caption && <figcaption className="mt-4 border-t border-gray-100 pt-3 text-xs leading-relaxed text-gray-500">{caption}</figcaption>}
    </figure>
);

export const CodeBlock = ({ children }: { children: string }) => (
    <pre className="mt-4 overflow-x-auto rounded-xl bg-gray-900 p-4 text-[13px] leading-relaxed text-gray-100">
        <code>{children}</code>
    </pre>
);

// Horizontal bars. Values are printed beside each bar, so the chart reads
// without colour or hover.
export const BarChart = ({
    data,
    format = fmt,
    highlight,
    unit,
}: {
    data: { label: string; value: number; note?: string }[];
    format?: (n: number) => string;
    highlight?: number;
    unit?: string;
}) => {
    const max = Math.max(...data.map((d) => d.value));
    return (
        <ul className="space-y-3">
            {data.map((d, i) => (
                <li key={d.label}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="font-medium text-gray-800">{d.label}</span>
                        <span className="font-mono text-xs text-gray-600">
                            {format(d.value)}
                            {unit ? ` ${unit}` : ""}
                        </span>
                    </div>
                    <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                            className={`h-full rounded-full ${highlight === i ? "bg-red-600" : "bg-red-300"}`}
                            style={{ width: `${Math.max((d.value / max) * 100, 1.5)}%` }}
                        />
                    </div>
                    {d.note && <p className="mt-1 text-xs text-gray-500">{d.note}</p>}
                </li>
            ))}
        </ul>
    );
};

// Paired columns: a value before and after a change.
export const ColumnCompare = ({
    groups,
    beforeLabel = "Before",
    afterLabel = "After",
    unit = "",
}: {
    groups: { label: string; before: number; after: number }[];
    beforeLabel?: string;
    afterLabel?: string;
    unit?: string;
}) => {
    const max = Math.max(...groups.flatMap((g) => [g.before, g.after]));
    return (
        <div>
            <div className="flex h-44 items-end gap-4 border-b border-gray-200 px-2">
                {groups.map((g) => (
                    <div key={g.label} className="flex h-full flex-1 items-end justify-center gap-1.5">
                        {[
                            { v: g.before, c: "bg-gray-300", l: beforeLabel },
                            { v: g.after, c: "bg-red-600", l: afterLabel },
                        ].map((b) => (
                            <div key={b.l} className="flex w-full max-w-[3rem] flex-col items-center justify-end" style={{ height: "100%" }}>
                                <span className="mb-1 font-mono text-[10px] text-gray-600">{fmt(b.v)}{unit}</span>
                                <div className={`w-full rounded-t-md ${b.c}`} style={{ height: `${Math.max((b.v / max) * 82, 2)}%` }} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="mt-2 flex gap-4 px-2">
                {groups.map((g) => (
                    <div key={g.label} className="flex-1 text-center text-xs font-medium text-gray-700">{g.label}</div>
                ))}
            </div>
            <div className="mt-3 flex justify-center gap-5 text-xs text-gray-600">
                <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-gray-300" />{beforeLabel}</span>
                <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-red-600" />{afterLabel}</span>
            </div>
        </div>
    );
};

const donutColors = ["#dc2626", "#f97316", "#facc15", "#94a3b8", "#475569"];

export const Donut = ({ data, centre }: { data: { label: string; value: number }[]; centre?: string }) => {
    const total = data.reduce((n, d) => n + d.value, 0);
    const r = 15.9155; // circumference = 100
    let offset = 25;
    return (
        <div className="flex flex-col items-center gap-6 sm:flex-row">
            <svg viewBox="0 0 42 42" className="h-44 w-44 flex-none" role="img" aria-label={data.map((d) => `${d.label} ${Math.round((d.value / total) * 100)}%`).join(", ")}>
                <circle cx="21" cy="21" r={r} fill="none" stroke="#f3f4f6" strokeWidth="6" />
                {data.map((d, i) => {
                    const pct = (d.value / total) * 100;
                    const el = (
                        <circle
                            key={d.label}
                            cx="21"
                            cy="21"
                            r={r}
                            fill="none"
                            stroke={donutColors[i % donutColors.length]}
                            strokeWidth="6"
                            strokeDasharray={`${pct} ${100 - pct}`}
                            strokeDashoffset={offset}
                        />
                    );
                    offset -= pct;
                    return el;
                })}
                {centre && (() => {
                    const [big, ...rest] = centre.split(" ");
                    return (
                        <>
                            <text x="21" y={rest.length ? 22 : 23.5} textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#111827">{big}</text>
                            {rest.length > 0 && <text x="21" y="26.5" textAnchor="middle" fontSize="2.6" fill="#6b7280">{rest.join(" ")}</text>}
                        </>
                    );
                })()}
            </svg>
            <ul className="w-full space-y-2 text-sm">
                {data.map((d, i) => (
                    <li key={d.label} className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-gray-800">
                            <i className="h-2.5 w-2.5 rounded-sm" style={{ background: donutColors[i % donutColors.length] }} />
                            {d.label}
                        </span>
                        <span className="font-mono text-xs text-gray-600">{Math.round((d.value / total) * 100)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const LineChart = ({
    series,
    xLabels,
    yLabel,
    aria,
}: {
    series: { name: string; color: string; points: number[] }[];
    xLabels: string[];
    yLabel?: string;
    // Replaces the English screen-reader summary (used by the Japanese guides).
    aria?: string;
}) => {
    const W = 560, H = 220, L = 40, B = 28, T = 12, R = 12;
    const max = Math.max(...series.flatMap((s) => s.points));
    const x = (i: number) => L + (i * (W - L - R)) / (xLabels.length - 1);
    const y = (v: number) => T + (1 - v / max) * (H - T - B);
    return (
        <div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={aria ?? `${yLabel ?? "Chart"}: ${series.map((s) => s.name).join(" versus ")}`}>
                {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                    <g key={t}>
                        <line x1={L} x2={W - R} y1={y(max * t)} y2={y(max * t)} stroke="#e5e7eb" strokeWidth="1" />
                        <text x={L - 6} y={y(max * t) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{Math.round(max * t)}</text>
                    </g>
                ))}
                {xLabels.map((l, i) => (
                    <text key={l} x={x(i)} y={H - 8} textAnchor="middle" fontSize="9" fill="#6b7280">{l}</text>
                ))}
                {series.map((s) => (
                    <g key={s.name}>
                        <polyline fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points={s.points.map((p, i) => `${x(i)},${y(p)}`).join(" ")} />
                        {s.points.map((p, i) => <circle key={i} cx={x(i)} cy={y(p)} r="3" fill={s.color} />)}
                    </g>
                ))}
            </svg>
            <div className="mt-2 flex flex-wrap justify-center gap-5 text-xs text-gray-600">
                {yLabel && <span className="text-gray-500">{yLabel}</span>}
                {series.map((s) => (
                    <span key={s.name} className="flex items-center gap-1.5"><i className="h-0.5 w-4 rounded" style={{ background: s.color }} />{s.name}</span>
                ))}
            </div>
        </div>
    );
};

// Boxes joined by arrows; horizontal from md up, vertical on phones.
export const Flow = ({ steps, highlight }: { steps: { title: string; sub?: string }[]; highlight?: number }) => (
    <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-stretch">
        {steps.map((s, i) => (
            <li key={s.title} className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center">
                <div className={`flex-1 rounded-xl border p-3 text-center ${highlight === i ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
                    <p className="text-sm font-semibold text-gray-900">{s.title}</p>
                    {s.sub && <p className="mt-1 text-xs leading-snug text-gray-600">{s.sub}</p>}
                </div>
                {i < steps.length - 1 && (
                    <span className="flex-none text-center text-lg text-red-500 md:px-0.5" aria-hidden="true">
                        <span className="md:hidden">↓</span>
                        <span className="hidden md:inline">→</span>
                    </span>
                )}
            </li>
        ))}
    </ol>
);

// Sources on the left feed one hub; the hub feeds a column of models on the
// right. Three clear columns, so nothing overlaps at any width.
export const HubSpoke = ({ centre, spokes, inbound = [], aria, sourcesLabel = "SOURCES", modelsLabel = "PLANNING MODELS" }: { centre: string; spokes: string[]; inbound?: string[]; aria?: string; sourcesLabel?: string; modelsLabel?: string }) => {
    const H = Math.max(260, Math.max(spokes.length, inbound.length) * 56 + 40);
    const cy = H / 2, hubX = 300, hubR = 50;
    const rows = (n: number) => Array.from({ length: n }, (_, i) => cy + (i - (n - 1) / 2) * 56);
    return (
        <svg viewBox={`0 0 600 ${H}`} className="w-full" role="img" aria-label={aria ?? `${inbound.join(", ")} feed ${centre}, which feeds ${spokes.join(", ")}`}>
            <defs>
                <marker id="hub-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0 0 L8 4 L0 8 z" fill="#9ca3af" />
                </marker>
                <marker id="hub-arrow-red" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0 0 L8 4 L0 8 z" fill="#f87171" />
                </marker>
            </defs>
            {inbound.length > 0 && <text x="55" y="16" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280">{sourcesLabel}</text>}
            <text x="545" y="16" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280">{modelsLabel}</text>
            {rows(inbound.length).map((y, i) => (
                <g key={inbound[i]}>
                    <rect x="5" y={y - 16} width="100" height="32" rx="10" fill="#f3f4f6" />
                    <text x="55" y={y + 4} textAnchor="middle" fontSize="11" fill="#4b5563">{inbound[i]}</text>
                    <line x1="105" y1={y} x2={hubX - hubR - 2} y2={cy} stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#hub-arrow)" />
                </g>
            ))}
            {rows(spokes.length).map((y, i) => (
                <g key={spokes[i]}>
                    <line x1={hubX + hubR} y1={cy} x2="438" y2={y} stroke="#f87171" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#hub-arrow-red)" />
                    <rect x="440" y={y - 16} width="150" height="32" rx="10" fill="#fff" stroke="#e5e7eb" />
                    <text x="515" y={y + 4} textAnchor="middle" fontSize="11" fill="#374151">{spokes[i]}</text>
                </g>
            ))}
            <circle cx={hubX} cy={cy} r={hubR} fill="#dc2626" />
            <text x={hubX} y={cy + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">{centre}</text>
        </svg>
    );
};

// A small grid of cells, filled or empty, to show dense versus sparse.
export const CellGrid = ({ label, cols = 12, rows = 6, every, aria }: { label: string; cols?: number; rows?: number; every: number; aria?: string }) => (
    <div>
        <svg viewBox={`0 0 ${cols * 16} ${rows * 16}`} className="w-full" role="img" aria-label={aria ?? `${label}: one in ${every} cells holds data`}>
            {Array.from({ length: cols * rows }).map((_, i) => {
                const filled = every === 1 || (i * 7 + Math.floor(i / cols)) % every === 0;
                return <rect key={i} x={(i % cols) * 16 + 1} y={Math.floor(i / cols) * 16 + 1} width="14" height="14" rx="3" fill={filled ? "#dc2626" : "#f3f4f6"} />;
            })}
        </svg>
        <p className="mt-2 text-center text-xs font-medium text-gray-700">{label}</p>
    </div>
);

// ---------------------------------------------------------------------------
// Hero illustrations
// ---------------------------------------------------------------------------

const grad: Record<HeroKind, [string, string]> = {
    layers: ["#7f1d1d", "#dc2626"],
    grid: ["#312e81", "#dc2626"],
    bars: ["#9a3412", "#f97316"],
    hub: ["#0f172a", "#dc2626"],
    api: ["#1e293b", "#e11d48"],
    shield: ["#7f1d1d", "#f43f5e"],
    branch: ["#134e4a", "#dc2626"],
    doc: ["#4c1d95", "#e11d48"],
    swap: ["#111827", "#ea580c"],
    subset: ["#831843", "#dc2626"],
    check: ["#064e3b", "#dc2626"],
    size: ["#1f2937", "#dc2626"],
};

const W = "#fff";

const Motif = ({ kind }: { kind: HeroKind }) => {
    switch (kind) {
        case "layers":
            return (
                <g>
                    {["D", "I", "S", "C", "O"].map((l, i) => (
                        <g key={l}>
                            <rect x={250 + i * 14} y={46 + i * 46} width="300" height="38" rx="10" fill={W} opacity={0.18 + i * 0.12} />
                            <text x={274 + i * 14} y={72 + i * 46} fontSize="20" fontWeight="800" fill={W}>{l}</text>
                        </g>
                    ))}
                </g>
            );
        case "grid":
            return (
                <g>
                    {Array.from({ length: 60 }).map((_, i) => (
                        <rect key={`a${i}`} x={90 + (i % 10) * 26} y={70 + Math.floor(i / 10) * 26} width="20" height="20" rx="4" fill={W} opacity="0.85" />
                    ))}
                    {Array.from({ length: 60 }).map((_, i) => (
                        <rect key={`b${i}`} x={460 + (i % 10) * 26} y={70 + Math.floor(i / 10) * 26} width="20" height="20" rx="4" fill={W} opacity={(i * 7 + Math.floor(i / 10)) % 9 === 0 ? 0.9 : 0.14} />
                    ))}
                    <text x="400" y="170" textAnchor="middle" fontSize="28" fill={W} opacity="0.8">→</text>
                </g>
            );
        case "bars":
            return (
                <g>
                    {[120, 190, 90, 230, 150, 70, 110].map((h, i) => (
                        <rect key={i} x={170 + i * 66} y={290 - h} width="40" height={h} rx="8" fill={W} opacity={i === 3 ? 0.95 : 0.3} />
                    ))}
                    <polyline fill="none" stroke={W} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" points="190,160 256,110 322,190 388,60 454,130 520,200 586,170" />
                </g>
            );
        case "hub":
            return (
                <g>
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                        const a = (i * 60 - 90) * (Math.PI / 180);
                        const x = 400 + 150 * Math.cos(a), y = 160 + 100 * Math.sin(a);
                        return (
                            <g key={i}>
                                <line x1="400" y1="160" x2={x} y2={y} stroke={W} strokeWidth="2" opacity="0.5" strokeDasharray="5 5" />
                                <circle cx={x} cy={y} r="24" fill={W} opacity="0.35" />
                            </g>
                        );
                    })}
                    <circle cx="400" cy="160" r="52" fill={W} opacity="0.95" />
                </g>
            );
        case "api":
            return (
                <g>
                    {[120, 330, 540].map((x, i) => (
                        <g key={x}>
                            <rect x={x} y="110" width="140" height="100" rx="16" fill={W} opacity={0.2 + i * 0.2} />
                            <text x={x + 70} y="170" textAnchor="middle" fontSize="30" fontWeight="800" fill={W}>{["ID", "{ }", "200"][i]}</text>
                        </g>
                    ))}
                    {[270, 480].map((x) => <path key={x} d={`M${x + 6} 160 L${x + 54} 160`} stroke={W} strokeWidth="4" strokeLinecap="round" markerEnd="url(#hero-arrow)" />)}
                    <defs><marker id="hero-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#fff" /></marker></defs>
                </g>
            );
        case "shield":
            return (
                <g>
                    <path d="M400 36 L520 82 V170 C520 232 470 272 400 300 C330 272 280 232 280 170 V82 Z" fill={W} opacity="0.2" />
                    <path d="M400 62 L498 98 V170 C498 218 458 250 400 274 C342 250 302 218 302 170 V98 Z" fill={W} opacity="0.35" />
                    <path d="M350 168 L388 206 L452 130" fill="none" stroke={W} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            );
        case "branch":
            return (
                <g>
                    {[90, 160, 230].map((y, i) => (
                        <g key={y}>
                            <line x1="150" y1={y} x2="650" y2={y} stroke={W} strokeWidth="3" opacity="0.4" />
                            {[0, 1, 2, 3].map((k) => (
                                <circle key={k} cx={210 + k * 140 + i * 24} cy={y} r="11" fill={W} opacity={k === 3 ? 0.95 : 0.55} />
                            ))}
                        </g>
                    ))}
                    <path d="M290 90 C320 90 320 160 350 160" stroke={W} strokeWidth="3" fill="none" opacity="0.7" />
                    <path d="M520 160 C550 160 550 230 580 230" stroke={W} strokeWidth="3" fill="none" opacity="0.7" />
                </g>
            );
        case "doc":
            return (
                <g>
                    <rect x="290" y="30" width="220" height="270" rx="16" fill={W} opacity="0.92" />
                    <rect x="316" y="62" width="110" height="14" rx="5" fill="#dc2626" />
                    {[100, 126, 152, 190, 216, 242].map((y, i) => (
                        <rect key={y} x="316" y={y} width={i % 3 === 2 ? 110 : 168} height="9" rx="4" fill="#9ca3af" opacity="0.7" />
                    ))}
                </g>
            );
        case "swap":
            return (
                <g>
                    {Array.from({ length: 48 }).map((_, i) => (
                        <rect key={i} x={110 + (i % 8) * 28} y={70 + Math.floor(i / 8) * 28} width="22" height="22" rx="4" fill={W} opacity="0.3" />
                    ))}
                    <text x="400" y="178" textAnchor="middle" fontSize="40" fill={W}>⇢</text>
                    <rect x="500" y="100" width="200" height="120" rx="14" fill={W} opacity="0.92" />
                    <text x="600" y="172" textAnchor="middle" fontSize="26" fontWeight="800" fill="#dc2626">1 formula</text>
                </g>
            );
        case "subset":
            return (
                <g>
                    <circle cx="400" cy="160" r="130" fill={W} opacity="0.2" />
                    <circle cx="400" cy="160" r="62" fill={W} opacity="0.9" />
                    {Array.from({ length: 14 }).map((_, i) => {
                        const a = (i * 25.7) * (Math.PI / 180), r = 95 + (i % 3) * 14;
                        return <circle key={i} cx={400 + r * Math.cos(a)} cy={160 + r * 0.8 * Math.sin(a)} r="6" fill={W} opacity="0.55" />;
                    })}
                </g>
            );
        case "check":
            return (
                <g>
                    {[70, 140, 210].map((y, i) => (
                        <g key={y}>
                            <rect x="230" y={y} width="44" height="44" rx="10" fill={W} opacity={i < 2 ? 0.95 : 0.3} />
                            {i < 2 && <path d={`M240 ${y + 22} L252 ${y + 34} L268 ${y + 12}`} fill="none" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />}
                            <rect x="296" y={y + 8} width={[260, 210, 240][i]} height="12" rx="6" fill={W} opacity="0.7" />
                            <rect x="296" y={y + 28} width={[160, 130, 180][i]} height="9" rx="4" fill={W} opacity="0.35" />
                        </g>
                    ))}
                </g>
            );
        case "size":
            return (
                <g>
                    {[150, 120, 92, 66, 44].map((s, i) => (
                        <rect key={s} x={130 + i * 120 + (150 - s) / 2} y={160 - s / 2} width={s} height={s} rx="12" fill={W} opacity={0.95 - i * 0.14} />
                    ))}
                    {[230, 350, 470, 590].map((x) => <text key={x} x={x} y="168" textAnchor="middle" fontSize="26" fill={W}>→</text>)}
                </g>
            );
    }
};

export const HeroArt = ({ kind, label, className = "" }: { kind: HeroKind; label: string; className?: string }) => {
    const [a, b] = grad[kind];
    const id = `hero-${kind}`;
    return (
        <svg viewBox="0 0 800 320" className={`block w-full ${className}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={a} />
                    <stop offset="1" stopColor={b} />
                </linearGradient>
            </defs>
            <rect width="800" height="320" fill={`url(#${id})`} />
            <circle cx="720" cy="-20" r="150" fill="#fff" opacity="0.06" />
            <circle cx="60" cy="340" r="120" fill="#fff" opacity="0.06" />
            <Motif kind={kind} />
        </svg>
    );
};
