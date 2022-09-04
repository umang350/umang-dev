import { TwitterHeaders, TwitterHeadersJA } from '@/data/statsHeaders';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import fetcher from './../../lib/ga/fetcher';
import MetricCard from './Card';

export type Twitter = {
    followers: number,
    tweets: number
};

var headers : {
    followers: string,
    tweets: string
};

export default function InstagramStats() {
    
    const {locale} = useRouter();

    headers = locale === 'ja' ? TwitterHeadersJA : TwitterHeaders;

    const { data } = useSWR<Twitter>('/api/twitter_stats', fetcher);
    const followers = new Number(data?.followers) || 271;
    const tweets = new Number(data?.tweets) || 406;
    const link = 'https://twitter.com/thisumang';

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
                {
                    data && (
                        <><MetricCard
                            header={headers.followers}
                            link={link}
                            metric={followers}
                            isText={false}
                        />
                            <MetricCard
                                header={headers.tweets}
                                link={link}
                                metric={tweets}
                                isText={false}
                            /></>)
                }
                {
                    !data && (
                        <>
                            <MetricCard
                                header={headers.followers}
                                link={link}
                                metric={"270+"}
                                isText={true}
                            />
                            <MetricCard
                                header={headers.tweets}
                                link={link}
                                metric={"400+"}
                                isText={true}
                            />
                        </>)
                }


            </div>
        </div>
    );
}