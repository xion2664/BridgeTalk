import styled from 'styled-components';
import { color } from './common.style';

export const Background = styled.div`
  /* background-image: url('/assets/img/parent_bg.png'); */
  /* background-size: cover;
  background-position-x: 30%; */
  background-color: ${color(0.8).sub};
  width: 100svw;
  height: 100svh;

  display: flex;
  justify-content: start;

  overflow: hidden;

  .outline {
    width: 90svw;
    height: 100%;

    background-color: rgb(240, 240, 240);
    border-left: 0.5svw solid ${color(1).bright};

    border-top-left-radius: 3svw;
    border-bottom-left-radius: 3svw;

    box-shadow: -0.5svw 0 0.8svw ${color(0.3).black};

    background-image: url('/assets/img/parent_bg.png');
    background-size: cover;
    background-position-x: 30%;

    position: relative;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';

      background-color: ${color(1).bright};
      opacity: 0;
      z-index: -1;
    }

    padding: 2svh 2svw;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lang {
    position: fixed;
    top: 3svh;
    right: 2svw;

    background-color: transparent;
    border: none;

    cursor: pointer;

    img {
      width: 5svw;
    }
  }
`;

export const Navbar = styled.div`
  height: 100svh;
  width: 10svw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2svh;

  button {
    background-color: transparent;
    border: none;

    width: 100%;
    height: 15svh;

    img {
      cursor: pointer;

      transition: all 0.2s;

      width: 5svw;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;
