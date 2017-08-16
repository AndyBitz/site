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
    this.timeOut = setTimeout(() => this.setState({ hasMounted: true }), 1000)
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
  { icon: ArtsSvg, text: 'Arts', url: '#' },
  { icon: FuckSvg, text: 'Bird', url: 'https://twitter.com/andybitz_' },
  { icon: MailSvg, text: 'Mail', url: 'mailto:artzbitz@gmail.com' }
]

const PreContent = () => (
  <Wrapper>
    <Circle />
  </Wrapper>
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
      y: 0,
      width: 0,
      opacity: 0
    }}
    style={{
      y: spring(index*2.5, presets.wobbly),
      width: spring(5, presets.wobbly),
      opacity: spring(1)
    }}
  >
    { styles => (
        <MenuItem url={item.url} y={styles.y}>
          <Delay initial={0} value={styles.opacity} period={100+(index*100)}>
            { val => <Circle>{ <item.icon style={{ opacity: val, ...iconStyle }} /> }</Circle> }
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
            position: absolute;
            display: flex;
            height: 2em;
            cursor: pointer;
            text-decoration: none;
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
          display: inline-flex;
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
          display: flex;
          align-items: center;
          overflow: hidden;
          white-space: nowrap;
          height: 2em;
        }
      `}
      </style>
    </span>
  )
}

const Profile = () => (
  <Motion defaultStyle={{y: 0, size: 2}} style={{y: spring(-10), size: spring(8, presets.wobbly)}}>
    {interpolatingStyle => <Circle
        y={interpolatingStyle.y}
        size={interpolatingStyle.size}
        children={<div><img src="/static/profile.png" /></div>}
      />
    }
  </Motion>
)
