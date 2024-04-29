import styled from 'styled-components';
import { color } from './common.style';

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

    .title {
        position: absolute;
        top: -3svh;
        left: 10svw;
        font-size: 2svw;
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
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 100%;
            border-radius: 1svw;
            box-shadow: inset 0 -1svh 0.8svh ${color(0.25).dark};
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
            box-shadow: inset 0 1svh 0.8svh ${color(0.5).bright};
            z-index: 0;
            pointer-events: none;
        }
    }
`;
