import styled, { css } from 'styled-components';
import { color } from './common.style';

const shadow = css`
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

const textShadowBlue = css`
    text-shadow: 0.3svw 0 0 ${color(1).main}, 0.2svw 0.2svw 0 ${color(1).main}, 0 0.2svw 0 ${color(1).main},
        -0.2svw 0.2svw 0 ${color(1).main}, -0.2svw 0svw 0 ${color(1).main}, -0.2svw -0.2svw 0 ${color(1).main},
        0svw -0.2svw 0 ${color(1).main}, 0.2svw -0.2svw 0 ${color(1).main}, 0 1svh 0.8svh ${color(1).black};
`;

export const Wrapper = styled.div`
    width: 100%;
    height: 40svh;
    background-color: ${color(1).sub};

    border-radius: 2svw;
    box-shadow: 0 0.5svh 0.4svh ${color(1).dark};

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
        ${shadow}
        border-radius: 2svw;
        box-shadow: inset 0 1svh 0.4svh ${color(0.5).bright};
    }

    &::before {
        ${shadow}
        border-radius: 2svw;
        box-shadow: inset 0 -1svh 0.4svh ${color(0.25).dark};
    }

    .title {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        /* transform: translateX(50%); */
        /* transform: translateY(-50%); */

        font-size: 3svw;
        font-family: 'DNF';
        color: ${color(1).bright};
        z-index: 1;

        ${textShadowBlue}
    }

    .cloud {
        background-color: ${color(1).sub2};
        width: 70%;
        height: 70%;

        box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};
        border-radius: 1svw;
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        &::after {
            ${shadow}
            border-radius: 1svw;
            box-shadow: inset 0 -0.5svh 0.4svh ${color(0.25).dark};
        }

        &::before {
            ${shadow}
            border-radius: 1svw;
            box-shadow: inset 0 0.5svh 0.4svh ${color(0.5).bright};
        }
    }
`;
