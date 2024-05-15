import styled, { css } from 'styled-components';
import { color, textShadowBlue } from './common.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1svh;

  width: 100%;
  height: 100%;

  ::-webkit-scrollbar {
    display: none;
  }

  .title {
    /* position: absolute;
    display: flex;
    align-items: center; */

    div {
      font-family: 'Pretendard';
      font-size: 3svw;
      color: ${color(1).black};
      position: relative;

      /* ${textShadowBlue} */
    }

    img {
      width: 10svw;
    }
  }

  .children {
    display: flex;
    gap: 1svw;

    width: 100%;

    padding: 0 1svw;

    &__child {
      color: ${color(1).black};
      font-size: 2svw;
      cursor: pointer;

      background-color: transparent;
      border: none;
    }
  }

  .content {
    width: 100%;
    height: 70svh;
    overflow-y: scroll;
    border-radius: 1svw;

    position: relative;

    .list {
      width: 100%;
      min-height: 100%;

      display: flex;
      flex-direction: column;

      gap: 2svh;

      padding: 1svh 1svw;
      border-radius: 1svw;

      &__noReport {
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 44.8svw;
        }
      }
    }
  }
`;
