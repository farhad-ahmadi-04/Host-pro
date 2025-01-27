import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;

      @media (max-width: 800px) {
        font-size: 2rem;
      }
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      @media (max-width: 800px) {
        font-size: 1.7rem;
      }
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      @media (max-width: 800px) {
        font-size: 1.7rem;
      }
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 500;
      text-align: center;
      @media (max-width: 800px) {
        font-size: 2rem;
      }
    `}
  line-height: 1.4;
`;

export default Heading;
