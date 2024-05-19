import styled from 'styled-components';
import { color } from './common.style';

export const Container = styled.div`
  * {
    font-family: 'Pretendard';
    font-size: 1.2svw;
  }

  display: flex;
  justify-content: center;
  align-items: start;

  width: 100%;
  height: 100%;
  padding: 2svh 2svw;

  button {
    cursor: pointer;
  }

  background-color: ${color(1).bright};

  .boardDetailPage {
    display: flex;
    flex-direction: column;
    gap: 2svh;
    width: 40svw;
    height: 100svh;

    &__header {
      width: 100%;
      height: 5svh;

      display: flex;
      align-content: center;
      justify-content: space-between;

      div {
        font-size: 2svw;
      }

      button {
        background-color: transparent;
        border: none;

        img {
          width: 2svw;
        }
      }

      &-icons {
        display: flex;
        align-items: center;
        gap: 1svw;

        button {
          img {
            width: 2svw;
          }
        }
      }
    }

    &__container {
      width: 100%;

      &-article {
        display: flex;
        flex-direction: column;
        gap: 1svh;

        &-header {
          &-title {
            font-size: 2svw;
            font-family: 'Pretendard-Black';
          }

          &-sub {
            display: flex;
            gap: 0.5svw;
          }
        }

        &-report {
          padding: 3svh 1.5svw;

          border-radius: 1svw;
          background-color: ${color(1).line};

          width: 100%;

          text-align: center;
        }

        &-content {
        }

        &-keywords {
          display: flex;
          gap: 0.5svw;
        }
      }

      &-reply {
        &-wrapper {
          display: flex;
        }
      }
    } // __container

    .replyListItem {
      display: grid;
      grid-template-columns: 1fr 5fr;

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
