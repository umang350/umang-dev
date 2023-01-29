
import { BlogComponent } from '@/components/blog/BlogComponent'
import Page from '@/components/utility/Page'
import { routes } from "@/data/global"

const PageName = "Videos";
const Blog = () => {
    return (
        <Page currentPage={PageName} meta={{
            desc: routes.find(i => i.title === PageName).description
        }}>
            <BlogComponent />
        </Page>
    )

}

export default Blog