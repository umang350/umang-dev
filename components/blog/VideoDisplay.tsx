import { video } from "@/data/global";
import Image from "next/image";
import { useRouter } from "next/router";

export default function VideoCard({ item }: { item: video }) {


  const { locale } = useRouter();
  
  return (
    <div className="flex flex-col m-1 sm:basis-[48%] md:basis-[24%] items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
      <a
        aria-label={item.videoId}
        target="_blank"
        rel="noopener noreferrer"
        href={"https://www.youtube.com/watch?v=" + item.videoId}
        className="transition duration-150 ease-in-out"
        data-bs-toggle="tooltip" 
        title={
          '🖥️'+ Number(item.statistics.viewCount).toLocaleString() + ' 👍'+ Number(item.statistics.likeCount).toLocaleString() + ' 🕰️' + timeAgo(item.publishedAt, locale)
        }
      >
        <div className="flex flex-row items-center text-gray-900 dark:text-gray-100">
          {item.title}
          <svg
            className="h-4 w-4 ml-1"
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
      <div className="flex flex-row mt-auto spacing-sm justify-center text-center">
        <Image src={item.thumbnail} alt={item.title} height="360" width="480" style={{ clipPath: "inset(20px 0px 20px 0px)" }} />
      </div>
      <p className="flex flex-row justify-end spacing-sm text-sm text-black dark:text-white -mt-4" style={{ alignContent: "flex-end" }}>
        <p className="mr-auto">{'🖥️'+ Number(item.statistics.viewCount).toLocaleString() + ' 👍'+ Number(item.statistics.likeCount).toLocaleString() + ' 🕰️'}</p>
        <a href={'/yt/'+item.videoId} className="transition duration-150 ease-in-out ml-auto "
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
  const formatter = new Intl.RelativeTimeFormat(locale==="ja" ? 'ja' :'en');
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