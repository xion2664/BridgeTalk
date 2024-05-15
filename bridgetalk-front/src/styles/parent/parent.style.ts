import styled from 'styled-components';
import { color } from './common.style';

export const Background = styled.div`
  /* background-image: url('/assets/img/parent_bg.png'); */
  /* background-size: cover;
  background-position-x: 30%; */
  background-color: ${color(1).sub};
  width: 100svw;
  height: 100svh;

  display: flex;
  justify-content: start;

  overflow: hidden;

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
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    background-color: transparent;
    border: none;

    width: 100%;
    height: 15svh;

    img {
      cursor: pointer;

      transition: all 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;
