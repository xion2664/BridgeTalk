import styled, { createGlobalStyle, css } from 'styled-components';

export function color(alpha: number) {
    return {
        main: `rgba(108, 149, 255, ${alpha})`,
        sub: `rgba(166,169,235,${alpha})`,
        sub2: `rgba(204, 205, 234, ${alpha})`,
        black: `rgba(17, 17, 17, ${alpha})`,
        dark: `rgba(34, 34, 34, ${alpha})`,
        red: `rgba(255, 97, 97, ${alpha})`,
        shadowTop: `rgba(185, 204, 255, ${alpha})`,
        bright: `rgba(238, 238, 238, ${alpha})`,
        light: `rgba(224,233,255, ${alpha})`,
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

export const embossing = css`
    box-shadow: 1svh 1svh 1svw ${color(0.4).dark};
    position: relative;

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 1svw;
        box-shadow: inset -1svh -1svh 1svw ${color(0.4).dark};
        z-index: 0;
        pointer-events: none;
    }
`;

export const CommonContainer = css`
    display: flex;
    flex-direction: column;
    position: relative;

    padding: 2svh 2svw;
    width: 90svw;
    height: 80svh;
    background-color: ${color(0.7).sub};
    border-radius: 1svw;
    ${embossing}
`;
