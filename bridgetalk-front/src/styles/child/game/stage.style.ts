import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100svw;
  height: 100svh;
  padding: 10svw;

  background-image: url('/assets/img/child/game/candyBackground.png');
  background-size: cover;

  .stagePage {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 3svw;

      img {
        width: 5svw;
      }
    }

    &__container {
      display: flex;
      align-items: center;
      justify-content: baseline;
      gap: 5svw;

      width: 100svw;
      height: 100%;
      padding: 5svw;

      overflow-y: auto;
    }
  }

  .stageItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 30svw;
    height: 50svh;
    padding: 5svh;

    border-radius: 3svh;
    background-color: #ff6161;
    box-shadow: 0 1svh 0 pink;

    span {
      font-size: 5svh;
      font-family: 'DNF';
      color: white;
    }

    img {
      width: 90%;
      border-radius: 1svh;
    }
  }
`;
