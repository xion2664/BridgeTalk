import styled, { css } from 'styled-components';

export const flexColumn = css`
    display: flex;
    flex-direction: column;
`;

export const buttonNormal = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 1svw;
    font-size: 2svw;
    width: 20svw;

    &:hover {
        cursor: pointer;
    }
`;

export const Absolute = styled.div<{ top: number; left: number }>`
    position: absolute;
    top: ${(props) => `${props.top}svh`};
    left: ${(props) => `${props.left}svw`};
`;
