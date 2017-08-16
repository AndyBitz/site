import Head from 'next/head'

export default ({ title, children }) => {
  title = title || "hello ^•^/"

  return (
    <main>
      <Head>
        <title>{ title }</title>
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i|Roboto+Mono" rel="stylesheet" />
      </Head>
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
