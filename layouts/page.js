import Head from 'next/head'

export default ({ title, children }) => {
  title = title || "hello ^•^/"

  return (
    <main>
      <Head>
        
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        <meta charset="utf-8" />

        <link rel="shortcut icon" href="/static/favicon.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
        <meta name="description" content="Programming, Design, Art and all the other things I love." />
        <meta name="robots" content="index, follow" />
        
        <title>{ title }</title>
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
