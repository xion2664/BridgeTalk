import styled from 'styled-components';

export const Container = styled.div`
  width: 100svw;
  height: 100svh;

  background-image: url('/assets/img/child/game/candyBackground.png');
  background-size: cover;

  .puzzlePage {
    display: flex;
    gap: 2svw;
    height: 100%;
    padding: 5svw;

    &__side {
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

      img {
        width: 100%;
        border-radius: 3svh;
        border-top: 1svh solid palevioletred;
      }

      span {
        text-align: center;
        font-size: 5svh;
        font-family: 'DNF';
        color: palevioletred;
      }

      p {
        text-align: center;
        font-size: 2svh;
        font-family: 'DNF';
      }

      &-timer {
        font-size: 5svh;
        font-family: 'DNF';
        color: palevioletred;
      }
    }

    &__puzzle {
      width: 70svw;
      border-radius: 5svh;
      border-bottom: 2svh solid palevioletred;
      background-color: pink;
    }
  }
`;
