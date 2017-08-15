import Link from 'next/link'

export default () => (
  <nav>
    <Link href="https://github.com/AndyBitz"><a>Code</a></Link>
    <Link href="https://twitter.com/andybitz_"><a>Bird</a></Link>
    <Link href="#"><a>Art</a></Link>
    <Link href="#"><a>Mail</a></Link>
    <style jsx>
    {`
      nav {
        position: absolute; 
        bottom: 1em;
      }
      a {
        display: block;
        padding: .5em 1em;
        text-decoration: none;
        position: relative;
        color: rgba(0,0,0,.8);
        font-size: 1.2em;
        transition: padding 200ms ease-out;
      }
      a::after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        right: calc(100% - 3px);
        background-color: rgba(0,0,0,.8);
        transition: all 200ms ease-out;
      }
      a:hover {
        padding-left: 2em;
        color: rgba(255,255,255,.8);
      }
      a:hover::after {
        right: 0;
      }
    `}
    </style>
  </nav>
)