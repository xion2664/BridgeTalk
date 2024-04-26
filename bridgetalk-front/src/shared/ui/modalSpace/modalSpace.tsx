import { useVoiceStore } from '@/pages';
import * as S from '@/styles/shared/modalSpace.style';

export function ModalSpace() {
    return (
        <>
            <ParentVoiceRecordModalArea />
        </>
    );
}

function ParentVoiceRecordModalArea() {
    const setIsRecordFinished = useVoiceStore((state) => state.setIsRecordFinished);
    const isRecordFinished = useVoiceStore((state) => state.isRecordFinished);
    const audioURL = useVoiceStore((state) => state.audioURL);

    if (isRecordFinished) {
        return (
            <S.Container>
                <div>
                    <audio src={audioURL} controls></audio>
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
}
