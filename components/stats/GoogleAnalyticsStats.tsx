import { useRouter } from 'next/router';
import useSWR from 'swr';
import { GoogleHeadersJA, GoogleHeaders } from '@/data/statsHeaders';

import fetcher from './../../lib/ga/fetcher';
import MetricCard from './Card';

export type GoogleAnalyticsStats = {
    pageViews: number,
    eventCount: number,
    active28DayUsers: number
};

var headers : {
    views: string,
    users: string
};

export default function GoogleAnalyticsStats() {

    const { locale } = useRouter();
    headers = locale === 'ja' ? GoogleHeadersJA : GoogleHeaders;

    const { data } = useSWR<GoogleAnalyticsStats>('/api/get_google_insights', fetcher);

    const pageViews = new Number(data?.pageViews);
    const active28DayUsers = new Number(data?.active28DayUsers);
    const link = 'https://umang.dev';

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
                <MetricCard
                    header={headers.views}
                    link={link}
                    metric={pageViews}
                    isText={false}
                />
                <MetricCard
                    header={headers.users}
                    link={link}
                    metric={active28DayUsers}
                    isText={false}
                />
            </div>
        </div>
    );
}