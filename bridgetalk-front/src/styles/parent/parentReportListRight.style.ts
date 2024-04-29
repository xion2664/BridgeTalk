import styled, { css } from 'styled-components';
import { color } from './common.style';

const textShadowBlue = css`
    text-shadow: 0.2svw 0 0 ${color(1).main}, 0.2svw 0.2svw 0 ${color(1).main}, 0 0.2svw 0 ${color(1).main},
        -0.2svw 0.2svw 0 ${color(1).main}, -0.2svw 0svw 0 ${color(1).main}, -0.2svw -0.2svw 0 ${color(1).main},
        0svw -0.2svw 0 ${color(1).main}, 0.2svw -0.2svw 0 ${color(1).main}, 0 1svh 0.8svh ${color(1).black};
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 2svh;

    background-color: ${color(1).sub};
    width: 100%;
    height: 100%;

    border-radius: 2svw;
    padding: 5svh 1svw 1svh 1svw;

    box-shadow: 0 1svh 0.4svh ${color(0.5).dark};
    position: relative;

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 2svw;
        content: '';
        pointer-events: none;
        z-index: 0;
        box-shadow: inset 0 0.5svh 0.4svh ${color(0.5).bright};
    }

    .title {
        position: absolute;
        display: flex;
        align-items: center;

        top: 0;
        left: 2svw;
        z-index: 1;
        transform: translateY(-50%);

        div {
            font-family: 'DNF';
            font-size: 3svw;
            color: ${color(1).bright};
            position: relative;

            ${textShadowBlue}
        }

        img {
            width: 10svw;
        }
    }

    .filter {
        display: flex;
        align-items: center;
        gap: 0.6svw;

        background-color: ${color(1).sub2};
        padding: 1svh 1svw;
        border-radius: 1svw;

        .calendar {
            display: flex;
            align-items: center;
            gap: 0.5svw;

            font-size: 1.7svw;

            div {
                font-family: 'DNF';
            }
        }
        .due {
            background-color: ${color(1).bright};
            border-radius: 1svw;
            border: none;
            padding: 0.5svh 0.5svw;
            width: 6svw;
            height: 4svh;

            &:hover {
                cursor: pointer;
            }
        }

        .search {
            display: flex;
            align-items: center;

            background-color: transparent;
            border: none;
            font-size: 2svw;
        }
    }

    .content {
        width: 100%;
        height: 53svh;
        overflow-y: scroll;
        border-radius: 1svw;

        .list {
            width: 100%;
            min-height: 100%;

            background-color: ${color(1).light};

            display: flex;
            flex-direction: column;
            gap: 2svh;

            padding: 1svh 1svw;
            border-radius: 1svw;
        }
    }
`;
