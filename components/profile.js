import { Component } from 'react'
import TextSlider from './text-slider'

export const ProfileImage = ({ onClick }) => (
  <div className="profile-image" onClick={onClick}>
    <img src="/static/profile.png" />
    <style jsx>
    {`
      .profile-image {
        margin: auto;
        margin-top: 1em;
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
    active: 0
  }

  data = ["text-1", "text-2", "text-3"]

  nextSlider() {
    let next = this.state.active+1
    if (next >= this.data.length)
      next = 0

    this.setState({ active: next })
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
