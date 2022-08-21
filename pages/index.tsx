import type { NextPage } from 'next'
import Hero from '../components/home/Hero'
import Page from '../components/utility/Page'

const Home: NextPage = () => {
  return (
  <Page currentPage="Home" meta={{ desc: "UMANG.DEV, one stop to all things Umang Chauhan" }}>
    <Hero />
  </Page>
  )
}

export default Home
