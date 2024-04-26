import styled from 'styled-components';
import { color, embossing } from '../parent/common.style';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${color(0.7).dark};
`;

export const AudioContainer = styled.div`
    width: 50svw;
    height: 50svh;
    background-color: ${color(0.8).sub};
    border-radius: 1svw;
    gap: 2svh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${embossing}

    .buttons button {
        padding: 2svh 2svw;
        font-size: 5svh;
        border-radius: 1svw;
        cursor: pointer;

        ${embossing}
    }
`;
