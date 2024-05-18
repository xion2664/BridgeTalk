import styled, { css } from 'styled-components';
import { color, textShadowBlue } from './common.style';
import { insetShadow } from '../main/common.style';

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

  .boardPage {
    display: flex;
    flex-direction: column;
    gap: 2svh;

    width: 40svw;

    &__categories {
      display: flex;
      gap: 1svw;

      button {
        font-size: 1.5svw;

        color: ${color(1).black};
        background-color: ${color(1).bright};

        border: 1px solid ${color(1).line};
        border-radius: 0.5svw;
        padding: 1svh 0.5svw;

        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          color: ${color(1).bright};
          background-color: ${color(1).black};
        }

        &:active {
          color: ${color(1).black};
          background-color: ${color(1).bright};
        }
      }

      .active {
        background-color: ${color(1).black};

        color: ${color(1).bright};
      }
    }

    &__search {
      padding: 1.8svh 1.5svw;
      border-top: 2px solid ${color(1).black};
      border-bottom: 2px solid ${color(1).black};

      &-form {
        display: flex;
        align-content: center;
        justify-content: space-between;
        gap: 1svw;

        input {
          width: 100%;
          font-size: 1.7svw;

          border: none;
          outline: none;
        }

        button {
          padding: 1svh 0.5svw;

          border-radius: 0.5svw;
          border: 1px solid ${color(1).line};
          background-color: transparent;

          cursor: pointer;

          img {
            width: 1.7svw;
          }
        }
      }
    }

    &__list {
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      gap: 3svh;

      &-item {
        display: flex;
        flex-direction: column;
        gap: 1svh;

        &-header {
          display: flex;
          justify-content: space-between;

          &-first {
            display: flex;
            flex-direction: column;
            gap: 1svh;

            &-title {
              font-size: 2svw;
            }

            &-sub {
              display: flex;
              gap: 0.5svw;
            }
          }
        }

        &-body {
          &-content {
          }
          &-keywords {
            display: flex;
            justify-content: end;
            gap: 1svw;
          }
        }
      }
    }
    .pagenation {
      display: flex;
      gap: 1svw;
      justify-content: center;

      .active {
        /* background-color: ${color(1).bright}; */
        border: 2px solid ${color(1).black};
      }

      button {
        width: 3svw;
        height: 3svw;

        border: none;
        border-radius: 1svw;

        font-family: 'Pretendard';
        font-size: 1.5svw;

        cursor: pointer;

        transition: all 0.2s;
        background-color: ${color(1).bright};
        border: 1px solid ${color(1).line};
      } //.active
    } // .pagenation
  } // .boardPage
`;
