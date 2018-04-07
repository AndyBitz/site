export default ({ icon, title, href, delay }) => (
  <li>
    <a href={href} target="_blank">
      <span style={{ animationDelay: `${delay * 200 + 1800}ms` }} className="icon">
        {icon}
      </span>
      <span style={{ animationDelay: `${delay * 250 + 1800}ms` }} className="title">
        {title}
      </span>
    </a>


    <style jsx>
    {`
      a {
        color: #333;
        position: relative;
        margin-bottom: 1rem;
        align-items: center;
        display: inline-flex;
        text-decoration: none;
      }

      a::after {
        right: 0;
        left: 100%;
        content: '';
        height: .4rem;
        bottom: .3rem;
        position: absolute;
        transition: all 80ms ease-in-out;
        background-color: rgba(255,0,0,.3);
      }

      a:hover::after {
        left: 20%;
      }

      span.icon {
        opacity: 0;
        margin-right: 1rem;
        display: inline-block;

        animation:
          icon 80ms 4 forwards ease-in-out;
      }

      @keyframes icon {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }


      span.title {
        opacity: 0;
        transform: translateX(100%);

        animation:
          title 180ms forwards ease-in-out;
      }

      @keyframes title {
        0% {
          opacity: 0;
          transform: translateX(100%);
        }
        100% {
          opacity: 1;
          transform: translateX(0%);
        }
      }
    `}
    </style>
  </li>
)
