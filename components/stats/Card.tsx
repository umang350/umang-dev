import { randomNumberText } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function MetricCard({ header, link, metric, isText }) {
  const [count, setCount] = useState("0");
  const num: string = isText ? metric : metric.toString();

  useEffect(() => {
    randomNumberText(num, setCount);
  }, [num]);

  return (
    <div className="card-base card-accent-top noise p-5 max-w-72 w-full">
      <a
        aria-label={header}
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        className="flex items-center text-dash-muted text-sm font-medium hover:text-dash-acc transition-colors group"
      >
        {header}
        <svg
          className="h-3.5 w-3.5 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
      <p className="mt-2.5 text-3xl font-extrabold gradient-text tracking-tight">
        {
          !isText
            ? Number.isNaN(Number(count))
              ? '-'
              : Number(count).toLocaleString()
            : count
        }
      </p>
    </div>
  );
}
