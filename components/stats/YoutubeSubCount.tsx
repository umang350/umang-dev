import {routes} from "@/data/content/linker";
import MetricCard from './Card';
import useSWR from 'swr';

import fetcher from './../../lib/ga/fetcher';

export type YouTube = {
  subscriberCount: number;
  viewCount: number;
};

function YoutubeSubCount() {

  
  const { data } = useSWR<YouTube>('/api/youtube_stats', fetcher);
  const subscriberCount = new Number(data?.subscriberCount);
  const viewCount = new Number(data?.viewCount);

  return (
      <div className="mt-10">
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <MetricCard
            header="YouTube Subscribers"
            link={routes[0].link}
            metric={subscriberCount}
            isCurrency={false}
          />
          <MetricCard
            header="YouTube Views"
            link={routes[0].link}
            metric={(viewCount)}
            isCurrency={false}
          />
        </div>
      </div>
  );
}

export default YoutubeSubCount;
