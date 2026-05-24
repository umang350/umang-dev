import type { NextPage } from 'next'
import Hero from '../components/home/Hero'
import FeaturedWork from '../components/home/FeaturedWork'
import Page from '../components/utility/Page'
import { routes } from "@/data/global"

const PageName = "Home";

const Home: NextPage = () => {
  return (
    <Page currentPage={PageName} meta={{ desc: routes.find(i => i.title === PageName).description }}>
      <Hero />
      <FeaturedWork />
    </Page>
  )
}

export default Home
