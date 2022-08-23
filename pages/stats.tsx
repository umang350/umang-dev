import YoutubeSubCount from '@/components/stats/YoutubeSubCount'
import Page from '../components/utility/Page'
import GitHubCard from '@/components/stats/GithubStats';

const About = ({ytData}) => {
    return (
        <Page currentPage="Statistics" meta={{
            desc: 'Deep dive into statistics'
        }}>
            <YoutubeSubCount />
            <GitHubCard />
        </Page>
    )

}

export default About