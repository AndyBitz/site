// components
import ListItem from './list-item'

// vectors
import Arts from '../../vectors/art'
import Code from '../../vectors/code'
import Mail from '../../vectors/mail'
import Twitter from '../../vectors/twitter'


export default () => (
  <section>
    <div>
      <ul>
        <ListItem
          delay={1}
          title="Code"
          icon={<Code />}
          href="https://github.com/andybitz"
        />
        <ListItem
          delay={2}
          title="Art"
          icon={<Arts />}
          href="https://dribbble.com/andybitz/"
        />
        <ListItem
          delay={3}
          title="Twitter"
          icon={<Twitter />}
          href="https://twitter.com/andybitz_"
        />
        <ListItem
          delay={4}
          title="Mail"
          icon={<Mail />}
          href="mailto:artzbitz@gmail.com"
        />
      </ul>
    </div>

    <style jsx>
    {`
      section {
        margin: 1rem;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        margin-left: 3rem;
      }

      @media (min-width: 768px) {
        section {
          display: flex;
          justify-content: flex-end;
        }
      }
    `}
    </style>
  </section>
)
