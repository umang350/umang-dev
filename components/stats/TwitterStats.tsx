import React from 'react';
import useSWR from 'swr';

import fetcher from './../../lib/ga/fetcher';
import MetricCard from './Card';

export type Twitter = {
    followers: number
};

export default function InstagramStats() {

    const { data } = useSWR<Twitter>('/api/twitter_stats', fetcher);

    const likes = 0;
    const followers = new Number(data?.followers);
    const link = 'https://twitter.com/thisumang';

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">

                <MetricCard
                    header="Twitter Followers"
                    link={link}
                    metric={followers}
                    isCurrency={false}
                />
                <MetricCard
                    header="Twitter Likes"
                    link={link}
                    metric={likes}
                    isCurrency={false}
                />
            </div>
        </div>
    );
}