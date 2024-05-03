import styled from 'styled-components';

export const Container = styled.div`
  width: 100svw;

  * {
    box-sizing: border-box;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .messageList {
    display: flex;
    align-item: center;
    justify-content: baseline;
    gap: 10svh;

    &__list {
      width: 60svw;
      height: 60svh;
      padding: 3svh;

      border-radius: 5svh;
      background-color: #ff9f99;

      &-header {
        display: flex;
        align-item: center;

        img {
          width: 8svw;
        }
      }

      &-content {
        display: flex;
        flex-direction: column;
        gap: 1svh;

        height: 35svh;
        overflow: scroll;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      align-item: center;
      justify-content: center;

      span {
        padding: 4svh;

        font-size: 3svh;
        font-family: 'DNF';

        border-radius: 10svh;
        background-color: white;
      }

      img {
        height: 20svh;
      }
    }
  }
`;
