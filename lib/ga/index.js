// log the pageview with their URL
export const pageview = (url) => {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
  }
  
  // log specific events happening.
  export const event = ({ action, params }) => {
    if(typeof window !== "undefined" && window.gtag){
      window.gtag('event', action, params)
      
      // const measurement_id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
      // const api_secret = process.env.ANALYTICS_SECRET;
      
      // fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     client_id: process.env.CLIENT_ID,
      //     events: [{
      //       name: action,
      //       params: params,
      //     }]
      //   })
      // });
      
    }
  }
  

