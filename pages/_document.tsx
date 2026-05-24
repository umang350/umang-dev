import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="dark">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#0B0F19" />
          <link
            href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-dash-bg text-dash-text">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
