import React from 'react';
import useSWR from 'swr';

import fetcher from './../../lib/ga/fetcher';
import MetricCard from './Card';

export type Instagram = {
    likes: number,
    followers: number
};

export default function InstagramStats() {

    const { data } = useSWR<Instagram>('/api/instagram_stats', fetcher);

    const likes = new Number(data?.likes);
    const followers = new Number(data?.followers);
    const link = 'https://instagram.com/thisumang';

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">

                <MetricCard
                    header="Instagram Followers"
                    link={link}
                    metric={followers}
                    isCurrency={false}
                />
                <MetricCard
                    header="Instagram Likes"
                    link={link}
                    metric={likes}
                    isCurrency={false}
                />
            </div>
        </div>
    );
}