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
    width: 100%;
    height: 100%;

    &__container {
      position: fixed;
      top: 25svh;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
        height: 100%;

        &-toMessage {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 30%;

          img {
            width: 80%;
            transition: all 0.5s;
            &:hover {
              cursor: pointer;
              width: ;
            }
          }
        }

        &-toTalk {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 30%;

          img {
            width: 80%;
            transition: all 0.5s;
            &:hover {
              cursor: pointer;
              width: ;
            }
          }
        }

        &-toGame {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 30%;

          img {
            width: 65%;
            transition: all 0.5s;
            &:hover {
              cursor: pointer;
              width: ;
            }
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
