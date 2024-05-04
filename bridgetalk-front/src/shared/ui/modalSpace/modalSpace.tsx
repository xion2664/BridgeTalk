import { postVoiceBlob, useVoiceStore } from '@/pages';
import { customAxios } from '@/shared/util';
import * as S from '@/styles/shared/modalSpace.style';
import { useLocation, useParams } from 'react-router-dom';

export function ModalSpace() {
  const isRecordFinished = useVoiceStore((state) => state.isRecordFinished);

  return <>{isRecordFinished && <ParentVoiceRecordModalArea />}</>;
}

function ParentVoiceRecordModalArea() {
  const { pathname } = useLocation();
  const pathnameRoot = pathname.split('/');
  const reportId: number = Number(pathnameRoot[pathnameRoot.length - 1]);

  const setIsRecordFinished = useVoiceStore((state) => state.setIsRecordFinished);
  const audioBlob = useVoiceStore((state) => state.audioBlob);

  function handleClose(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
    if (e.target instanceof HTMLElement && [...e.target!.classList].some((it) => it === 'closable')) {
      if (confirm('녹음 기록은 저장되지 않습니다.\n정말 나가시겠습니까?')) {
        setIsRecordFinished(false);
      }
    }
  }

  return (
    <S.Container className="closable" onClick={handleClose}>
      <S.AudioContainer>
        <div className="title">녹음이 완료됐어요!</div>
        <audio className="audio" src={URL.createObjectURL(audioBlob!)} preload={'auto'} controls></audio>
        <div className="buttons" style={{ display: 'flex', gap: '2svw' }}>
          <button className="closable close" onClick={handleClose}>
            Bỏ
          </button>
          <button
            className="send"
            onClick={() => {
              if (confirm('해당 편지를 전달할까요?')) {
                alert('전달 애니메이션 보여주기');
                setIsRecordFinished(false);
                postVoiceBlob(reportId, audioBlob!);
              }
            }}
          >
            Gửi
          </button>
        </div>
      </S.AudioContainer>
    </S.Container>
  );
}
