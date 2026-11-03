import { AboutMe } from '@/components/about/AboutMe'
import Page from '@/components/utility/Page'
import { routes } from "@/data/global"

const PageName = "About Me";
const About = () => {
    return (
        <Page currentPage={PageName} overlayNav meta={{
            desc: routes.find(i => i.title === PageName).description
        }}>
            <AboutMe />
        </Page>
    )

}

export default About