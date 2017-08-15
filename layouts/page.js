import Head from 'next/head'

export default ({ title, children }) => {
  title = title || "hello ^•^/"

  return (
    <main>
      <Head>
        <title>{ title }</title>
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i|Roboto+Mono" rel="stylesheet" />
      </Head>
      <style jsx global>
      {`
        html, body {
          margin: 0;
          padding: 0;
        }
        body {
          font-family: sans-serif;
          font-size: 16px;
          color: #444;
          overflow: hidden;
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
