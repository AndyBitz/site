import { Component } from 'react'
import TextSlider from './text-slider'

import textData from './texts'

export const ProfileImage = ({ onClick }) => (
  <div className="profile-image" onClick={onClick}>
    <img src="/static/profile.png" />
    <style jsx>
    {`
      .profile-image {
        margin: auto;
        margin-top: 2em;
        max-width: 10em;
      }
      img {
        border-radius: 100%;
        box-shadow: 1px 6px 10px rgba(0,0,0,.1);
        cursor: pointer;
        transition: box-shadow 200ms ease-out;
      }
      img:active {
        box-shadow: 1px 15px 10px rgba(0,0,0,.1);
      }

      @media (min-width: 800px) {
        .profile-image {
          margin-top: 4em;
          max-width: 14em;
        }
      }
    `}
    </style>
  </div>
)

export default class extends Component {
  constructor(props) {
    super(props)
    this.nextSlider = this.nextSlider.bind(this)
  }

  state = {
    active: 4
  }

  data = textData

  nextSlider() {
    let next = this.state.active+1
    if (next >= this.data.length)
      next = 0

    this.setState({ active: next })
  }

  createInterval() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <section>
        <ProfileImage 
          onClick={() => this.nextSlider()}
        />
        <TextSlider
          active={this.state.active}
          data={this.data}
        />
      </section>
    )
  }
}
