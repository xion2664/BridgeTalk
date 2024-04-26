import { Dispatch, SetStateAction } from 'react';
import * as S from '@/styles/parent/parentReportDetailRecorder.style';

interface Props {
    readonly isRecording: boolean;
    readonly setIsRecording: Dispatch<SetStateAction<boolean>>;
}

export function ParentReportDetailRecorderButton({ isRecording, setIsRecording }: Props) {
    return (
        <S.ButtonWrapper
            isRecording={isRecording}
            onClick={() => {
                setIsRecording(!isRecording);
            }}
        >
            {isRecording ? 'Đang ghi' : 'Trả lời'}
        </S.ButtonWrapper>
    );
}
