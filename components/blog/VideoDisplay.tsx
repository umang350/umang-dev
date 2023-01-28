import { video } from "@/data/global";
import Image from "next/image";

export default function VideoCard({item}: {item: video}) {


  return (
    <div style={{width: "48%"}} className="flex flex-col m-1 items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
      <a
        aria-label={item.videoId}
        target="_blank"
        rel="noopener noreferrer"
        href={"https://www.youtube.com/watch?v="+item.videoId}
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
      <div className="flex flex-row mt-2 spacing-sm justify-center text-center">
        <Image src={item.thumbnail} alt={item.title} height="360" width="480" style={{clip: "rect(top: 40px,480px,316px,0px"}}/>
      </div>
      <p className="flex flex-row mt-2 spacing-sm text-black dark:text-white">
        {
            new Date(item.publishedAt).toLocaleTimeString()+", "+new Date(item.publishedAt).toLocaleDateString()
        }
      </p>
    </div>
  );
}