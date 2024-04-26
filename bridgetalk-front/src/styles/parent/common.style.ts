import styled, { css } from 'styled-components';

export function color(alpha: number) {
    return {
        main: `rgba(108, 149, 255, ${alpha})`,
        sub: `rgba(204, 205, 234, ${alpha})`,
        dark: `rgba(34, 34, 34, ${alpha})`,
        red: `rgba(255, 97, 97, ${alpha})`,
    };
}

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

export const CommonContainer = css`
    display: flex;
    flex-direction: column;

    padding: 2svh 2svw;
    width: 90svw;
    height: 80svh;
    background-color: ${color(0.4).sub};
    border-radius: 1svw;
    box-shadow: 1svh 1svh 1svw ${color(0.2).dark};
`;
