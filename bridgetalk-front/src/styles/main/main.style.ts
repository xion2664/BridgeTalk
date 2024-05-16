import styled, { keyframes } from 'styled-components';
import { bg } from './common.style';

const move = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 5% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

export const Background = styled.div`
  background-image: url('/assets/img/main_bg.png');
  background-size: 110% 150%; /* 배경 이미지가 충분히 크게 설정되어야 합니다. */
  background-repeat: no-repeat; /* 배경 이미지가 반복되지 않도록 설정 */
  ${bg}
  animation: ${move} 30s ease-in-out infinite;
`;
