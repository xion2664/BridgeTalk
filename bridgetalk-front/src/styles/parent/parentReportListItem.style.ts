import styled from 'styled-components';
import { color } from '@/styles/parent/common.style';

export const Container = styled.div`
    display: flex;
    background-color: ${color(1).sub};
    padding: 2svh 1svw;
    color: ${color(1).bright};
    border-radius: 1svw;

    box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};

    position: relative;
    cursor: pointer;

    div {
        font-family: 'DNF';
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
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1svh;
`;

export const ContentHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1svw;

    .tags {
        display: flex;
        gap: 1svw;

        .tag {
            background-color: ${color(1).main};
            box-shadow: 0 0.5svh 0.4svh ${color(0.5).black};
            padding: 0.5svh 0.5svw;
            border-radius: 1svw;
            font-size: 1svw;
        }
    }
`;

export const ContentBody = styled.div``;
