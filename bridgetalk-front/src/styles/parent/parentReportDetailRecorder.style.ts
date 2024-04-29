import styled, { createGlobalStyle, css } from 'styled-components';
import { color } from './common.style';
import '../../main.css';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1svh 1svw;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: ${color(1).sub};
`;

const virtual = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    border-radius: 50%;
`;

export const ButtonWrapper = styled.button<{ $isRecording: boolean }>`
    background-color: ${(props) => (props.$isRecording ? color(1).red : color(1).main)};
    width: 10svw;
    height: 10svw;
    border-radius: 50%;
    border: none;
    box-shadow: inset 0 1svh 1svw ${color(1).shadowTop};
    position: relative;
    color: ${color(1).bright};
    transition: all 0.2s ease-in-out;

    &::before {
        ${virtual}
        box-shadow: 0 1svh 0.5svw ${color(0.8).dark};
    }

    &::after {
        ${virtual}
        box-shadow: inset 0 -1svh 1svw ${color(0.3).dark};
    }

    &:hover {
        cursor: pointer;
    }
`;

export const Volume = styled.div`
    display: flex;
    align-items: center;
    gap: 0.1svw;
    height: 4svh;
`;

export const VolumeBar = styled.div<{ volume: number; idx: number }>`
    width: 0.4svw;
    height: ${(props) => Math.min(0.2 + ((props.volume / 20) * Math.random()) / Math.abs(4.5 - props.idx), 4)}svw;
    background-color: ${color(0.7).dark};
    transition: height 0.15s ease-in-out;
`;
