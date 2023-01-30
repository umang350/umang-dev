
import { VideosComponent } from '@/components/videos/VideosComponent'
import Page from '@/components/utility/Page'
import { routes } from "@/data/global"

const PageName = "Videos";
const Videos = () => {
    return (
        <Page currentPage={PageName} meta={{
            desc: routes.find(i => i.title === PageName).description
        }}>
            <VideosComponent />
        </Page>
    )

}

export default Videos