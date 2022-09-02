
import { BlogComponent } from '@/components/blog/BlogComponent'
import Page from '@/components/utility/Page'
import { routes } from "@/data/global"

const PageName = "Blog";
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