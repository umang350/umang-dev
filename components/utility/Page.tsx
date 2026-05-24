import Footer from "../global/Footer";
import Head from "next/head";
import MobileNavbar from "../global/MobileNavbar";
import Navbar from "../global/Navbar";
import React from "react";
import Script from "next/script";

function Page({ currentPage, meta: { title, desc }, children }: PageProps) {
  const pageTitle = `${currentPage === "Home"
    ? "Umang Chauhan - Product Manager | Strategy & Builder"
    : `${currentPage} - UMANG.dev`
    }`;
  return (
    <div className="flex min-h-screen bg-dash-bg text-dash-text">
      <Head>
        <title>{pageTitle}</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#818CF8" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#0B0F19" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#0B0F19" />

        <link rel="alternate" href="https://umang.dev" hrefLang="x-default" />
        <link rel="alternate" href="https://umang.dev" hrefLang="en" />
        <link rel="alternate" href="https://umang.dev/ja" hrefLang="ja" />

        <meta name="title" content={pageTitle} />
        <meta name="description" content={desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://umang.dev/" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="https://umang.dev/misc/og.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://umang.dev/" />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={desc} />
        <meta property="twitter:image" content="https://umang.dev/misc/og.png" />
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KG4HCXQ');`,
        }}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=GTM-KG4HCXQ`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* Sidebar — desktop only */}
      <div className="hidden lg:block">
        <Navbar currentPage={currentPage} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Mobile header */}
        <div className="block lg:hidden sticky top-0 z-50">
          <MobileNavbar />
        </div>

        <main className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Page;

type PageProps = {
  currentPage: string;
  meta: {
    title?: string;
    desc: string;
  };
  children?: JSX.Element | JSX.Element[];
};
