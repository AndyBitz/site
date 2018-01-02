import Head from 'next/head'

const url = "https://andybitz.io"
const description = "Programming, Design, Art and all the other things I love."

export default ({ title="hello ^•^/", image="https://andybitz.io/static/og.png" }) => (
  <Head>
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />

    <link rel="shortcut icon" href="/static/favicon.png" />
    <meta name="theme-color" content="#ffffff" />

    <link rel="home" href="/" />

    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <meta name="robots" content="index, follow" />

    <meta name="description" content={description} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@andybitz_" />
    
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    <meta name="twitter:creator" content="@andybitz_" />
    <meta name="twitter:url" content={url} />

    <title>{ title }</title>
  </Head>
)
