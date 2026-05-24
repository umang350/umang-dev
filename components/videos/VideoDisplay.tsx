import { video } from "@/data/global";
import Image from "next/image";
import { useRouter } from "next/router";

export default function VideoCard({ item }: { item: video }) {
  const { locale } = useRouter();

  return (
    <div className="card-base noise flex flex-col m-1 sm:basis-[48%] md:basis-[24%] items-center p-4">
      <a
        aria-label={item.videoId}
        target="_blank"
        rel="noopener noreferrer"
        href={"https://www.youtube.com/watch?v=" + item.videoId}
        className="transition-colors hover:text-dash-acc group"
        data-bs-toggle="tooltip"
        title={
          '🖥️' + Number(item.statistics.viewCount).toLocaleString() + ' 👍' + Number(item.statistics.likeCount).toLocaleString() + ' 🕰️' + timeAgo(item.publishedAt, locale)
        }
      >
        <div className="flex flex-row items-center text-dash-text text-sm font-medium">
          {item.title}
          <svg
            className="h-3.5 w-3.5 ml-1.5 opacity-50 group-hover:opacity-100 flex-shrink-0"
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
        </div>
      </a>
      <div className="flex flex-row mt-auto justify-center text-center">
        <Image src={item.thumbnail} alt={item.title} height="360" width="480" className="rounded-lg mt-3" style={{ clipPath: "inset(20px 0px 20px 0px)" }} />
      </div>
      <p className="flex flex-row justify-end text-xs text-dash-muted -mt-4 w-full" style={{ alignContent: "flex-end" }}>
        <span className="mr-auto">{'🖥️' + Number(item.statistics.viewCount).toLocaleString() + ' 👍' + Number(item.statistics.likeCount).toLocaleString() + ' 🕰️'}</span>
        <a href={'/yt/' + item.videoId} className="hover:text-dash-acc transition-colors ml-auto"
          data-bs-toggle="tooltip" title={
            new Date(item.publishedAt).toLocaleTimeString() + ", " + new Date(item.publishedAt).toLocaleDateString()
          }>{
            timeAgo(item.publishedAt, locale)
          }</a>
      </p>
    </div>
  );
}

function timeAgo(input: any, locale: string) {
  const date = (input instanceof Date) ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat(locale === "ja" ? 'ja' : 'en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key! as Intl.RelativeTimeFormatUnit);
    }
  }
}
