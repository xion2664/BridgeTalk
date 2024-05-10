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
  ${CommonContainer}
  align-items: center;

  .main {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2svw;

    &__left {
      display: flex;

      &-buttons {
        display: flex;
        flex-direction: column;
        gap: 2svh;

        &-button {
          width: 5.2svw;
          height: 9.2svh;
          font-family: 'DNF';
          font-size: 2.5svw;

          position: relative;
          cursor: pointer;

          border-radius: 1svw;
          border: none;
          box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

          &::after {
            ${insetShadow}
            border-radius: 1svw;
            box-shadow: inset 0 0.5svh 0.4svh ${color(0.5).bright};
          }

          &::before {
            ${insetShadow}
            border-radius: 1svw;
            box-shadow: inset 0 -0.5svh 0.4svh ${color(0.25).black};
          }
        }

        .active {
          background-color: ${color(1).light};
        }
      }

      &-list {
        display: flex;
        flex-direction: column;
        gap: 2svh;

        width: 100%;
        height: 100%;
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
