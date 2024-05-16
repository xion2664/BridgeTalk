import styled from 'styled-components';
import { color } from './common.style';

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
    &__content {
      &-list {
        background-color: ${color(1).light};
        padding: 1svh 1svw;

        &-item {
          background-color: ${color(1).sub};

          div {
            color: ${color(1).bright};
          }

          &-like {
          }
          &-title {
          }
          &-body {
          }
          &-date {
          }
        }
      }
    }
  }
`;
