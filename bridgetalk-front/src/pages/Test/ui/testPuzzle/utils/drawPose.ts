import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS, Results } from '@mediapipe/pose';

/**
 * 관절을 캔버스에 그립니다.
 * @param ctx - 캔버스의 2D 컨텍스트
 * @param results - Mediapipe의 Pose 솔루션 결과
 */
export const drawPose = (ctx: CanvasRenderingContext2D, results: Results) => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.save();
  ctx.clearRect(0, 0, width, height);
  // canvas의 좌우 반전
  ctx.scale(-1, 1);
  ctx.translate(-width, 0);
  // capture image 그리기
  ctx.drawImage(results.image, 0, 0, width, height);
  // 포즈 묘사
  if (results.poseLandmarks) {
    const landmarks = results.poseLandmarks;

    // 골격 및 랜드마크 묘사
    drawConnectors(ctx, landmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
    drawLandmarks(ctx, landmarks, { color: '#FF0000', lineWidth: 2 });
  }
  ctx.restore();
};
