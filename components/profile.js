import TextSlider from './text-slider'

export const ProfileImage = () => (
  <div className="profile-image">
    <img src="/static/profile.png" />
    <style jsx>
    {`
      .profile-image {
        margin: 1em;
      }
      img {
        border-radius: 100%;
        box-shadow: 1px 6px 10px rgba(0,0,0,.1);
      }
    `}
    </style>
  </div>
)

export default () => (
  <section>
    <ProfileImage />
    <TextSlider />
  </section>
)
