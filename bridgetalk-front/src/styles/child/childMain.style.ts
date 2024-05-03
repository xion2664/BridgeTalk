import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100svw;
  height: 100svh;

  background-image: url('/assets/img/pic/childBackground.png');
  background-size: cover;

  .childMain {
    display: flex;
    align-items: center;
    justify-content: center;

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5svh;

      &-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5svw;

        &-toTalk {
          display: flex;
          align-items: center;
          justify-content: center;

          height: 60svh;

          background-image: url('/assets/img/pic/menu1.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;

          img {
            height: 50svh;
          }

          &:hover {
            cursor: pointer;

            height: 65svh;
            transition: 0.5s;
          }
        }

        &-toGame {
          display: flex;
          align-items: center;
          justify-content: center;

          height: 60svh;

          background-image: url('/assets/img/pic/menu2.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;

          img {
            height: 37svh;
          }

          &:hover {
            cursor: pointer;

            height: 65svh;
            transition: 0.5s;
          }
        }

        &-dino {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          span {
            font-size: 2svw;
            font-family: 'DNF';
            padding: 5svh;
            border-radius: 2svw;
            background-color: white;
            box-shadow: 0 1px 3px #00000050;
          }

          img {
            height: 200px;
          }
        }
      }
    }
  }
`;
