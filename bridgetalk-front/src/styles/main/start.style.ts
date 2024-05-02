import styled, { css } from 'styled-components';
import { color, insetShadow, textShadowRed } from './common.style';

const BUTTON_RADIUS = css`
  border-radius: 7svw;
`;

export const Container = styled.div`
  display: flex;

  .title {
    position: fixed;
    top: 11.2svh;
    right: 8svw;

    img {
      width: 38.9svw;
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
      font-size: 3.3svw;
      font-family: 'DNF';

      img {
        width: 4svw;
      }

      width: 28.8svw;
      height: 17.8svh;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5svw;

      ${BUTTON_RADIUS}

      position: relative;
      box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

      &::after {
        ${insetShadow}

        ${BUTTON_RADIUS}
        box-shadow: inset 0 1svh 0.8svh ${color(0.5).white};
      }

      &::before {
        ${insetShadow}

        ${BUTTON_RADIUS}
        box-shadow: inset 0 -1svh 0.8svh ${color(0.25).black};
      }
    }
  }
`;
