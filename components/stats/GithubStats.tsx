import { GitHubHeaders, GitHubHeadersJA } from '@/data/statsHeaders';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import fetcher from './../../lib/ga/fetcher';
import MetricCard from './Card';

export type GitHub = {
    stars: number,
    followers: number
};

var headers : {
    stars: string,
    followers: string
};

export default function GitHubCard() {

    const {locale} = useRouter();

    headers = locale === 'ja' ? GitHubHeadersJA : GitHubHeaders;

    const { data } = useSWR<GitHub>('/api/github_stats', fetcher);

    const stars = new Number(data?.stars);
    const followers = new Number(data?.followers);
    const link = 'https://github.com/umang350';

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
                <MetricCard
                    header={headers.stars}
                    link={link}
                    metric={stars}
                    isText={false}
                />
                <MetricCard
                    header={headers.followers}
                    link={link}
                    metric={followers}
                    isText={false}
                />
            </div>
        </div>
    );
}