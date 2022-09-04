import { InstaHeaders, InstaHeadersJA } from '@/data/statsHeaders';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import fetcher from './../../lib/ga/fetcher';
import MetricCard from './Card';

export type Instagram = {
    posts: number,
    followers: number
};

var headers : {
    posts: string,
    followers: string
};


export default function InstagramStats() {

    const {locale} = useRouter();

    headers = locale === 'ja' ? InstaHeadersJA : InstaHeaders;

    const { data } = useSWR<Instagram>('/api/instagram_stats', fetcher);

    const posts = new Number(data?.posts);
    const followers = data?.followers;
    const link = 'https://instagram.com/thisumang';

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">

                <MetricCard
                    header={headers.followers}
                    link={link}
                    metric={followers}
                    isText={true}
                />
                <MetricCard
                    header={headers.posts}
                    link={link}
                    metric={posts}
                    isText={false}
                />
            </div>
        </div>
    );
}