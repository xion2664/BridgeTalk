import styled, { css } from 'styled-components';
import { CommonContainer, color } from './common.style';
import { insetShadow } from '../main/common.style';

const gridLayout = css`
  display: grid;
  grid-template-columns: 1fr 3fr 5fr;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 70svh;
  width: 50svw;

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

      background-color: ${color(1).bright};

      cursor: pointer;

      box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};
    }

    .active {
      background-color: ${color(1).sub};
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1svh;

    height: 73svh;
    padding: 2svh 2svw;

    border-radius: 1.5svw;
    border: none;

    box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

    background-color: ${color(1).sub};

    &::after {
      ${insetShadow}
    }

    &::before {
      ${insetShadow}
    }

    table {
      text-align: center;
      width: 100%;
    }

    &__header {
      ${gridLayout}
    }
    &__item {
      ${gridLayout}
      background-color: ${color(1).light};
      padding: 1svw;
      border-radius: 1svw;

      font-size: 1.3svw;
      font-family: 'Pretendard';

      cursor: pointer;

      &-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .thead {
      font-size: 1.3svw;
      font-family: 'Pretendard';

      tr {
        padding: 1svw;

        td {
          text-align: center;
        }
      }
    }
    .tbody {
      display: flex;
      flex-direction: column;
      gap: 2svw;
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
