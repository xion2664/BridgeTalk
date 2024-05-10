import styled, { css } from 'styled-components';
import { CommonContainer, color } from './common.style';

const insetShadow = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  content: '';
`;

export const Container = styled.div`
  align-items: center;

  .main {
    display: grid;
    width: 88svw;
    height: 85svh;

    grid-template-columns: 1fr 1fr;
    gap: 2svw;

    &__left {
      display: flex;
      gap: 3svw;
      background-color: ${color(1).sub};
      border-radius: 1.5svw;
      padding: 2.9svh 0.8svw;
      position: relative;
      box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

      &::after {
        ${insetShadow}
        border-radius: 1.5svw;
        box-shadow: inset 0 1svh 0.8svh ${color(0.5).bright};
      }

      &::before {
        ${insetShadow}
        border-radius: 1.5svw;
        box-shadow: inset 0 -1svh 0.8svh ${color(0.25).black};
      }

      &-buttons {
        display: flex;
        flex-direction: column;
        gap: 2svh;

        .active {
          background-color: ${color(1).light};
        }

        &-button {
          width: 5.2svw;
          height: 9.2svh;
          font-family: 'DNF';
          font-size: 2.5svw;
          position: relative;
          cursor: pointer;
          border-radius: 1.5svw;
          border: none;
          box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

          &::after {
            ${insetShadow}
            border-radius: 1.5svw;
            box-shadow: inset 0 0.5svh 0.4svh ${color(0.5).bright};
          }

          &::before {
            ${insetShadow}
            border-radius: 1.5svw;
            box-shadow: inset 0 -0.5svh 0.4svh ${color(0.25).black};
          }
        }
      }

      &-list {
        display: flex;
        flex-direction: column;
        gap: 2svh;
        width: 100%;
        height: 100%;

        &-item {
          font-family: 'DNF';
          font-size: 2.5svw;
          padding: 1svh 0.5svw;
          background-color: ${color(1).light};
          position: relative;
          border-radius: 1svw;
          box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

          &::after {
            ${insetShadow}
            border-radius: 1svw;
            box-shadow: inset 0 1svh 0.8svh ${color(0.5).bright};
          }

          &::before {
            ${insetShadow}
            border-radius: 1svw;
            box-shadow: inset 0 -1svh 0.8svh ${color(0.25).black};
          }
        }
      }
    }

    &__right {
      width: 100%;
      height: 100%;
      background-color: ${color(1).sub};
      border-radius: 1.5svw;
      padding: 2.9svh 0.8svw;
      position: relative;
      box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

      &::after {
        ${insetShadow}
        border-radius: 1.5svw;
        box-shadow: inset 0 1svh 0.8svh ${color(0.5).bright};
      }

      &::before {
        ${insetShadow}
        border-radius: 1.5svw;
        box-shadow: inset 0 -1svh 0.8svh ${color(0.25).black};
      }

      &-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        text-align: center;

        width: 100%;
        height: 100%;

        background-color: ${color(1).light};
        border-radius: 1.5svw;

        &-word {
          display: flex;
          gap: 1svw;
        }
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  gap: 2svw;
`;

export const ItemWrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 1svh 3svw;
  background-color: ${color(0.8).sub};
`;
