import styled from 'styled-components';

export const Container = styled.div`
  .logout {
    position: fixed;
    top: 3svh;
    left: 3svw;
  }

  .setting {
    position: fixed;
    top: 3svh;
    right: 3svw;
  }

  display: flex;
  flex-direction: column;
  gap: 2svh;

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__profilelist {
      display: flex;
      align-items: center;
      justify-content: center;

      &-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
