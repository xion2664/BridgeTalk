import styled from 'styled-components';
import { CommonContainer, color } from './common.style';

export const Container = styled.div`
  ${CommonContainer}
  align-items: center;

  .main {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2svw;

    &__left {
      &-buttons {
      }

      &-list {
        display: flex;
        flex-direction: column;
        gap: 2svh;

        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  gap: 2svw;
`;

export const ItemWrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 1svh 3svw;
  background-color: ${color(0.8).sub};
`;
