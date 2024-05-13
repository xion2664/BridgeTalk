import styled from 'styled-components';

export const Container = styled.div`
  width: 100svw;
  height: 100svh;

  background-image: url('/assets/img/child/game/candyBackground.png');
  background-size: cover;

  .finishPage {
    display: flex;
    gap: 2svw;
    height: 100%;
    padding: 5svw;

    &__container {
      display: flex;
      height: 100%;

      &-img {
        width: 70svw;
        border-radius: 5svh;
        border-bottom: 2svh solid palevioletred;
        background-color: pink;

        img {
          width: 100%;
          border-radius: 3svh;
          border-top: 5px solid palevioletred;
        }
      }

      &-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5svh;

        width: 30svw;
        height: 100%;
        padding: 2svw;
        border-radius: 5svh;

        background-color: pink;
        border-bottom: 2svh solid palevioletred;
      }
    }
  }
`;
