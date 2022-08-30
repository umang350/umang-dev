import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "tailwindcss/tailwind.css";
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
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (<>
    <ThemeProvider attribute="class">
      <div className='bg-gray-50 dark:bg-black'>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  </>);
}

export default MyApp