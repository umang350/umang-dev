import type { NextPage } from 'next'
import Hero from '../components/home/Hero'
import Page from '../components/utility/Page'
import { routes } from "@/data/global"
import Starfield from '@/components/home/Starfield';

const PageName = "Home";

const Beta: NextPage = () => {
  return (
    <>
    <Page currentPage={PageName} meta={{ desc: routes.find(i => i.title === PageName).description }}>
    <Starfield />
      <Hero />
    </Page></>
  )
}

export default Beta
