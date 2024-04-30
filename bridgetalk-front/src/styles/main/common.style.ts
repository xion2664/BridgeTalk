import styled, { css } from 'styled-components';

/**
 * 메인 페이지 색상 팔레트
 * 사용예: ${color(0.5).main}
 * @param alpha
 * @returns
 */
export function color(alpha: number) {
  return {
    main: `rgba(255, 97, 97, ${alpha})`,
    sub: `rgba(255, 159, 153, ${alpha})`,
    line: `rgba(255, 232, 232, ${alpha})`,
    light: `rgba(255, 232, 232, ${alpha})`,
    gray: `rgba(170, 170, 170, ${alpha})`,
    white: `rgba(255, 255, 255, ${alpha})`,
    dark: `rgba(64, 64, 64, ${alpha})`,
    black: `rgba(17, 17, 17, ${alpha})`,
  };
}

export const bg = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100svw;
  height: 100svh;
`;
