import YoutubeSubCount from '@/components/stats/YoutubeSubCount'
import Page from '../components/utility/Page'
import GitHubCard from '@/components/stats/GithubStats';
import InstagramStats from '@/components/stats/InstagramStats';
import TwitterStats from '@/components/stats/TwitterStats';
import GoogleAnalyticsStats from '@/components/stats/GoogleAnalyticsStats';
import { routes } from "@/data/global"

const PageName = "Statistics";

const About = () => {
    return (
        <Page currentPage={PageName} meta={{
            desc: routes.find(i => i.title === PageName).description
        }}>
            <YoutubeSubCount />
            <GitHubCard />
            <InstagramStats />
            <TwitterStats />
            <GoogleAnalyticsStats />
        </Page>
    )

}

export default About