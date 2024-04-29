import { Dispatch, SetStateAction } from 'react';
import * as S from '@/styles/parent/parentReportDetailRecorder.style';
import { FaMicrophone } from 'react-icons/fa';
import { useVoiceStore } from '@/pages/parent/store';

interface Props {
    readonly isRecording: boolean;
    readonly setIsRecording: Dispatch<SetStateAction<boolean>>;
}

export function ParentReportDetailRecorderButton({ isRecording, setIsRecording }: Props) {
    const setIsRecordFinished = useVoiceStore((state) => state.setIsRecordFinished);

    return (
        <S.ButtonWrapper
            $isRecording={isRecording}
            onClick={() => {
                if (isRecording) {
                    setIsRecording(false);
                    setTimeout(() => {
                        setIsRecordFinished(true);
                    }, 250);
                } else {
                    setIsRecording(true);
                }
            }}
        >
            <FaMicrophone />
            {isRecording ? 'Đang ghi' : 'Trả lời'}
        </S.ButtonWrapper>
    );
}
