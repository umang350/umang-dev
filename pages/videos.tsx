import { VideosComponent } from '@/components/videos/VideosComponent'
import Page from '@/components/utility/Page'
import { routes } from "@/data/global"
import { useRouter } from "next/router"

const PageName = "Videos";

const Videos = () => {
    const { locale } = useRouter();

    return (
        <Page currentPage={PageName} meta={{
            desc: routes.find(i => i.title === PageName).description
        }}>
            <section className="animate-fadeUp">
                <div className="mb-6">
                    <p className="section-label">Content</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        {locale === "ja" ? "動画" : "Videos"}
                        <span className="gradient-text">.</span>
                    </h1>
                </div>
                <VideosComponent />
            </section>
        </Page>
    )
}

export default Videos
