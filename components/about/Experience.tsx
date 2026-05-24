import { experience, experienceJA } from "@/data/content/about";
import { useRouter } from "next/router";

export const Experience = () => {
  const { locale } = useRouter();
  const experienceData = (locale === "ja" ? experienceJA : experience).sort(
    (item1, item2) => Number(item2.key) - Number(item1.key)
  );

  return (
    <div className="relative pl-5">
      {/* Timeline line */}
      <div
        className="absolute left-1 top-1.5 bottom-1.5 w-px"
        style={{ background: "linear-gradient(180deg, #818CF8, #262D3D)" }}
      />

      {experienceData.map((item, index) => {
        const isCurrent = index === 0;
        return (
          <div key={item.key} className={`relative ${index < experienceData.length - 1 ? "mb-6" : ""}`}>
            {/* Dot */}
            <div
              className={`absolute -left-[16px] top-1.5 w-[9px] h-[9px] rounded-full border-2 ${
                isCurrent
                  ? "bg-dash-acc border-dash-acc shadow-[0_0_10px_rgba(129,140,248,0.5)]"
                  : "bg-dash-border border-dash-border"
              }`}
            />

            <div className="flex items-center gap-2.5 mb-1">
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded font-monospace ${
                  isCurrent
                    ? "bg-dash-acc/15 text-dash-acc"
                    : "bg-dash-muted/10 text-dash-muted"
                }`}
              >
                {item.year}
              </span>
              <span className="text-[14px] font-semibold text-dash-text">{item.title}</span>
            </div>
            <a
              href={item.companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-dash-muted hover:text-dash-acc transition-colors"
            >
              {item.company}
            </a>
            <p className="text-xs text-dash-muted mt-1 leading-relaxed">{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
};
