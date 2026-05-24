import YoutubeSubCount from '@/components/stats/YoutubeSubCount'
import Page from '../components/utility/Page'
import GitHubCard from '@/components/stats/GithubStats';
import TwitterStats from '@/components/stats/TwitterStats';
import GoogleAnalyticsStats from '@/components/stats/GoogleAnalyticsStats';
import { routes } from "@/data/global"
import { useRouter } from 'next/router';

const PageName = "Impact";

const Stats = () => {
    const { locale } = useRouter();

    return (
        <Page currentPage={PageName} meta={{
            desc: routes.find(i => i.title === PageName)?.description ?? "PM metrics and reach."
        }}>
            <section className="animate-fadeUp">
                <div className="mb-10">
                    <p className="section-label">Metrics</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        {locale === "ja" ? "インパクト" : "Impact"}
                        <span className="gradient-text">.</span>
                    </h1>
                    <p className="text-dash-muted text-[15px] leading-relaxed max-w-2xl">
                        {locale === "ja"
                            ? "コミュニティ構築、コンテンツ実験、オーディエンスリーチのライブメトリクス。プロダクトを数字を使ってどう考えるかの窓です。"
                            : "Live metrics on community building, content experimentation, and audience reach — a window into how I think about products with numbers."}
                    </p>
                </div>
                <div className="space-y-4">
                    <YoutubeSubCount />
                    <GitHubCard />
                    <TwitterStats />
                    <GoogleAnalyticsStats />
                </div>
            </section>
        </Page>
    )
}

export default Stats
