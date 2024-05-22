import styled from 'styled-components';
import { button, color } from './common.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 1svh;
  width: 60svw;

  form {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 1svh;
  }

  input {
    border-radius: 15svw;
    border: 1svw solid ${color(1).main};
    padding: 1.2svh 2svw;
    height: 13.3svh;
    width: 100%;

    font-size: 2.5svw;
    font-family: 'DNF';
  }

  .name,
  .nickname,
  .password,
  .passwordcheck,
  .buttons {
    display: flex;
    align-items: center;
    gap: 2svw;
    width: 100%;
  }

  .name {
    &__title {
      img {
        width: 15svw;
      }
    }
  }

  .nickname {
    &__title {
      img {
        width: 24svw;
      }
    }
  }

  .password {
    &__title {
      img {
        width: 24svw;
      }
    }
  }

  .passwordcheck {
    &__title {
      img {
        width: 24svw;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 3svw;

    button {
      ${button}

      width: 19.2svw;
      height: 12svh;
      font-size: 2.5svw;

      img {
        width: 3svw;
      }
    }
  }
`;
