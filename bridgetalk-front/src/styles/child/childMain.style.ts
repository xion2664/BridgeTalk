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
      position: fixed;
      top: 25svh;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5svh;

      &-title {
        position: fixed;
        top: 10.5svh;

        img {
          width: 70.9svw;
        }
      }

      &-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5svw;
        width: 90svw;

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
          transition: all 0.5s;
          &:hover {
            cursor: pointer;

            height: 65svh;
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
          transition: all 0.5s;
          &:hover {
            cursor: pointer;

            height: 65svh;
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
