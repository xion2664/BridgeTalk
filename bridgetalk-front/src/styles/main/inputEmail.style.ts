import styled from 'styled-components';
import { button, color, insetShadow } from './common.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2svh;

  div {
    font-family: 'CherryBomb';
    color: ${color(1).white};
  }

  input {
    border-radius: 15svw;
    border: 1.5svw solid ${color(1).main};
    font-size: 3svw;
    font-family: 'DNF';
    padding: 1.2svh 2svw;
    height: 16svh;
  }

  .email {
    display: flex;
    align-items: center;
    gap: 1svw;

    position: relative;

    &__title {
      img {
        width: 16svw;
      }
    }

    &__input {
    }

    &__verify {
      position: absolute;
      top: 50%;
      right: 1svw;

      background-color: ${color(1).main};

      border: none;
      border-radius: 15svw;
      height: calc(16svh - 2svw);

      color: ${color(1).white};
      font-family: 'CherryBomb';
      font-size: 2svw;

      padding: 0 2svw;

      transform: translateY(-50%);
      cursor: pointer;

      box-shadow: inset 0 -1svh 1svh ${color(0.25).black};
    }
  }

  .confirm {
    display: flex;
    align-items: center;
    gap: 1svw;

    &__title {
      img {
        width: 16svw;
      }
    }
  }

  .next {
    ${button}

    font-size: 3.5svw;
    img {
      width: 4svw;
    }

    width: 27svw;
    height: 17svh;
  }
`;
