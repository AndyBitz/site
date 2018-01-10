import Head from 'next/head'
import Meta from '../components/meta'
import Router from 'next/router'

// handle router events in google analytics
Router.onRouteChangeStart = (url) => {
  try {
    const tracker = window.ga.getAll()[0]
    tracker.set('page', url)
    tracker.send('pageview')
  } catch(err) {}
}

export default ({ title, children }) => {
  title = title || "hello ^•^/"

  return (
    <main>
      <Meta title={title} />
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-NQV94X');`}}></script>
      </Head>
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NQV94X" height="0" width="0" style={{visbilit: 'hidden', display: 'none' }}></iframe></noscript>
      <style jsx>
      {`
        main {
          overflow: hidden;
          width: 100vw;
          min-height: 100vh;
        }
      `}
      </style>
      <style jsx global>
      {`
        html, body {
          margin: 0;
          padding: 0;
          min-height: 100%;
        }
        body {
          font-family: sans-serif;
          font-size: 16px;
          color: #444;
        }
        img {
          max-width: 100%;
        }
      `}
      </style>
      { children }
    </main>
  )
}
