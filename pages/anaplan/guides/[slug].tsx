import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Article from "@/components/anaplan/Article";
import { bodies } from "@/components/anaplan/posts";
import { bodiesJa } from "@/components/anaplan/posts.ja";
import { guidesJa } from "@/data/anaplan/guides.ja";
import { guideBySlug, guides } from "@/data/anaplan/guides";

// Renders every guide whose body lives in components/anaplan/posts.tsx. The
// two older guides keep their own files, which take precedence over this route.

const GuidePage = ({ slug }: { slug: string }) => {
    const ja = useRouter().locale === "ja" && !!bodiesJa[slug];
    const g = guideBySlug(slug)!;
    const Body = ja ? bodiesJa[slug] : bodies[slug];
    const t = ja ? guidesJa[slug] : g;
    return (
        <Article slug={g.slug} kicker="Guide" title={t.title} desc={t.desc} published={g.published} readMinutes={g.readMinutes}>
            <Body />
        </Article>
    );
};

// Every locale gets the page (Japanese body under /ja); without
// naming the locales only the default one is built and /ja/... is a 404.
export const getStaticPaths: GetStaticPaths = async ({ locales = ["en"] }) => ({
    paths: locales.flatMap((locale) => guides.filter((g) => bodies[g.slug]).map((g) => ({ params: { slug: g.slug }, locale }))),
    fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({ props: { slug: params?.slug as string } });

export default GuidePage;
