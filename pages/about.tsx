
import { AboutMe } from '@/components/AboutMe'
import Page from '@/components/utility/Page'
const About = () => {
    return (
        <Page currentPage="About Me" meta={{
            desc: 'Find out more about me'
        }}>
            <AboutMe />
        </Page>
    )

}

export default About