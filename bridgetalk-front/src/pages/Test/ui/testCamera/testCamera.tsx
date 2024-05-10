import { ChildrenProps } from '@/shared';
import { useRef, RefObject, useEffect, useState, MutableRefObject } from 'react';
import { capturePicture, connectMedia, startRecordVideo, stopRecordVideo } from '@/pages/Test/model';
import * as S from '@/styles/test/testCamera.style';

export function TestCamera() {
  const videoRef: RefObject<HTMLVideoElement> = useRef(null);
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const streamRef: MutableRefObject<MediaStream | undefined> = useRef();
  const recorderRef: MutableRefObject<MediaRecorder | undefined> = useRef();
  const [recordBlob, setRecordBlob] = useState<Blob[]>();
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    if (!streamRef.current) {
      connectMedia(videoRef, streamRef);
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <TestCameraContainer>
      <Video>
        <video ref={videoRef} autoPlay playsInline controls muted hidden />
        {recordBlob && recordBlob.length > 0 && (
          <video controls>
            <source src={URL.createObjectURL(new Blob(recordBlob, { type: 'video/mp4' }))} type="video/mp4" />
          </video>
        )}
      </Video>
      <Canvas>
        <canvas ref={canvasRef} />
      </Canvas>
      <Button>
        <button onClick={() => capturePicture(canvasRef, videoRef)}>사진 캡처</button>
        {isRecording ? (
          <button onClick={() => stopRecordVideo(recorderRef, setIsRecording)}>녹화중지</button>
        ) : (
          <button onClick={() => startRecordVideo(recorderRef, streamRef, setRecordBlob, setIsRecording)}>
            녹화하기
          </button>
        )}
      </Button>
    </TestCameraContainer>
  );
}

function TestCameraContainer({ children }: ChildrenProps) {
  return <S.Container>{children}</S.Container>;
}

// video
function Video({ children }: ChildrenProps) {
  return <S.VideoWrapper>{children}</S.VideoWrapper>;
}

function Canvas({ children }: ChildrenProps) {
  return <S.CanvasWrapper>{children}</S.CanvasWrapper>;
}

function Button({ children }: ChildrenProps) {
  return <S.ButtonWrapper>{children}</S.ButtonWrapper>;
}
