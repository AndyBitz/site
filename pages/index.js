import { Component } from 'react'
import Link from 'next/link'
import { Motion, spring, presets } from 'react-motion'
import Page from '../layouts/page'
import Delay from '../components/delay'

import CodeSvg from '../components/code.svg'
import FuckSvg from '../components/twitter.svg'
import MailSvg from '../components/mail.svg'
import ArtsSvg from '../components/art.svg'

export default class extends Component {
  state = { hasMounted: false }

  componentDidMount() {
    this.timeOut = setTimeout(() => this.setState({ hasMounted: true }), 2750)
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut)
  }

  render() {
    return ( 
      <Page>
      { this.state.hasMounted ? <Content /> : <PreContent /> }
      </Page>
    )
  }
}

const _content = [
  { icon: CodeSvg, text: 'Code', url: 'https://github.com/AndyBitz' },
  { icon: ArtsSvg, text: 'Arts', url: 'https://dribbble.com/andybitz' },
  { icon: FuckSvg, text: 'Bird', url: 'https://twitter.com/andybitz_' },
  { icon: MailSvg, text: 'Mail', url: 'mailto:artzbitz@gmail.com' }
]

const PreContent = () => (
  <Wrapper>
    <Spinner />
  </Wrapper>
)

const Spinner = () => (
  <svg fill="#000000" height="24" viewBox="0 0 30 30" width="24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="12" stroke="black" fill="none" />
    <style jsx>
    {`
      circle {
        stroke-dasharray: 18 18;
        stroke-dashoffset: 0;
        stroke-width: 1px;
        animation:
          rotate 520ms 3 linear,
          finish 1000ms 1560ms forwards;
      }
      @keyframes rotate {
        from { stroke-dashoffset: 0; }
        to { stroke-dashoffset: 36; }
      }
      @keyframes finish {
        from { stroke-dasharray: 18 18; }
        to { stroke-dasharray: 0; }
      }
    `}
    </style>
  </svg>
)

const Content = () => (
  <Wrapper>
    <Profile />
    { _content.map(mapContent) }
  </Wrapper>
)

const mapContent = (item, index) => (
  <Motion
    key={index}
    defaultStyle={{
      y: -index*2.15, // unholy hack to reverse transform
      width: 0,
      opacity: 0
    }}
    style={{
      y: spring(index*1, presets.wobbly),
      width: spring(5, presets.wobbly),
      opacity: spring(1)
    }}
  >
    { styles => (
        <MenuItem url={item.url} y={styles.y}>
          <Delay initial={0} value={styles.opacity} period={100+(index*100)}>
            { val => <Circle style={{display: 'absolute'}}>
                { <item.icon style={{ opacity: val, ...iconStyle }} /> }
              </Circle> }
          </Delay>
          <Delay initial={0} value={styles.width} period={300+(index*220)}>
            { val => <Text width={val}>{ item.text }</Text> }
          </Delay>
        </MenuItem>
      )
    }
  </Motion>
)

const iconStyle = {
  fill: '#333',
  padding: '.4em'
}

const MenuItem = ({ y, url, children }) => {
  const customStyle = {
    transform: `translateY(${y}em)`
  }

  return (
    <Link href={url}>
      <a style={customStyle}>
        { children }
        <style jsx>
        {`
          a {
            display: flex;
            cursor: pointer;
            text-decoration: none;
            color: black;
            font-family: Roboto, sans-serif;
            transition:
              margin 200ms ease-out;
          }
          a:hover {
            margin-left: 1em;
          }
          a:hover :global(div) {
            background-color: #000;
          }
          a:hover :global(svg) {
            fill: #fff!important;
          }
        `}
        </style>
      </a>
    </Link>
  )
}

const Wrapper = ({ children }) => (
  <section>
    { children }
    <style jsx>
    {`
      section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        position: relative;
      }
    `}
    </style>
  </section>
)

const Circle = ({ children, opacity=1, scale=1, size=2, rotate=0, y=0, style={} }) => {
  const customStyle = {
    transform: `translateY(${y}em) scale(${scale}) rotate(${rotate}deg)`,
    height: `${size}em`,
    width: `${size}em`,
    opacity: opacity,
    ...style
  }

  return (
    <div style={customStyle}>
      { children }
      <style jsx>
      {`
        div {
          border-radius: 100%;
          border: 1px solid black;
          width: 2em;
          height: 2em;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background-color: white;
        }
      `}
      </style>
    </div>
  )
}

const Text = ({ children, width }) => {
  const style = {
    width: `${width}em`,
    paddingLeft: `${width/5}em`
  }

  return (
    <span style={style}>
      { children }
      <style jsx>
      {`
        span {
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          white-space: nowrap;
          height: 2em;
          border-bottom: 1px solid transparent;
          border-top: 1px solid transparent;
        }
      `}
      </style>
    </span>
  )
}

const Profile = () => (
  <Motion defaultStyle={{y: 2, size: 2}} style={{y: spring(-3), size: spring(9, presets.wobbly)}}>
    {interpolatingStyle => <Circle
        y={interpolatingStyle.y}
        size={interpolatingStyle.size}
        children={<ProfileImage />}
      />
    }
  </Motion>
)

const ProfileImage = () => (
  <div>
    <img src="/static/profile.png" />
    <style jsx>
    {`
      img {
        transform: scale(1.03);
      }
    `}
    </style>
  </div>
)