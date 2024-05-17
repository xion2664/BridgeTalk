import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100svw;
  height: 100svh;

  background-image: url('/assets/img/pic/childBackground.png');
  background-size: cover;
  background-repeat: no-repeat;

  .childMain {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    &__container {
      position: fixed;
      top: 25svh;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5svh;

      width: 100%;
      height: 100%;

      &-title {
        position: fixed;
        top: 10.5svh;

        img {
          width: 70svw;
        }
      }

      &-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 2svw;

        width: 100%;
        height: 60%;

        &-toMessage {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 30%;

          img {
            margin-bottom: 0.5svh;
            width: 78%;
            transition: all 0.5s;
            &:hover {
              cursor: pointer;
              width: 98%;
            }
          }
        }

        &-toTalk {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 30%;

          img {
            width: 81%;
            transition: all 0.5s;
            &:hover {
              cursor: pointer;
              width: 101%;
            }
          }
        }

        &-toGame {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 30%;

          img {
            margin-top: 1svh;
            width: 65%;
            transition: all 0.5s;
            &:hover {
              cursor: pointer;
              width: 85%;
            }
          }
        }
      }
    }

    &__footer {
      height: 30svh;
    }
  }
`;
