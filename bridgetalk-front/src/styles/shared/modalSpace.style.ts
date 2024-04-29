import styled, { keyframes } from 'styled-components';
import { color, embossing } from '../parent/common.style';

const fadeInWithMove = keyframes`
    0% {
        transform: translateY(3svh);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;
const fadeOutWithMove = keyframes`
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(-3svh);
        opacity: 0;
    }
`;

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
`;

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${fadeIn} 0.5s ease-in-out;

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
    animation: ${fadeInWithMove} 0.5s  ease-in-out;

    .buttons button {
        padding: 2svh 2svw;
        font-size: 5svh;
        border-radius: 1svw;
        cursor: pointer;

        ${embossing}
    }
`;
