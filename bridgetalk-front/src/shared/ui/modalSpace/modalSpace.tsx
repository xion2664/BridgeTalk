import { useVoiceStore } from '@/pages';
import * as S from '@/styles/shared/modalSpace.style';
import { useEffect, useState } from 'react';

export function ModalSpace() {
    const isRecordFinished = useVoiceStore((state) => state.isRecordFinished);

    return <>{isRecordFinished && <ParentVoiceRecordModalArea />}</>;
}

function ParentVoiceRecordModalArea() {
    const setIsRecordFinished = useVoiceStore((state) => state.setIsRecordFinished);
    const audioURL = useVoiceStore((state) => state.audioURL);

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
                <audio src={audioURL} preload={'auto'} controls></audio>
                <div className="buttons" style={{ display: 'flex', gap: '2svw' }}>
                    <button className="closable" onClick={handleClose}>
                        Bỏ
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('해당 편지를 전달할까요?')) {
                                alert('전달 애니메이션 보여주기');
                                setIsRecordFinished(false);
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
