import styled, { css } from 'styled-components';
import { color, insetShadow, textShadowRed } from './common.style';

const BUTTON_RADIUS = css`
  border-radius: 7svw;
`;

export const Container = styled.div`
  display: flex;

  .title {
    position: fixed;
    top: 9svh;
    right: 8svw;

    img {
      width: 38svw;
    }
  }

  .buttons {
    position: fixed;
    top: 70svh;
    left: 50svw;
    transform: translateX(-50%);

    display: flex;
    gap: 2svw;

    button {
      background-color: ${color(1).main};

      border: none;

      color: ${color(1).white};
      font-size: 3.5svw;
      font-family: 'DNF';

      img {
        width: 5svw;
      }

      width: 27svw;
      height: 16svh;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2svw;

      ${BUTTON_RADIUS}

      position: relative;
      box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

      &::after {
        ${insetShadow}

        ${BUTTON_RADIUS}
        box-shadow: inset 0 0.5svh 0.4svh ${color(0.5).white};
      }

      &::before {
        ${insetShadow}

        ${BUTTON_RADIUS}
        box-shadow: inset 0 -0.5svh 0.4svh ${color(0.25).black};
      }
    }
  }
`;
