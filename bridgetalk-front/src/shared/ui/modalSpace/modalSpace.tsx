import { postVoiceBlob, useProfileStore, useReportStore, useUserStore, useVoiceStore } from '@/pages';
import { handleProfileLogin } from '@/pages/main/model/handleProfileLogin/handleProfileLogin';
import { useErrorStore } from '@/shared/store';
import { customAxios } from '@/shared/util';
import * as S from '@/styles/shared/modalSpace.style';
import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function ModalSpace() {
  const isRecordFinished = useVoiceStore((state) => state.isRecordFinished);
  const errorModalState = useErrorStore((state) => state.errorModalState);
  const passwordCheckModalState = useProfileStore((state) => state.passwordCheckModalState);

  return (
    <>
      {isRecordFinished && <ParentVoiceRecordModalArea />}
      {errorModalState && <ErrorModal />}
      {passwordCheckModalState && <PasswordCheckModalArea />}
    </>
  );
}

function ParentVoiceRecordModalArea() {
  const { pathname } = useLocation();
  const pathnameRoot = pathname.split('/');
  const reportId: number = Number(pathnameRoot[pathnameRoot.length - 1]);

  // Global State
  const setIsRecordFinished = useVoiceStore((state) => state.setIsRecordFinished);
  const audioBlob = useVoiceStore((state) => state.audioBlob);
  const language = useReportStore((state) => state.language);

  const title = useMemo(
    () => ({
      kor: '녹음이 완료됐어요!',
      viet: 'Việc ghi âm đã xong!',
    }),
    [],
  );

  const button = useMemo(
    () => ({
      kor: ['취소하기', '보내기'],
      viet: ['Bỏ', 'Gửi'],
    }),
    [],
  );

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
        <div className="title" style={{ fontFamily: language === 'kor' ? 'DNF' : 'CherryBomb' }}>
          {title[language]}
        </div>
        <audio className="audio" src={URL.createObjectURL(audioBlob!)} preload={'auto'} controls></audio>
        <div className="buttons" style={{ display: 'flex', gap: '2svw' }}>
          <button
            className="closable close"
            onClick={handleClose}
            style={{ fontFamily: language === 'kor' ? 'DNF' : 'CherryBomb' }}
          >
            {button[language][0]}
          </button>
          <button
            className="send"
            style={{ fontFamily: language === 'kor' ? 'DNF' : 'CherryBomb' }}
            onClick={() => {
              if (confirm('해당 편지를 전달할까요?')) {
                alert('전달 애니메이션 보여주기');
                setIsRecordFinished(false);
                postVoiceBlob(reportId, audioBlob!);
              }
            }}
          >
            {button[language][1]}
          </button>
        </div>
      </S.AudioContainer>
    </S.Container>
  );
}

function ErrorModal() {
  const errorStore = useErrorStore();

  useEffect(() => {
    setTimeout(() => {
      errorStore.setErrorModalState('');
    }, 2000);
  }, []);

  return <S.ErrorModalContainer>{errorStore.errorModalState}</S.ErrorModalContainer>;
}

function PasswordCheckModalArea() {
  const inputRef: any = useRef<HTMLInputElement>();
  const profileStore = useProfileStore();
  const navigate = useNavigate();
  const userStore = useUserStore();
  const errorStore = useErrorStore();

  return (
    <S.Container>
      <S.PasswordCheckModaContainer>
        <div className="title">비밀번호 확인</div>
        <div className="content">
          <img src={'assets/img/main/passwordicon.svg'} />
          <input
            type="password"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return;
              handleProfileLogin(
                profileStore.passwordCheckModalState[0],
                inputRef.current.value,
                userStore,
                errorStore.setErrorModalState,
              ).then((res) => {
                if (res) {
                  const navigatePath = profileStore.passwordCheckModalState[1];

                  profileStore.setPasswordCheckModalState(false);
                  navigate(navigatePath);
                }
              });
            }}
          ></input>
        </div>
        <div className="buttons">
          <button
            className="buttons__cancel"
            onClick={() => {
              profileStore.setPasswordCheckModalState(false);
            }}
          >
            취소
          </button>
          <button
            className="buttons__accept"
            onClick={() => {
              handleProfileLogin(
                profileStore.passwordCheckModalState[0],
                inputRef.current.value,
                userStore,
                errorStore.setErrorModalState,
              ).then((res) => {
                if (res) {
                  const navigatePath = profileStore.passwordCheckModalState[1];

                  profileStore.setPasswordCheckModalState(false);
                  navigate(navigatePath);
                }
              });
            }}
          >
            확인
          </button>
        </div>
      </S.PasswordCheckModaContainer>
    </S.Container>
  );
}
