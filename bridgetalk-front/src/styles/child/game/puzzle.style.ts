import styled from 'styled-components';

export const Container = styled.div`
  width: 100svw;
  height: 100svh;

  background-image: url('/assets/img/pic/childBackground.png');
  background-size: cover;

  .puzzlePage {
    display: flex;
    height: 100svh;
    padding: 5svw;

    &__side {
      width: 20svw;
      height: 80svh;
      padding: 2svw;
      border-radius: 5svh;

      background-color: pink;
      box-shadow: 0 2svh 0 magenta;

      img {
        width: 15svw;
      }
    }

    &__puzzle {
      width: 70svw;
      border: 1px solid magenta;
    }
  }
`;
