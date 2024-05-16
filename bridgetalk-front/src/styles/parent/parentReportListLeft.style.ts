import styled from 'styled-components';
import { color, textShadowBlue } from './common.style';
import { insetShadow } from '../main/common.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 80svh;

  background-color: ${color(1).sub};
  border-radius: 2svw;
  box-shadow: 0 0 2svw ${color(0.25).black};
  padding: 1svh 1svw;

  position: relative;

  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    ::-webkit-scrollbar {
      display: none;
    }

    position: relative;

    padding-top: 6svh;

    &__title {
      color: ${color(1).bright};
      font-family: 'DNF';
      ${textShadowBlue}

      font-size: 2svw;

      position: absolute;
      top: 0;
      left: 2svw;
      transform: translate(0, -50%);
    }

    &__content {
      height: 100%;
      background-color: ${color(1).light};
      display: flex;
      flex-direction: column;

      border-radius: 1svw;

      &-list {
        padding: 1svh 1svw;

        display: flex;
        flex-direction: column;
        gap: 3svh;

        width: 100%;
        /* height: 59.9svh; */
        height: 100%;

        overflow-y: auto;
        overflow-x: hidden;

        &-item {
          .flex {
            display: flex;
            justify-content: space-between;
          }

          background-color: ${color(1).sub};
          padding: 10svh 2svw;

          border-radius: 1.5svw;
          box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

          position: relative;

          width: 100%;
          height: 16.3svh;

          display: flex;
          flex-direction: column;
          gap: 1svh;
          justify-content: center;
          cursor: pointer;

          &:after {
            ${insetShadow}
            border-radius: 1.5svw;
            box-shadow: inset 0 -0.5svh 0.4svh ${color(0.5).black};
          }

          &:before {
            ${insetShadow}
            border-radius: 1.5svw;
            box-shadow: inset 0 0.5svh 0.4svh ${color(0.5).bright};
          }

          div {
            color: ${color(1).bright};
          }

          &-like {
            background-color: rgb(255, 159, 153);
            padding: 1svh 1svw;

            border-radius: 1svw;
            font-size: 1svw;

            box-shadow: 0 0.5svh 0 ${color(0.5).black};

            display: flex;
            gap: 0.5svw;
            align-items: center;

            font-family: 'DNF';
          }
          &-title {
            font-family: 'Cookie';
            font-size: 2svw;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &-body {
            font-size: 1.4svw;
            font-family: 'Cookie';
          }
          &-date {
            font-size: 1.4svw;
            width: 100%;
            font-family: 'Cookie';
            text-align: end;
          }
        }
      }

      &-input {
        width: 100%;
        /* height: 13.7svh; */
        height: 20%;

        border-top: 1px solid black;
      }
    }
  }
`;
