import useSWR from 'swr';

import fetcher from './../../lib/ga/fetcher';
import MetricCard from './Card';

export type GoogleAnalyticsStats = {
    pageViews: number,
    eventCount: number,
    active28DayUsers: number
};

export default function GoogleAnalyticsStats() {

    const { data } = useSWR<GoogleAnalyticsStats>('/api/get_google_insights', fetcher);

    const pageViews = new Number(data?.pageViews);
    const eventCount = new Number(data?.eventCount);
    const active28DayUsers = new Number(data?.active28DayUsers);
    const link = 'https://umang.dev';

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
                <MetricCard
                    header="Google Analytics Views"
                    link={link}
                    metric={pageViews}
                    isCurrency={false}
                />
                <MetricCard
                    header="Google Analytics Users"
                    link={link}
                    metric={active28DayUsers}
                    isCurrency={false}
                />
            </div>
        </div>
    );
}