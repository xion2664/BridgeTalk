import styled, { css } from 'styled-components';
import { color, textShadowBlue } from './common.style';
import { insetShadow } from '../main/common.style';

const gridLayout = css`
  display: grid;
  grid-template-columns: 2fr 10fr 2fr;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90svh;
  width: 70svw;
  gap: 2svh;

  .boardPage {
    &__header {
      display: ${gridLayout};
      align-items: center;
      gap: 2svw;
      padding: 1svw 2svw;

      &-title {
        font-size: 2svw;
        color: ${color(1).bright};
        ${textShadowBlue};
      }

      &-side {
        button {
          font-size: 1.5svw;
          padding: 0.5svh 1svw;
          border-radius: 0.5svw;
          border: none;
          background-color: ${color(1).sub};
          cursor: pointer;
          box-shadow: inset 0 0 0.5svh ${color(0.5).black};
          transition: background-color 0.2s;

          &:hover {
            background-color: ${color(1).bright};
          }
        }
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      gap: 2svh;

      &-content {
        padding: 2svh;
        border-radius: 1svw;
        background-color: ${color(1).light};
        box-shadow: 0 0.5svh 0.4svh rgba(0, 0, 0, 0.5);

        span {
          font-size: 1.5svw;
          color: ${color(0.5).black};
        }
      }
    }
  }
`;

export const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1svh;

  .article {
    background-color: white;
    padding: 1svw;
    border-radius: 0.5svw;
    box-shadow: 0 0.4svh rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-0.2svh);
    }

    &-title {
      font-size: 1.5svw;
      color: ${color(1).bright};
    }

    &-details {
      font-size: 1.3svw;
      color: ${color(0.5).black};
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  gap: 1svw;
  justify-content: center;
  align-items: center;
  margin-top: 1svh;

  button {
    width: 3svw;
    height: 3svw;
    font-size: 1.5svw;
    border-radius: 1svw;
    border: none;
    background-color: ${color(1).light};
    cursor: pointer;

    box-shadow: 0 0 1svh ${color(1).black};
    &:hover {
      background-color: ${color(1).sub};
    }
  }
`;
