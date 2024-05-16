import styled from 'styled-components';
import { color } from './common.style';
import { insetShadow } from '../main/common.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: ${color(1).sub};
  border-radius: 2svw;
  box-shadow: 0 0 2svw ${color(0.25).black};
  padding: 1svh 1svw;

  position: relative;

  .main {
    display: grid;
    grid-template-rows: 1fr 14fr;
    height: 100%;
    width: 100%;

    ::-webkit-scrollbar {
      display: none;
    }

    &__content {
      height: 100%;
      background-color: ${color(1).light};
      display: flex;
      flex-direction: column;

      &-list {
        padding: 1svh 1svw;

        display: flex;
        flex-direction: column;
        gap: 3svh;

        width: 100%;
        height: 59.9svh;

        overflow-y: auto;
        overflow-x: hidden;

        &-item {
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
            position: absolute;
            top: 1svh;
            right: 1svw;
          }
          &-title {
            font-family: 'Pretendard-Black';
            font-size: 3svw;
          }
          &-body {
            font-size: 1.4svw;
            font-family: 'Pretendard';
          }
          &-date {
            font-size: 1.4svw;
            width: 100%;
            font-family: 'Pretendard';
            text-align: end;
          }
        }
      }

      &-input {
        width: 100%;
        height: 13.7svh;

        border-top: 1px solid black;
      }
    }
  }
`;
