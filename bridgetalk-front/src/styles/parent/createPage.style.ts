import styled from 'styled-components';
import { color, textShadowBlue } from './common.style';
import { truncate } from './boardPage.style';

export const Container = styled.div`
  * {
    font-family: 'Pretendard';
    font-size: 1svw;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 2svh 2svw;

  .createPage {
    display: flex;
    flex-direction: column;
    gap: 2svh;

    width: 67svw;
    height: 87.5svh;
    border-radius: 2.6svw;
    background-color: ${color(1).bright};
    padding: 3.7svh 2.6svw;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;

      &-toBack {
        background-color: transparent;

        cursor: pointer;
        border: none;

        img {
          width: 2svw;
        }
      }

      &-main {
        ${textShadowBlue}
        font-size: 3svw;
        color: ${color(1).bright};
      }

      &-btn {
        background-color: ${color(1).main};
        color: ${color(1).bright};
        border-radius: 1svw;
        border: none;

        font-size: 1.5svw;

        padding: 1svh 1svw;

        cursor: pointer;
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      gap: 2svh;

      height: 100%;
      width: 100%;

      &-title {
        width: 100%;

        display: flex;
        gap: 1svw;

        div {
          font-size: 2svw;
        }

        input {
          width: 100%;

          font-size: 2svw;

          outline: none;
          border: none;
        }
      }

      &-report {
        display: flex;
        flex-direction: column;
        gap: 1svh;

        background-color: ${color(1).sky};
        border-radius: 1.5svw;

        padding: 2svh 1svw;

        &-title {
          text-align: center;
          font-size: 1.5svw;
          color: ${color(1).bright};
        }

        &-content {
          display: flex;
          flex-direction: column;
          gap: 1svh;
          width: 100%;

          &-btn {
            cursor: pointer;

            border-radius: 2.6svw;
            border: none;
            background-color: ${color(1).bright};

            padding: 0.5svh 0.5svw;
            width: 100%;

            &:hover {
              background-color: ${color(1).main};
              color: ${color(1).bright};
            }

            &:active {
              background-color: ${color(1).bright};
              color: ${color(1).main};
            }

            p {
              display: flex;
              align-items: center;
              justify-content: start;

              gap: 1svw;

              padding: 1svh 0.5svw;
              font-size: 1.5svw;
              ${truncate}

              width: 100%;

              img {
                width: 1.5svw;
              }
            }
          }
        }
      }
      &-content {
        textarea {
          width: 100%;
          resize: none;
          height: 30svh;
          padding: 2svh 1svw;
          font-size: 1.3svw;
        }
      }

      &-btns {
        width: 100%;

        button {
          width: 100%;

          background-color: ${color(1).bright};
          padding: 2svh 1svw;
          border-radius: 1svw;

          cursor: pointer;

          &:hover {
            background-color: ${color(1).black};
            color: ${color(1).bright};
          }
        }
      }
    } //contaienr
  }
`;
