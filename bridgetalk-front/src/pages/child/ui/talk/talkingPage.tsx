import * as S from '@/styles/child/talk/talk.style';
import { useNavigate } from 'react-router-dom';
import { TalkingComponents } from './components/talkingComponents';
import { getTalkStop } from '../../query';
import { useState } from 'react';
import { useTalkStore } from '../../store';

export function TalkingPage() {
  // Navigate
  const navigate = useNavigate();

  // State
  const [reply, setReply] = useState<any>();

  // GlobalState
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
            <img src={'assets/img/pic/pink.svg'} />
          </div>
          <div className="talking__container-talk">
            <p>dino's dialogue</p>
          </div>
        </div>
      </div>
    </S.Container>
  );
}
