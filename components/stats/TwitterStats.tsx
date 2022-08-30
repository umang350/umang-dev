import React from 'react';
import useSWR from 'swr';
import fetcher from './../../lib/ga/fetcher';
import MetricCard from './Card';

export type Twitter = {
    followers: number,
    tweets: number
};

export default function InstagramStats() {

    const { data } = useSWR<Twitter>('/api/twitter_stats', fetcher);
    const followers = new Number(data?.followers) || 271;
    const tweets = new Number(data?.tweets) || 400;
    const link = 'https://twitter.com/thisumang';

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">

                <MetricCard
                    header="Twitter Followers"
                    link={link}
                    metric={followers ?? 271}
                    isCurrency={false}
                />
                <MetricCard
                    header="Twitter Tweets"
                    link={link}
                    metric={tweets ?? 400}
                    isCurrency={false}
                />
            </div>
        </div>
    );
}