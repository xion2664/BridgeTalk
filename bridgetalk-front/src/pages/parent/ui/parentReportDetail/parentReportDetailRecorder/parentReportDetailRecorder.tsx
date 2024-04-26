import {
    connectAudioStream,
    generateAudioContex,
    generateVolumeCheckInterval,
    startRecordVoice,
    stopRecordVoice,
} from '@/shared';
import * as S from '@/styles/parent/parentReportDetailRecorder.style';
import { memo, useState, useEffect, MutableRefObject, useRef } from 'react';
import { ParentReportDetailRecorderButton } from '@/pages/parent/ui/parentReportDetail/parentReportDetailRecorderButton/parentReportDetailRecorderButton';
import { ParentReportDetailVolumeChecker } from '@/pages/parent/ui/parentReportDetail/parentReportDetailVolumeChecker/parentReportDetailVolumeChecker';
import { useVoiceStore } from '@/pages/parent/store';

interface AudioContext {
    analyser: AnalyserNode;
    bufferLength: number;
    dataArray: Uint8Array;
}

export const ParentReportDetailRecorder = memo(() => {
    const [lang, setLang] = useState<number>(0);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const setAudioURL = useVoiceStore((state) => state.setAudioURL);
    const setVolume = useVoiceStore((state) => state.setVolume);

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
            // 음량 체크
            const { analyser, bufferLength, dataArray }: AudioContext = generateAudioContex(streamRef)!;
            volumeCheckInterval = generateVolumeCheckInterval(analyser, dataArray, bufferLength, setVolume);

            // 녹음 시작
            startRecordVoice(streamRef, recorderRef, setAudioURL);
        }

        return () => {
            // 음량 체크 및 녹음 종료
            if (isRecording && volumeCheckInterval) {
                clearInterval(volumeCheckInterval);
                stopRecordVoice(recorderRef);
            }
        };
    }, [isRecording]);

    return (
        <S.Container>
            <ParentReportDetailVolumeChecker isRecording={isRecording} />
            <div>
                <button>한국어</button>
                <button>베트남어</button>
            </div>
            <ParentReportDetailRecorderButton
                isRecording={isRecording}
                setIsRecording={setIsRecording}
            ></ParentReportDetailRecorderButton>
        </S.Container>
    );
});
