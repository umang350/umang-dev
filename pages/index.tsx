import type { NextPage } from 'next'
import Hero from '../components/home/Hero'
import Page from '../components/utility/Page'
import { routes } from "@/data/global"
import HomeSections from '@/components/home/HomeSections';
import Journey from '@/components/home/Journey';
import { getSubstackPosts, Post } from '@/lib/substack';

const PageName = "Home";

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
    <Page currentPage={PageName} overlayNav meta={{ desc: routes.find(i => i.title === PageName).description }}>
      <Journey>
        <Hero />
        <HomeSections posts={posts} />
      </Journey>
    </Page></>
  )
}

// Posts come from the Substack feed, refreshed at most hourly.
export const getStaticProps = async () => ({
  props: { posts: await getSubstackPosts() },
  revalidate: 3600,
})

export default Home
