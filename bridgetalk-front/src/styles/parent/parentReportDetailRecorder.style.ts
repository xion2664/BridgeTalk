import styled from 'styled-components';
import { color } from './common.style';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1svh 1svw;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: ${color(1).sub};

    div {
        display: flex;
        align-items: center;
    }
`;

export const ButtonWrapper = styled.button<{ isRecording: boolean }>`
    background-color: ${(props) => (props.isRecording ? color(1).red : color(1).main)};
    width: 10svw;
    height: 10svw;
    border-radius: 50%;

    &:hover {
        cursor: pointer;
    }
`;
