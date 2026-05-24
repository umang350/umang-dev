import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes';

import * as ga from '../lib/ga'
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (<>
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <div className='bg-dash-bg min-h-screen'>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  </>);
}

export default MyApp
