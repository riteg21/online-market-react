import styled from "styled-components";

const Card = ({ cardNumber, cardExpiry, cardCvc, cardHolderName }) => {
  return (
    <StyledWrapper>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="heading_8264">MASTERCARD</p>
            <svg
              className="logo"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width={72}
              height={72}
              viewBox="0 0 48 48"
            >
              <path
                fill="#ff9800"
                d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
              />
              <path
                fill="#d50000"
                d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
              />
              <path
                fill="#ff3d00"
                d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
              />
            </svg>

            <svg
              version="1.1"
              className="contactless"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
              viewBox="0 0 50 50"
              xmlSpace="preserve"
            >
              {" "}
              <image
                id="image0"
                width={50}
                height={50}
                x={0}
                y={0}
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
              AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
              cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAADDklEQVRYw+1XS0iUURQ+f5qPyjQf
              lGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/F
              fPeMM/MLt99/NuHdfPd888/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xN
              GQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC+Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49it
              VoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJk
              HpNZgSkyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15z
              bkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6g
              DJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJ
              qSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKB
              sSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71Amz
              Z+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uX
              XSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUi
              cUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaI
              nKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBK
              xDyxm9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDIt
              MTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5
              OjU2KzAwOjAw0ssWdwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0xM1QwODoxOTo1Nisw
              MDowMIXeN6gAAAAASUVORK5CYII="
              />
            </svg>
            <p className="number">{cardNumber}</p>
            <p className="valid_thru">VALID THRU</p>
            <p className="date_8264">{cardExpiry}</p>
            <p className="name uppercase">{cardHolderName}</p>
          </div>
          <div className="flip-card-back">
            <div className="strip" />
            <div className="mstrip" />
            <div className="sstrip">
              <p className="code">{cardCvc}</p>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 480px;
    height: 308px;
    perspective: 1000px;
    color: white;
    font-family: Arial, sans-serif;
  }

  .heading_8264 {
    position: absolute;
    letter-spacing: 0.2em;
    font-size: 16px;
    top: 20px;
    left: 300px;
    margin: 0;
  }

  .logo {
    position: absolute;
    top: 60px;
    left: 30px;
  }

  .contactless {
    position: absolute;
    top: 75px;
    left: 390px;
  }

  .number {
    position: absolute;
    font-weight: bold;
    font-size: 24px;
    top: 160px;
    left: 40px;
    margin: 0;
    letter-spacing: 2px;
  }

  .valid_thru {
    position: absolute;
    font-weight: bold;
    font-size: 10px;
    top: 200px;
    left: 40px;
    margin: 0;
  }

  .date_8264 {
    position: absolute;
    font-weight: bold;
    font-size: 18px;
    top: 215px;
    left: 40px;
    margin: 0;
    letter-spacing: 1px;
  }

  .name {
    position: absolute;
    font-weight: bold;
    font-size: 18px;
    top: 250px;
    left: 40px;
    margin: 0;
    letter-spacing: 1px;
  }

  .strip {
    position: absolute;
    background-color: black;
    width: 100%;
    height: 40px;
    top: 30px;
    background: repeating-linear-gradient(
      45deg,
      #303030,
      #303030 10px,
      #202020 10px,
      #202020 20px
    );
  }

  .mstrip {
    position: absolute;
    background-color: rgb(255, 255, 255);
    width: 200px;
    height: 30px;
    top: 90px;
    left: 30px;
    border-radius: 5px;
  }

  .sstrip {
    position: absolute;
    background-color: rgb(255, 255, 255);
    width: 100px;
    height: 30px;
    top: 90px;
    left: 250px;
    border-radius: 5px;
  }

  .code {
    font-weight: bold;
    text-align: center;
    margin: 5px 0;
    color: black;
    font-size: 18px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 20px;
  }

  .flip-card-front {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
    background-color: oklch(55.1% 0.027 264.364);
  }

  .flip-card-back {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
    background-color: oklch(55.1% 0.027 264.364);
    transform: rotateY(180deg);
  }
`;

export default Card;
