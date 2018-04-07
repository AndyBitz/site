import Title from './title'
import Picture from './picture'

export default () => (
  <section>
    <Picture />
    <Title />


    <style jsx>
    {`
      section {
        margin: 1rem;
        margin-top: 20%;
        max-width: 25rem;
        min-height: 15rem;
      }
    `}
    </style>
  </section>
)
