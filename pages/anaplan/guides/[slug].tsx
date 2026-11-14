import type { GetStaticPaths, GetStaticProps } from "next";
import Article from "@/components/anaplan/Article";
import { bodies } from "@/components/anaplan/posts";
import { guideBySlug, guides } from "@/data/anaplan/guides";

// Renders every guide whose body lives in components/anaplan/posts.tsx. The
// two older guides keep their own files, which take precedence over this route.

const GuidePage = ({ slug }: { slug: string }) => {
    const g = guideBySlug(slug)!;
    const Body = bodies[slug];
    return (
        <Article slug={g.slug} kicker="Guide" title={g.title} desc={g.desc} published={g.published} readMinutes={g.readMinutes}>
            <Body />
        </Article>
    );
};

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: guides.filter((g) => bodies[g.slug]).map((g) => ({ params: { slug: g.slug } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({ props: { slug: params?.slug as string } });

export default GuidePage;
