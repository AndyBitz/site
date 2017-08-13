import { Component } from 'react'

export default class extends Component {
  state = {
    active: 0
  }

  data = ["text-1", "text-2", "text-3"]

  render() {
    return (
      <Slider data={this.data} active={this.state.active} />
    )
  }
}

const SliderItem = ({data, isActive}) => (
  <li className={isActive ? 'active' : ''}>
    {data}
    <style jsx>
    {`
      position: absolute;
      font-size: 1.5em;

      .active {
        background-color: green;
      }

      .active + li {
        animation: fade-out 300ms forwards;
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
    `}
    </style>
  </li>
)

const Slider = ({data, active}) => (
  <ul>
    {data.map((item, i) => {
      const isActive = (active == i)
      return (
        <SliderItem
          key={i}
          data={item}
          isActive={isActive}
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
