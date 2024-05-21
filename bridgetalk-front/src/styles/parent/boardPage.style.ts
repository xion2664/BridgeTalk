import styled, { css } from 'styled-components';
import { color, textShadowBlue } from './common.style';
import { insetShadow } from '../main/common.style';

export const truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Container = styled.div`
  * {
    font-family: 'Pretendard';
    font-size: 1svw;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2svh;

  width: 100%;
  height: 100%;

  .boardPage {
    position: relative;

    display: flex;
    flex-direction: column;

    width: 67svw;
    height: 87.5svh;
    border-radius: 2.6svw;
    background-color: ${color(1).bright};
    padding: 3.7svh 2.6svw;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      width: 67svw;

      padding: 0 1svw;

      &-title {
        ${textShadowBlue}
        font-size: 3svw;
        color: ${color(1).bright};
      }

      &-sort {
        display: flex;
        gap: 1svw;

        button {
          background-color: transparent;
          border: none;

          padding: 1svh 1svw;

          font-size: 2svw;
          border-radius: 1.5svw;

          background-color: ${color(1).bright};
          color: ${color(1).main};
          cursor: pointer;

          font-size: 1.5svw;

          &:hover {
            background-color: ${color(1).main};
            color: ${color(1).bright};
          }
        }
        .active {
          color: ${color(1).bright};
          background-color: ${color(1).main};
        }
      } // .sort
    }
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-categories {
        display: flex;
        gap: 1svw;
        height: 5svh;

        button {
          font-size: 1.5svw;

          color: ${color(1).black};
          background-color: ${color(1).bright};

          border: none;
          border-radius: 0.5svw;
          padding: 1svh 0.5svw;
          box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            color: ${color(1).bright};
            background-color: ${color(1).main};
          }

          &:active {
            color: ${color(1).black};
            background-color: ${color(1).main};
          }
        }

        .active {
          background-color: ${color(1).main};
          color: ${color(1).bright};
        }
      }

      &-search {
        &-form {
          display: flex;
          align-content: center;
          justify-content: center;

          width: 29svw;

          background-color: ${color(1).sky};
          border-radius: 5svw;

          overflow: hidden;

          input {
            background-color: transparent;
            border: none;
            outline: none;

            width: 100%;

            padding: 2svh 1svw;
            font-size: 1.2svw;
          }

          button {
            padding: 1svh 0.5svw;
            background-color: transparent;

            border: none;
            background-color: transparent;

            cursor: pointer;

            padding: 0 1svw;

            img {
              width: 1.7svw;
            }
          }
        }
      }
    }

    &__list {
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      /* gap: 3svh; */
      padding: 2svh 0;

      height: 100%;

      &-item {
        cursor: pointer;

        display: flex;
        flex-direction: column;
        justify-content: center;

        gap: 1svh;
        border-top: 1px solid ${color(1).main};
        border-bottom: 1px solid ${color(1).main};

        width: 100%;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &-header {
          display: flex;
          width: 100%;

          &-first {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            &-title {
              font-size: 2svw;
              width: 100%;
              ${truncate}
            }

            &-likes {
              display: flex;
              align-items: center;
              gap: 0.5svw;

              font-size: 1.25svw;
              img {
                width: 1.25svw;
              }
            }
          }
        }

        &-body {
          &-content {
            font-size: 1.25svw;

            ${truncate}
          }
        }

        &-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          &-info {
            display: flex;
            gap: 0.5svw;

            &-writer {
              font-size: 1.25svw;
            }

            &-date {
              font-size: 1.25svw;
            }
          }

          &-keywords {
            display: flex;
            justify-content: end;
            gap: 1svw;

            div {
              background-color: ${color(1).main};
              color: ${color(1).bright};
              font-size: 1.25svw;

              border-radius: 1.5svw;
              padding: 0.5svh 0.5svw;

              box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};
            }
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
        /* border: 2px solid ${color(1).black}; */
        color: ${color(1).main};
        border: none;
      }

      button {
        width: 3svw;
        height: 3svw;

        border-radius: 1svw;

        font-family: 'DNF';
        font-size: 1.5svw;

        cursor: pointer;

        transition: all 0.2s;
        background-color: ${color(1).bright};
        border: none;
      } //.active
    } // .pagenation
  } // .boardPage

  .write {
    position: absolute;
    right: 2svw;
    bottom: 4svh;

    padding: 3svh 1.5svw;

    border-radius: 50%;
    border: none;

    cursor: pointer;

    background-color: ${color(1).main};

    img {
      width: 3.6svw;
    }
  } // .write
`;
