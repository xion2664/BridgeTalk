import styled from 'styled-components';
import { color, textShadowBlue } from './common.style';
import { truncate } from './boardPage.style';

export const Container = styled.div`
  * {
    font-family: 'Pretendard';
    font-size: 1.2svw;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 2svh 2svw;

  button {
    cursor: pointer;
  }

  .boardDetailPage {
    display: flex;
    flex-direction: column;
    gap: 2svh;

    width: 67svw;
    height: 87.5svh;
    border-radius: 2.6svw;
    background-color: ${color(1).bright};
    padding: 3.7svh 2.6svw;

    .sky {
      background-color: ${color(1).sky};
    }

    .scroll {
      overflow-y: auto;
      height: 80svh;

      display: flex;
      flex-direction: column;
      gap: 2svh;
    }

    &__header {
      width: 100%;

      display: flex;
      align-content: center;
      justify-content: space-between;

      button {
        background-color: transparent;
        border: none;

        img {
          width: 2svw;
        }
      }

      &-title {
        ${textShadowBlue}
        color: ${color(1).bright};
        font-size: 3svw;
      }
    }

    &__container {
      width: 100%;

      &-article {
        display: flex;
        flex-direction: column;
        gap: 1svh;

        &-header {
          display: flex;
          justify-content: space-between;

          &-title {
            font-size: 2svw;
            font-family: 'Pretendard-Black';
            ${truncate}
          }

          &-icons {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            /* gap: 1svh; */

            button {
              background-color: transparent;
              border: none;

              img {
                width: 2svw;
              }
            }
          }
        }
        &-sub {
          display: flex;
          justify-content: space-between;
          gap: 0.5svw;
        }

        &-report {
          padding: 3svh 1.5svw;

          border-radius: 1svw;
          background-color: ${color(1).sky};

          width: 100%;

          text-align: center;

          &-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1svw;

            color: ${color(1).bright};
            font-family: 'Pretendard-Black';
            width: 100%;

            &-keywords {
              display: flex;
              gap: 0.5svw;

              &-keyword {
                background-color: ${color(1).bright};
                color: ${color(1).main};
                border-radius: 1.5svw;
                padding: 1svh 0.5svw;
                box-shadow: 0 0.5svh 0.4svh ${color(0.25).black};
              }
            }
          }

          &-content {
            width: 100%;
            text-align: start;

            padding: 2svh 0;
          }
        }

        &-content {
        }
      }

      &-reply {
        display: flex;
        flex-direction: column;
        gap: 2svh;

        &-wrapper {
          width: 100%;

          display: flex;
        }

        &-input {
          width: 100%;

          input {
            width: 100%;
            padding: 1svh 0.5svw;

            font-size: 1.2svw;
            border: 1px solid ${color(1).line};
          }
        }

        &-button {
          width: 10svw;
          button {
            width: 100%;
            height: 100%;

            background-color: ${color(1).bright};
            border: 1px solid ${color(1).line};

            &:hover {
              background-color: ${color(1).black};
              color: ${color(1).bright};
            }
          }
        }
      }
    } // __container

    .replyListItem {
      display: grid;
      grid-template-columns: 1fr 7fr;

      &__left {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 1svh;

        &-like {
          &-btn {
            border-radius: 50%;
            padding: 2svh 1svw;
            background-color: transparent;

            img {
              width: 2svw;
            }
          }
        }
      } // &__left

      &__right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1svh;

        &-top {
          display: flex;
          align-items: end;
          gap: 1svw;

          &-writer {
            font-size: 1.5svw;
          }
        }
      } // &__right
    }
  }
`;
