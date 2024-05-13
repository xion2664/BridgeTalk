import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100svw;
  height: 100svh;

  .stagePage {
    &__header {
    }

    &__container {
      display: flex;
      align-items: center;
      gap: 5svw;
      height: 100%;

      &-stage {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 30svw;
        height: 30svh;
        padding: 2svh;
      }
    }
  }

  .stageItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 30svw;
    height: 30svh;
    padding: 5svh;

    border-radius: 3svh;
    border-bottom: 2svh solid pink;
    background-color: #ff6161;

    &__title {
      font-size: 5svh;
      font-family: 'DNF';
      color: white;
    }

    &__img {
      img {
        width: 20svw;
        border-radius: 1svh;
      }
    }
  }
`;
