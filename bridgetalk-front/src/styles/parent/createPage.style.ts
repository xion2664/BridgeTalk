import styled from 'styled-components';
import { color } from './common.style';

export const Container = styled.div`
  * {
    font-family: 'Pretendard';
    font-size: 1svw;
  }

  display: flex;
  justify-content: center;
  align-items: start;

  width: 100%;
  height: 100%;
  padding: 2svh 2svw;

  background-color: ${color(1).bright};

  .createPage {
    display: flex;
    flex-direction: column;
    gap: 2svh;
    width: 40svw;
    height: 100svh;

    &__header {
      width: 100%;
      height: 5svh;

      &-toBack {
        background-color: transparent;

        img {
          width: 2svw;
        }
      }
    }

    &__container {
      width: 100%;

      &-title {
        width: 100%;

        display: flex;
        gap: 1svw;

        input {
          width: 100%;
        }
      }
    }
  }
`;
