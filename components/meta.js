import Head from 'next/head'


export default ({ title="hello ^•^/", image="/static/og.png" }) => (
  <Head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />

    <link rel="shortcut icon" href="/static/favicon.png" />
    <meta name="theme-color" content="#ffffff" />

    <link rel="home" href="/" />

    <link rel="preload" href="/static/profile.png" as="image" crossorigin />

    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <meta name="description" content="Programming, Design, Art and all the other things I love." />
    <meta name="robots" content="index, follow" />

    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://andybitz.io" />
    <meta property="og:image" content={image} />

    <meta name="twitter:url" content="https://andybitz.io" />
    <meta name="twitter:title" content={title} />

    <title>{ title }</title>
  </Head>
)
