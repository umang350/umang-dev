import YoutubeSubCount from '@/components/stats/YoutubeSubCount'
import Page from '../components/utility/Page'
import GitHubCard from '@/components/stats/GithubStats';
import InstagramStats from '@/components/stats/InstagramStats';
import TwitterStats from '@/components/stats/TwitterStats';
import GoogleAnalyticsStats from '@/components/stats/GoogleAnalyticsStats';

const About = ({ytData}) => {
    return (
        <Page currentPage="Statistics" meta={{
            desc: 'Deep dive into statistics'
        }}>
            <YoutubeSubCount />
            <GitHubCard />
            <InstagramStats />
            <TwitterStats />
            <GoogleAnalyticsStats/>
        </Page>
    )

}

export default About