import styled from 'styled-components';
import { CommonContainer, color } from './common.style';

export const Container = styled.div`
    ${CommonContainer}
`;

export const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 2svw;

    height: 100%;

    .leftside {
        display: grid;
        grid-template-rows: 1fr 1fr;
        gap: 2svh;

        div {
            background-color: ${color(1).sub};
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
`;
