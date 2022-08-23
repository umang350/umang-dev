import useSWR from 'swr';

import fetcher from './../../lib/ga/fetcher';
import MetricCard from './Card';

export type GitHub = {
    stars: number,
    followers: number
};

export default function GitHubCard() {

    const { data } = useSWR<GitHub>('/api/github_stats', fetcher);

    const stars = new Number(data?.stars);
    const followers = new Number(data?.followers);
    const link = 'https://github.com/umang350';

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
                <MetricCard
                    header="GitHub Stars"
                    link={link}
                    metric={stars}
                    isCurrency={false}
                />
                <MetricCard
                    header="GitHub Followers"
                    link={link}
                    metric={followers}
                    isCurrency={false}
                />
            </div>
        </div>
    );
}