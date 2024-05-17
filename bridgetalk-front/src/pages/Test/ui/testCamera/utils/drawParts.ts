import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS, Results } from '@mediapipe/pose';

interface DressImages {
  leftForearm: HTMLImageElement;
  rightForearm: HTMLImageElement;
  top: HTMLImageElement;
  bottom: HTMLImageElement;
}

/**
 * 각 드레스 부분을 사용자의 관절 위치에 맞게 변형하여 캔버스에 그립니다.
 * @param ctx - 캔버스의 2D 컨텍스트
 * @param results - Mediapipe의 Pose 솔루션 결과
 * @param dressImages - 드레스 이미지
 */
export const drawDressParts = (ctx: CanvasRenderingContext2D, results: Results, dressImages: DressImages) => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.save();
  ctx.clearRect(0, 0, width, height);
  // canvas의 좌우 반전
  ctx.scale(-1, 1);
  ctx.translate(-width, 0);
  // capture image 그리기
  ctx.drawImage(results.image, 0, 0, width, height);

  if (results.poseLandmarks) {
    const landmarks = results.poseLandmarks;

    // 관절 포인트 예시 (어깨, 팔꿈치, 손목)
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftElbow = landmarks[13];
    const rightElbow = landmarks[14];
    const leftWrist = landmarks[15];
    const rightWrist = landmarks[16];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftKnee = landmarks[25];
    const rightKnee = landmarks[26];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];

    // 드레스 상단(top) 그리기
    if (leftShoulder && rightShoulder && leftHip && rightHip) {
      const topWidth = rightShoulder.x * width - leftShoulder.x * width;
      const topHeight = (leftHip.y * height - leftShoulder.y * height) / 2;

      const topCenterX = ((leftShoulder.x + rightShoulder.x) / 2) * width;
      const topCenterY = ((leftShoulder.y + leftHip.y) / 2) * height - topHeight / 2;

      ctx.save();
      ctx.translate(topCenterX, topCenterY);
      ctx.rotate(Math.atan2(rightShoulder.y - leftShoulder.y, rightShoulder.x - leftShoulder.x));
      ctx.drawImage(dressImages.top, -topWidth / 2, -topHeight / 2, topWidth, topHeight);
      ctx.restore();
    }

    // 왼쪽 팔뚝(leftForearm) 그리기
    if (leftShoulder && leftElbow && leftWrist) {
      const forearmWidth = leftElbow.x * width - leftWrist.x * width;
      const forearmHeight = leftElbow.y * height - leftWrist.y * height;

      const forearmCenterX = ((leftElbow.x + leftWrist.x) / 2) * width;
      const forearmCenterY = ((leftElbow.y + leftWrist.y) / 2) * height;

      ctx.save();
      ctx.translate(forearmCenterX, forearmCenterY);
      ctx.rotate(Math.atan2(leftWrist.y - leftElbow.y, leftWrist.x - leftElbow.x));
      ctx.drawImage(dressImages.leftForearm, -forearmWidth / 2, -forearmHeight / 2, forearmWidth, forearmHeight);
      ctx.restore();
    }

    // 오른쪽 팔뚝(rightForearm) 그리기
    if (rightShoulder && rightElbow && rightWrist) {
      const forearmWidth = rightWrist.x * width - rightElbow.x * width;
      const forearmHeight = rightElbow.y * height - rightWrist.y * height;

      const forearmCenterX = ((rightElbow.x + rightWrist.x) / 2) * width;
      const forearmCenterY = ((rightElbow.y + rightWrist.y) / 2) * height;

      ctx.save();
      ctx.translate(forearmCenterX, forearmCenterY);
      ctx.rotate(Math.atan2(rightWrist.y - rightElbow.y, rightWrist.x - rightElbow.x));
      ctx.drawImage(dressImages.rightForearm, -forearmWidth / 2, -forearmHeight / 2, forearmWidth, forearmHeight);
      ctx.restore();
    }

    // 드레스 하단(bottom) 그리기
    if (leftHip && rightHip && leftKnee && rightKnee) {
      const bottomWidth = rightHip.x * width - leftHip.x * width;
      const bottomHeight = leftKnee.y * height - leftHip.y * height;

      const bottomCenterX = ((leftHip.x + rightHip.x) / 2) * width;
      const bottomCenterY = ((leftHip.y + leftKnee.y) / 2) * height;

      ctx.save();
      ctx.translate(bottomCenterX, bottomCenterY);
      ctx.rotate(Math.atan2(rightHip.y - leftHip.y, rightHip.x - leftHip.x));
      ctx.drawImage(dressImages.bottom, -bottomWidth / 2, -bottomHeight / 2, bottomWidth, bottomHeight);
      ctx.restore();
    }
  }

  ctx.restore();
};
