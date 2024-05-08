import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TalkingComponents } from './components/talkingComponents';
import { getTalkStop } from '../../query';
import { useTalkStore } from '../../store';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraControls } from '@/pages/child/ui/talk/components/cameraControl';
import { Dino } from '@/pages/child/ui/talk/components/dino';
import * as S from '@/styles/child/talk/talk.style';

extend({ OrbitControls });

export function TalkingPage() {
  const navigate = useNavigate();
  const [reply, setReply] = useState<any>();
  const reportsId = useTalkStore((state) => state.reportsId);

  return (
    <S.Container>
      <div className="talking">
        <div className="talking__header">
          {/* <TalkingHeader /> */}
          <div
            className="talking__header-end"
            onClick={() => {
              getTalkStop(reportsId, setReply);
            }}
          >
            <img src={'assets/img/pic/end.svg'} />
          </div>
          <div className="talking__header-message">
            <img
              src={'assets/img/pic/message.svg'}
              onClick={() => {
                navigate('/message');
              }}
            />
          </div>
        </div>
        <TalkingComponents reply={reply} setReply={setReply} />
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
