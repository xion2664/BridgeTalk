import styled from 'styled-components';
import { CommonContainer, color } from './common.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2svh;

  .categories {
    display: flex;
    justify-content: end;
    gap: 1svw;

    button {
      width: 9svw;
      height: 9svh;

      border: none;
      border-radius: 2svw;
      font-size: 2svw;

      background-color: ${color(1).sub};

      cursor: pointer;

      box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};
    }

    .active {
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: 1svh;

    &__item {
      display: flex;
      &-num {
      }
      &-category {
      }

      &-title {
      }
    }
  }

  .pagenation {
    display: flex;
    gap: 1svw;
    justify-content: center;

    .active {
      background-color: ${color(1).main};
    }

    button {
      width: 3svw;
      height: 3svw;

      border: none;
      border-radius: 50%;

      font-family: 'DNF';
      font-size: 2svw;

      cursor: pointer;

      box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};
    }
  }
`;

export const NewsList = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  gap: 2svw;
`;
