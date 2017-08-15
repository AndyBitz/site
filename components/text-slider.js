import { Component } from 'react'

export default class extends Component {
  render() {
    return (
      <Slider
        data={this.props.data}
        active={this.props.active}
      />
    )
  }
}

const SliderItem = ({ data, isActive, isPrev }) => {
  let className = isActive
    ? 'active'
    : isPrev
    ? 'prev'
    : ''

  return (
    <li className={className}>
      { data }
      <style jsx>
      {`
        li {
          position: absolute;
          font-size: 1.5em;
          opacity: 0;
        }

        .active {
          animation: fade-in 175ms forwards;
        }

        .prev {
          opacity: 1;
          animation: fade-out 175ms forwards;
        }

        @keyframes fade-out {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(2em);
            opacity: 0;
          }
        }
        @keyframes fade-in {
          from {
            transform: translateY(-2em);
            opacity: 0
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}
      </style>
    </li>
  )
}

const Slider = ({ data, active }) => (
  <ul>
    {data.map((item, i) => {
      const isActive = active === i
      const isPrev = active-1 === i || active === 0 && i === data.length-1

      return (
        <SliderItem
          key={i}
          data={item}
          isActive={isActive}
          isPrev={isPrev}
        />
      )
    })}
    <style jsx>
    {`
      ul {
        position: relative;
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        height: 1.5em;
        padding: 1em 0;
      }
    `}
    </style>
  </ul>
)
