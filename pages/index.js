import { Component } from 'react'
import { Motion, spring, presets } from 'react-motion'
import Page from '../layouts/page'
import Delay from '../components/delay'


export default class extends Component {
  render() {
    return ( 
      <Page>
        <Content />
      </Page>
    )
  }
}

const _content = [
  { icon: 0, text: 'Code' },
  { icon: 1, text: 'Art' },
  { icon: 2, text: 'Bird' },
  { icon: 3, text: 'Mail' }
]

const Content = () => (
  <Wrapper>
    <Motion defaultStyle={{y: 0, size: 2}} style={{y: spring(-10), size: spring(8, presets.wobbly)}}>
      {interpolatingStyle => <Circle
          y={interpolatingStyle.y}
          size={interpolatingStyle.size}
          children={<Profile />}
        />
      }
    </Motion>

    { _content.map((item, index) => (
      <Motion key={index} defaultStyle={{y: 0}} style={{y: spring(index*2.5, presets.wobbly)}}>
        {interpolatingStyle => <MenuItem
            y={interpolatingStyle.y}
            icon={item.icon}
            index={index}
            children={item.text}
          />
        }
      </Motion>
    )) }
  </Wrapper>
)

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

const Circle = ({ children, y=0, size=2, style={} }) => {
  const customStyle = {
    transform: `translateY(${y}em)`,
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
          background-color: #000;
          width: 2em;
          height: 2em;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          color: snow;
          overflow: hidden;
        }
      `}
      </style>
    </div>
  )
}

const MenuItem = ({ y=0, icon, children, index, style }) => {
  const customStyle = {
    transform: `translateY(${y}em)`,
    ...style
  }

  return (
    <a style={customStyle}>
      <Circle>{ icon }</Circle>
      <ItemText index={index}>{ children }</ItemText>
      <style jsx>
      {`
        a {
          position: absolute;
          display: flex;
          height: 2em;
          cursor: pointer;
        }
      `}
      </style>
    </a>
  )
}

const ItemText = ({ children, style, index }) => {
  const customStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    height: '2em',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    ...style
  }

  return (
    <Delay initial={0} value={5} period={220+(index*220)}>
      { delay => (
          <Motion defaultStyle={{width: 0}} style={{width: spring(delay, presets.wobbly)}}>
            {interpolatingStyle => <Text
                width={interpolatingStyle.width}
                children={children}
              />
            }
          </Motion>
        )
      }
    </Delay>
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
  <div>
    <img src="/static/profile.png" />
  </div>
)