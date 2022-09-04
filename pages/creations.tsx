import Page from '@/components/utility/Page'
import { routes } from "@/data/global"
import Page404 from './404';

const PageName = "Creations";
const Creations = () => {
    return (
        // <Page currentPage={PageName} meta={{
        //     desc: routes.find(i => i.title === PageName).description
        // }}>
        // </Page>
        
        <Page404/>
    )

}

export default Creations