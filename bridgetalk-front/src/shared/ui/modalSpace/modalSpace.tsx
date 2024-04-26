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

    return (
        <S.Container>
            <div>
                <audio src={audioURL} preload={'auto'} controls></audio>
                <div style={{ display: 'flex', gap: '2svw' }}>
                    <button
                        onClick={() => {
                            setIsRecordFinished(false);
                        }}
                    >
                        Bỏ
                    </button>
                    <button>Gửi</button>
                </div>
            </div>
        </S.Container>
    );
}
