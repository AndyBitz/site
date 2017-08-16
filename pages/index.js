import { Component } from 'react'
import Link from 'next/link'
import { Motion, spring, presets } from 'react-motion'
import Page from '../layouts/page'
import Delay from '../components/delay'


export default class extends Component {
  state = { hasMounted: false }

  componentDidMount() {
    this.timeOut = setTimeout(() => this.setState({ hasMounted: true }), 200)
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut)
  }

  render() {
    return ( 
      <Page>
        { this.state.hasMounted ? <Content /> : '' }
      </Page>
    )
  }
}

const _content = [
  { icon: 0, text: 'Code', url: 'https://github.com/AndyBitz' },
  { icon: 1, text: 'Arts', url: '#' },
  { icon: 2, text: 'Bird', url: 'https://twitter.com/andybitz_' },
  { icon: 3, text: 'Mail', url: 'mailto:artzbitz@gmail.com' }
]

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
      y: 0
    }}
    style={{
      y: spring(index*2.5, presets.wobbly)
    }}
  >
    { styles => (
        <MenuItem url={item.url} y={styles.y}>
          <Circle>{ item.icon }</Circle>
          <Delay initial={0} value={5} period={220+(index*220)}>
          { val => (
            <Motion
              defaultStyle={{width: 0}}
              style={{width: spring(val)}}
            >
              { styles => <Text width={styles.width}>{ item.text }</Text> }
            </Motion>
          ) }
          </Delay>
        </MenuItem>
      )
    }
  </Motion>
)

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

const Circle = ({ children, scale=1, size=2, rotate=0, y=0, style={} }) => {
  const customStyle = {
    transform: `translateY(${y}em) scale(${scale}) rotate(${rotate}deg)`,
    height: `${size}em`,
    width: `${size}em`,
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
