import styled from 'styled-components';
import { color, textShadowBlue } from './common.style';

export const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 0.5fr;
    gap: 2svw;
    position: relative;

    width: 80svw;
    height: 70svh;

    .leftside {
        display: flex;
        flex-direction: column;
        gap: 2svh;
        background-color: ${color(1).sub};
        box-shadow: 0 1svh 0.4svh ${color(0.5).dark};
        border-radius: 1svw;

        height: 100%;

        position: relative;

        padding: 4svh 1svw 1svh 1svw;

        .title {
            position: absolute;
            top: 0;
            left: 2svw;
            transform: translateY(-50%);

            font-family: 'DNF';
            font-size: 2.5svw;
            color: ${color(1).bright};
            z-index: 1;
            ${textShadowBlue}
            text-align: center;

            display: flex;
            gap: 1svw;
            align-items: center;

            .button {
                background-color: transparent;
                border: none;
                z-index: 1;
                background-color: ${color(1).sub};
                padding: 1svh 1svw;
                border-radius: 2svw;
                box-shadow: 0 0.5svh 0.4svh ${color(0.5).dark};
                cursor: pointer;

                img {
                    height: 3svw;
                }
            }
        }

        .content-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            background-color: ${color(1).sub2};
            border-radius: 1svw;
            padding: 2svh 1svw;

            gap: 2svh;

            .content,
            .solution {
                height: 100%;
                background-color: ${color(1).sub};
                border-radius: 1svw;
                padding: 1.5svh 1.5svw;

                font-size: 2svw;
                color: ${color(1).bright};

                box-shadow: 0 0.5svh 0.4svh ${color(0.5).dark};
                position: relative;

                &::after {
                    position: absolute;
                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 100%;

                    content: '';
                    border-radius: 1svw;

                    box-shadow: inset 0 0.5svh 0.4svh ${color(0.5).bright};
                }

                &::before {
                    position: absolute;
                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 100%;

                    content: '';
                    border-radius: 1svw;

                    box-shadow: inset 0 -0.5svh 0.4svh ${color(0.25).dark};
                }
            }
        }

        div {
            font-family: 'DNF';
        }
    }
`;

export const Keywords = styled.div`
    display: flex;
    gap: 1svw;
`;

export const Summary = styled.div`
    width: 100%;
`;

export const Solution = styled.div`
    width: 100%;
    height: 100%;
`;
