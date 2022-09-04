import { routes } from "@/data/content/linker";
import MetricCard from './Card';
import useSWR from 'swr';

import fetcher from './../../lib/ga/fetcher';
import { useRouter } from "next/router";
import { YouTubeHeaders, YouTubeHeadersJA } from "@/data/statsHeaders";

export type YouTube = {
  subscriberCount: number;
  viewCount: number;
  hiddernSubscriberCount: boolean;
  videoCount: number;
};

var headers : {
  subscribers: string,
  views: string
};

function YoutubeSubCount() {

  const {locale} = useRouter();

  headers = locale === 'ja' ? YouTubeHeadersJA : YouTubeHeaders;

  const { data } = useSWR<YouTube>('/api/youtube_stats', fetcher);
  const subscriberCount = new Number(data?.subscriberCount);
  const viewCount = new Number(data?.viewCount);

  return (
    <div className="mt-10">

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
        <MetricCard
          header={headers.subscribers}
          link={routes[0].link}
          metric={subscriberCount}
          isText={false}
        />
        <MetricCard
          header={headers.views}
          link={routes[0].link}
          metric={(viewCount)}
          isText={false}
        />
      </div>
    </div>
  );
}

export default YoutubeSubCount;
