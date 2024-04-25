import styled from 'styled-components';
import { color } from '@/styles/parent/common.style';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    padding: 2svw;
    width: 90svw;
    height: 80svh;
    background-color: ${color(0.4).sub};
    border-radius: 1svw;
    box-shadow: 1svh 1svh 1svw ${color(0.2).dark};
`;

export const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.5fr;

    gap: 2svw;

    width: 100%;
    height: 100%;
`;
