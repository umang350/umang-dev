import YoutubeSubCount from '@/components/stats/YoutubeSubCount'
import Page from '../components/utility/Page'
import { callAPI } from "pages/api/youtube_stats";

export async function getServerSideProps(context) {
    const ytData = await callAPI();
    return {
      props: { ytData: ytData },
    };
}

const About = ({ytData}) => {
    return (
        <Page currentPage="Statistics" meta={{
            desc: 'Deep dive into statistics'
        }}>
            <YoutubeSubCount ytData={ytData}/>
        </Page>
    )

}

export default About