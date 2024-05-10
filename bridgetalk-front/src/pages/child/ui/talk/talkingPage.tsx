import { useNavigate } from 'react-router-dom';
import { TalkingComponents } from './components/talkingComponents';
import { getTalkStop } from '../../query';
import { useRef, useState } from 'react';
import { useTalkStore } from '../../store';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraControls } from '@/pages/child/ui/talk/components/cameraControl';
import { Dino } from '@/pages/child/ui/talk/components/dino';
import * as S from '@/styles/child/talk/talk.style';

extend({ OrbitControls });

export function TalkingPage() {
  // Navigate
  const navigate = useNavigate();

  // State
  const [reply, setReply] = useState<any>();

  // GlobalState
  const reportsId = useTalkStore((state) => state.reportsId);
  const isRecording = useTalkStore((state) => state.isRecording);
  const setIsRecording = useTalkStore((state) => state.setIsRecording);
  const setIsSend = useTalkStore((state) => state.setIsSend);
  const isEnd = useTalkStore((state) => state.isEnd);
  const setIsEnd = useTalkStore((state) => state.setIsEnd);
  const setIsTalking = useTalkStore((state) => state.setIsTalking);

  // Ref
  const devounceTimerRef = useRef<any>(null);

  return (
    <S.Container>
      <div className="talking">
        <div className="talking__header">
          {/* <TalkingHeader /> */}
          <button
            className="talking__header-end"
            onClick={() => {
              if (isRecording) {
                getTalkStop(reportsId, setReply)
                  .catch((err) => {
                    alert(err);
                    console.log(err);
                  })
                  .then(() => {
                    setTimeout(() => {
                      setIsTalking(false);
                      setIsEnd(true);
                    }, 500);
                  });
                setIsRecording(false);

                if (devounceTimerRef.current !== null) {
                  clearInterval(devounceTimerRef.current);
                }
              }
            }}
          >
            <img src={'assets/img/pic/end.svg'} />
          </button>
          <div className="talking__header-message">
            <img
              src={'assets/img/pic/message.svg'}
              onClick={() => {
                navigate('/message/list');
              }}
            />
          </div>
        </div>
        {isEnd && (
          <div style={{ fontFamily: 'DNF', fontSize: `3svw`, position: 'fixed', top: `10svh` }}>대화가 종료됐어요</div>
        )}
        <TalkingComponents reply={reply} setReply={setReply} devounceTimerRef={devounceTimerRef} />
        <div className="talking__container">
          <div className="talking__container-guide">
            <p>user guide & state announcement</p>
          </div>
          <div className="talking__container-dino">
            <Canvas camera={{ position: [0, 0, 1.2], fov: 50 }}>
              <ambientLight intensity={2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Dino />
              <CameraControls />
            </Canvas>
          </div>
          <div className="talking__container-talk">
            <p>dino's dialogue</p>
          </div>
        </div>
      </div>
    </S.Container>
  );
}
