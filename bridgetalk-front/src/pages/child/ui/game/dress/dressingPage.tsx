import React, { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import Webcam from 'react-webcam';
import { Camera } from '@mediapipe/camera_utils';
import { useNavigate } from 'react-router-dom';
import { Pose, Results } from '@mediapipe/pose';
import { drawDressParts } from './utils/drawParts';
import html2canvas from 'html2canvas';

// 이미지 URL을 변수에 직접 할당
const leftForearmUrl = '/assets/img/child/game/leftForearm.png';
const rightForearmUrl = '/assets/img/child/game/rightForearm.png';
const topUrl = '/assets/img/child/game/top.png';
const bottomUrl = '/assets/img/child/game/bottom.png';

export function DressingPage() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<Results>();

  const [dressImages, setDressImages] = useState({
    leftForearm: null as HTMLImageElement | null,
    rightForearm: null as HTMLImageElement | null,
    top: null as HTMLImageElement | null,
    bottom: null as HTMLImageElement | null,
  });

  useEffect(() => {
    const loadImage = (src: string) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      });
    };

    Promise.all([loadImage(leftForearmUrl), loadImage(rightForearmUrl), loadImage(topUrl), loadImage(bottomUrl)]).then(
      ([leftForearm, rightForearm, top, bottom]) => {
        setDressImages({ leftForearm, rightForearm, top, bottom });
      },
    );
  }, []);

  const onResults = useCallback(
    (results: Results) => {
      resultsRef.current = results;
      const { leftForearm, rightForearm, top, bottom } = dressImages;
      if (leftForearm && rightForearm && top && bottom) {
        const canvasCtx = canvasRef.current!.getContext('2d')!;
        drawDressParts(canvasCtx, results, { leftForearm, rightForearm, top, bottom });
      }
    },
    [dressImages],
  );

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    if (webcamRef.current !== undefined && webcamRef.current !== null) {
      const camera = new Camera(webcamRef.current.video!, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current!.video! });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }
  }, [onResults]);

  const OutputData = () => {
    const results = resultsRef.current!;
    console.log(results.poseLandmarks);
  };

  const captureImage = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const capturedImage = await html2canvas(canvas);
      const link = document.createElement('a');
      link.href = capturedImage.toDataURL('image/png');
      link.download = 'canvas-image.png';
      link.click();
    }
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Webcam
        audio={false}
        style={{ visibility: 'hidden' }}
        width={1280}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
      />
      <canvas ref={canvasRef} className={styles.canvas} width={1280} height={720} />
      <div className={styles.buttonContainer}>
        {/* <button className={styles.button} onClick={OutputData}>
          Output Data
        </button> */}
        <div className={styles.side}>
          <img
            src="/assets/img/child/back.svg"
            alt=""
            onClick={() => {
              navigate('/game');
            }}
          />
          <div className={styles.title}>
            <h1>바롯 사야</h1>
            <h2>Baro`t Saya</h2>
          </div>
          <div className={styles.content}>
            필리핀 남성들의 바롱에 견줄만한 필리핀 여성들의 전통 옷이 바로 ‘바롯 사야’예요.
            <br />
            ‘바롯’은 필리핀 말로 블라우스를 뜻하고,‘사야’는 치마를 뜻합니다.
            <br /> 즉 블라우스에 치마를 곁들어 입은 모양이에요.
            <br /> 필리핀 여성들이 축제나 결혼식 등 중요한 자리에 갈 때 자주 입는답니다.
          </div>
          <div className={styles.capture} onClick={captureImage}>
            <img src="/assets/img/child/game/capture.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: css`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('/assets/img/child/game/candyBackground.png');
  `,
  canvas: css`
    position: absolute;
    width: 1280px;
    height: 720px;
    background-color: #fff;
  `,
  side: css`
    width: 20svw;
    position: absolute;
    padding: 5svh;
    background-color: #ff8379;
    border-radius: 5svw;
    box-shadow: 3 3 3 #00000050;
  `,
  title: css`
    * {
      font-family: 'DNF';
    }
  `,
  content: css`
    margin-top: 5svh;
  `,
  capture: css`
    img {
      height: 10svh;
      cursor: pointer;
    }
    * {
      color: white;
    }
  `,
  buttonContainer: css`
    position: absolute;
    top: 20px;
    left: 20px;
  `,
  button: css`
    color: #fff;
    background-color: #0082cf;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    padding: 10px 10px;
    cursor: pointer;
  `,
};
