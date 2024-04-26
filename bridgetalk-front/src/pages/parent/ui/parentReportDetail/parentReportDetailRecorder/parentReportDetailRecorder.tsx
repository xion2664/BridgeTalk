import {
    connectAudioStream,
    generateAudioContex,
    generateVolumeCheckInterval,
    startRecordVoice,
    stopRecordVoice,
} from '@/shared';
import * as S from '@/styles/parent/parentReportDetailRecorder.style';
import { memo, useState, Dispatch, SetStateAction, useEffect, MutableRefObject, useRef } from 'react';

interface AudioContext {
    analyser: AnalyserNode;
    bufferLength: number;
    dataArray: Uint8Array;
}

export const ParentReportDetailRecorder = memo(() => {
    const [lang, setLang] = useState<number>(0);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0);
    const [audioURL, setAudioURL] = useState<string>('');

    // 녹음 관련
    const streamRef: MutableRefObject<MediaStream | null> = useRef(null);
    const recorderRef: MutableRefObject<MediaRecorder | null> = useRef(null);

    useEffect(() => {
        // 오디오 스트림 연결
        if (!streamRef.current) {
            connectAudioStream(streamRef);
        }

        return () => {
            // 오디오 스트림 해제
            if (streamRef.current) {
                streamRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        let volumeCheckInterval: any = null;
        if (isRecording) {
            const { analyser, bufferLength, dataArray }: AudioContext = generateAudioContex(streamRef)!;
            volumeCheckInterval = generateVolumeCheckInterval(analyser, dataArray, bufferLength, setVolume);

            startRecordVoice(streamRef, recorderRef, setAudioURL);
        }

        return () => {
            if (isRecording && volumeCheckInterval) {
                clearInterval(volumeCheckInterval);
                stopRecordVoice(recorderRef);
            }
        };
    }, [isRecording]);

    useEffect(() => {
        console.log(volume);
    }, [volume]);

    useEffect(() => {
        console.log(audioURL);
    }, [audioURL]);

    return (
        <S.Container>
            <div>음량표시</div>
            <div>음량표시공룡</div>
            <div>녹음시간</div>
            <div>
                <button>한국어</button>
                <button>베트남어</button>
            </div>
            <RecordButton isRecording={isRecording} setIsRecording={setIsRecording}></RecordButton>
        </S.Container>
    );
});

interface Props {
    readonly isRecording: boolean;
    readonly setIsRecording: Dispatch<SetStateAction<boolean>>;
}

function RecordButton({ isRecording, setIsRecording }: Props) {
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
