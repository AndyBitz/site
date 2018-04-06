import Head from 'next/head'
import Router from 'next/router'
import Meta from '../components/meta'


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
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-80032381-1"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-80032381-1');`}}>
        </script>
      </Head>

      {children}

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
          color: #444;
          font-size: 16px;
          font-family: sans-serif;
        }

        img {
          max-width: 100%;
        }
      `}
      </style>
    </main>
  )
}
