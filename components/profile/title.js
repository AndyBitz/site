export default () => (
  <div>
    <h1>
      <span>Andy</span>
    </h1>

    <style jsx>
    {`
      h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
        text-align: right;
        position: relative;
      }


      span {
        opacity: 0;
        display: block;
        transform: translateY(100%);

        animation:
          title 200ms 360ms forwards ease-in-out;
      }

      @keyframes title {
        0% {
          opacity: 0;
          transform: translateY(100%);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }


      h1::after {
        right: 0;
        top: 100%;
        left: 100%;
        content: '';
        height: 1px;
        display: block;
        position: absolute;
        background-color: #333;

        animation:
          line 260ms 100ms forwards ease-in-out;
      }

      @keyframes line {
        0% {
          left: 100%;
        }
        100% {
          left: 20%;
        }
      }


      h1::before {
        right: 0;
        left: 100%;
        content: '';
        height: .75rem;
        display: block;
        bottom: -.25rem;
        position: absolute;
        background-color: rgba(255,0,0,.3);

        animation:
          red-line 260ms 560ms forwards ease-in-out;
      }

      @keyframes red-line {
        0% {
          left: 100%;
        }
        100% {
          left: 30%;
        }
      }
    `}
    </style>
  </div>
)
