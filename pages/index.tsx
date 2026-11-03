import type { NextPage } from 'next'
import Hero from '../components/home/Hero'
import Page from '../components/utility/Page'
import { routes } from "@/data/global"
import HomeSections from '@/components/home/HomeSections';

const PageName = "Home";

const Home: NextPage = () => {
  return (
    <>
    <Page currentPage={PageName} meta={{ desc: routes.find(i => i.title === PageName).description }}>
      <Hero />
      <HomeSections />
    </Page></>
  )
}

export default Home
