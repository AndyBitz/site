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
          display: grid;
          overflow: hidden;
          grid-template-rows: auto;
          grid-template-columns: 1fr;
        }
      `}
      </style>

      <style jsx global>
      {`
        html, body {
          margin: 0;
          padding: 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        body {
          color: #444;
          font-size: 16px;
          font-family: 'Roboto', sans-serif;
        }

        img {
          max-width: 100%;
        }

        ::-moz-selection {
          color: white;
          background-color: black;
        }

        ::selection {
          color: white;
          background-color: black;
        }


        @media (min-width: 768px) {
          body {
            font-size: 18px;
          }
        }
      `}
      </style>
    </main>
  )
}
