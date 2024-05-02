import styled from 'styled-components';
import { button, color } from './common.style';

export const Container = styled.div`
  width: 100svw;
  height: 100svh;

  background-color: ${color(0.2).black};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.6svh;

  .back {
    position: fixed;
    top: 3svh;
    left: 2svw;

    border: none;
    background-color: transparent;

    img {
      width: 7svw;
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4.6svh;

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-title {
        img {
          width: 50.3svw;
        }
      }

      &-box {
        background-color: ${color(0.5).black};
        border-radius: 2.6svw;

        width: 71.8svw;
        height: 38.2svh;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2.8svh;

        &-title {
          font-family: 'DNF';
          color: ${color(1).white};
          font-size: 3.3svw;
        }

        &-name {
          display: flex;
          align-items: center;
          gap: 2.6svw;

          &-title {
            img {
              width: 14svw;
            }
          }

          &-input {
            width: 36.5svw;
            height: 13.9svh;
            border: 1svw solid ${color(1).main};
            border-radius: 5.2svw;
          }
        }
      }
    }

    &__button {
      background-color: transparent;
      border: none;

      color: ${color(1).white};
      font-family: 'DNF';
      font-size: 2.5svw;

      display: flex;
      align-items: center;
      gap: 1.6svw;
      ${button}

      width: 20svw;
      height: 12svh;

      img {
        width: 3svw;
      }
    }
  }

  .selectDino {
    display: flex;
    flex-direction: column;
    gap: 1.5svh;
    justify-items: center;
    align-items: center;

    .title {
      img {
        width: 66svw;
      }
    }

    .selectbox {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: 54svw;
      height: 46svh;

      background-color: ${color(0.5).black};
      border-radius: 5svw;

      &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 33svw;

        button {
          background-color: transparent;
          border: none;

          img {
            width: 2svw;
          }
        }
      }

      &__title {
        color: ${color(1).white};
        font-family: 'DNF';
        font-size: 3.2svw;
      }

      &__content {
        &-dino {
          img {
            width: 14svw;
          }
        }
      }
    }
  }
  .buttons {
    display: flex;
    gap: 3svw;

    button {
      ${button}

      width: 19.2svw;
      height: 12svh;
      font-size: 2.5svw;

      img {
        width: 3svw;
      }
    }
  }
`;
