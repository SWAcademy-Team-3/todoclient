import styled from "@emotion/styled";
import { useState } from "react";

const Donut = styled.div`
  @keyframes move {
    0% {
      background: conic-gradient(#bb254a 0% 0%, #f2f2f2 0% 100%);
    }
    25% {
      background: ${({ dataPercent }) => `
        conic-gradient(#bb254a 0% ${dataPercent / 4}%, #f2f2f2 ${
        dataPercent / 4
      }% 100%)
      `};
    }
    50% {
      background: ${({ dataPercent }) => `
        conic-gradient(#bb254a 0% ${dataPercent / 2}%, #f2f2f2 ${
        dataPercent / 2
      }% 100%)
      `};
    }
    75% {
      background: ${({ dataPercent }) => `
        conic-gradient(#bb254a 0% ${(dataPercent / 4) * 3}%, #f2f2f2 ${
        (dataPercent / 4) * 3
      }% 100%)
      `};
    }
    100% {
      background: ${({ dataPercent }) => `
        conic-gradient(#bb254a 0% ${dataPercent}%, #f2f2f2 ${dataPercent}% 100%)
      `};
    }
  }
  width: ${({ size }) => `${size}px`};
  padding-bottom: ${({ size }) => `${size}px`};
  margin: 0 auto;
  border-radius: 50%;
  position: relative;
  text-align: center;
  background: ${({ dataPercent }) => `
        conic-gradient(#bb254a 0% ${dataPercent}%, #f2f2f2 ${dataPercent}% 100%)
      `};
  animation: move 1000ms linear;
  ::before {
    color: black;
    width: 70%;
    height: 70%;
    background: ${({ background }) => `
      ${background ? "#e5a8a6" : "#fff"}
  `};
    border-radius: 50%;
    position: absolute;
    left: 15%;
    top: 15%;
    display: block;
    content: "${(props) => props.innerContent}";
    margin: auto;
    font-size: 4vw;
  }
`;

const ProgressRate = ({ rate = 50, size = 50, innerContent, background }) => {
  const [rateValue, setRateValue] = useState(rate);

  return (
    <Donut
      dataPercent={rateValue}
      size={size}
      innerContent={innerContent}
      background={background}
    ></Donut>
  );
};

export default ProgressRate;
