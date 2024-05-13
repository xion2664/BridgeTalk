import styled from 'styled-components';
import { CommonContainer, color } from './common.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2svh;

  .categories {
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
  }
`;

export const NewsList = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  gap: 2svw;
`;
