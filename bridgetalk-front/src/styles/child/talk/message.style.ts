import styled from 'styled-components';

export const Container = styled.div`
  .message {
    display: flex;
    align-item: center;
    justify-content: baseline;
    gap: 10svh;

    &__content {
      width: 60svw;
      height: 60svh;
      padding: 5svh;

      border-radius: 5svh;
      background-color: #ffffff;
      box-shadow: 0 1svh 1svh #00000050;
    }

    &__reader {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5svh;

      &-talk {
        width: 60svw;
        padding: 5svh;
        border-radius: 5svh;
        background-color: #ffffff;
        box-shadow: 0 1svh 1svh #00000050;
      }

      &-dino {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: end;

        width: 90svw;
        height: 60svh;

        span {
        }
      }
    }
  }
`;
