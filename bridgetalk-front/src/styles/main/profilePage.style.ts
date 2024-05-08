import styled from 'styled-components';
import { button, color, insetShadow } from './common.style';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100svw;
  height: 100svh;
  background-color: ${color(0.2).black};

  .logout {
    position: fixed;
    top: 3svh;
    left: 2svw;

    border: none;
    background-color: transparent;

    img {
      width: 7svw;
    }
  }

  .setting {
    position: fixed;
    top: 3svh;
    right: 3svw;
    background-color: transparent;
    border: none;

    img {
      width: 5.8svw;
    }
  }

  display: flex;
  flex-direction: column;
  gap: 2svh;

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5.5svh;

    &__title {
      img {
        width: 30svw;
      }
    }

    &__profilelist {
      display: flex;
      align-items: center;
      justify-content: center;

      gap: 3.1svw;

      &-item {
        outline: none;
        border: none;

        &-edit {
          background-color: transparent;
          border: none;

          position: absolute;
          top: 3svh;
          right: 2svw;

          img {
            width: 1svw;
          }
        }
      }

      &-item,
      &-empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: ${color(1).sub};
        width: 20.8svw;
        height: 37svh;
        border-radius: 3svw;

        position: relative;
        box-shadow: 0 0.5svh 0.4svh ${color(0.25).black};

        button {
          background-color: transparent;
          border: none;
        }

        &::after {
          ${insetShadow}
          border-radius: 3svw;
          box-shadow: inset 0 0.5svh 0.4svh ${color(0.5).white};
        }

        &::before {
          ${insetShadow}
          border-radius: 3svw;
          box-shadow: inset 0 -0.5svh 0.4svh ${color(0.25).black};
        }

        &-dino {
          img {
            width: 11svw;
          }
        }

        &-title {
          color: ${color(1).white};
          font-family: 'DNF';
          font-size: 3.3svw;
        }
      }

      &-empty {
        img {
          width: 5.5svw;
        }
      }
    }

    &__button {
      &-start {
        ${button}
        width: 20.9svw;
        height: 12svh;
        font-size: 2.5svw;
      }
    }
  }
`;
