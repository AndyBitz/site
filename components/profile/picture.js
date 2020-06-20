export default () => (
  <div>
    <img src="/profile.png" alt="" />   
  
    <style jsx>
    {`
      div {
        opacity: 0;
        width: 8rem;
        height: 8rem;
        overflow: hidden;
        border-radius: 100%;
        transform: scale(.2);
        background-color: #333;

        animation:
          picture .5s 1s forwards ease-in-out;
      }

      @keyframes picture {
        0% {
          opacity: 0;
          transform: scale(.2);
        }
        10% {
          opacity: 1;
          transform: scale(.2);
        }
        20% {
          opacity: 0;
          transform: scale(.2);
        }
        30% {
          opacity: 1;
          transform: scale(.2);
        }
        40% {
          opacity: 0;
          transform: scale(.2);
        }
        50% {
          opacity: 1;
          transform: scale(.2);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }


      img {
        opacity: 0;
        transform: translate(2rem, 3rem);

        animation:
          image 200ms 1.6s forwards ease-in-out;
      }

      @keyframes image {
        0% {
          opacity: 0;
          transform: translate(2rem, 3rem);
        }
        10% {
          opacity: 1;
          transform: translate(2rem, 3rem);
        }
        20% {
          opacity: 0;
          transform: translate(0, 0);
        }
        30% {
          opacity: 1;
        }
        40% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        60% {
          opacity: 0;
        }
        70% {
          opacity: 1;
        }
        100% {
          opacity: 1;
          transform: translate(0, 0);
        }
      }
    `}
    </style>
  </div>
)
