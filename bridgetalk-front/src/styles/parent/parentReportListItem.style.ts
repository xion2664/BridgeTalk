import styled from 'styled-components';
import { color } from '@/styles/parent/common.style';

export const Container = styled.div`
  display: flex;
  background-color: ${color(1).light};
  padding: 2svh 1svw;
  border-radius: 1svw;

  box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

  position: relative;
  cursor: pointer;

  * {
    font-family: 'Pretendard';
    font-size: 1.5svw;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 1svw;
    box-shadow: inset 0 0.5svh 0.4svh ${color(0.5).bright};
    z-index: 0;
    pointer-events: none;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 1svw;
    box-shadow: inset 0 -0.5svh 0.4svh ${color(0.5).dark};
    z-index: 0;
    pointer-events: none;
  }

  transition: all 0.1s;

  &:hover {
    transform: translateY(0.25svh);
    box-shadow: 0 0.25svh 0.4svh ${color(0.5).black};
  }

  &:active {
    transform: translateY(0.5svh);
    box-shadow: 0 0svh 0.4svh ${color(0.5).black};
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 1svw;
  width: 100%;

  .left {
    width: 100%;
    height: 100%;
    background-color: ${color(1).black};
  }

  .right {
    &__content {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      gap: 2svw;

      align-items: center;

      justify-content: space-between;

      &-title {
        text-align: center;
      }

      &-button {
        background-color: ${color(1).black};
        border-radius: 2svw;

        color: ${color(1).bright};
      }
    }
  }
`;
