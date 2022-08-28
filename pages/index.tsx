import type { NextPage } from 'next'
import Hero from '../components/home/Hero'
import Page from '../components/utility/Page'

const Home: NextPage = () => {
  return (
  <Page currentPage="Home" meta={{ desc: "UMANG.DEV, one stop to all things Umang Chauhan. Find out insights from the statistics tab or know more about me from the About Me page. Whatever you do stay away from the 404 Page." }}>
    <Hero />
  </Page>
  )
}

export default Home
