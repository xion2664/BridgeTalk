import {
  connectAudioStream,
  generateAudioContext,
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
  const setAudioBlob = useVoiceStore((state) => state.setAudioBlob);
  const setVolume = useVoiceStore((state) => state.setVolume);
  const audioDataRef = useRef<Blob | null>(null);

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

    if (isRecording && !volumeCheckInterval) {
      // 음량 체크
      const { analyser, bufferLength, dataArray }: AudioContext = generateAudioContext(streamRef)!;
      volumeCheckInterval = generateVolumeCheckInterval(analyser, dataArray, bufferLength, setVolume);

      // 녹음 시작
      startRecordVoice(streamRef, recorderRef, audioDataRef);
    }

    return () => {
      // 음량 체크 및 녹음 종료
      if (isRecording && volumeCheckInterval) {
        clearInterval(volumeCheckInterval);
        stopRecordVoice(recorderRef);
        setVolume(0);
      }
    };
  }, [isRecording]);

  useEffect(() => {
    if (audioDataRef.current!.size > 1024) {
      setAudioBlob(audioDataRef.current!);
    }
  }, [audioDataRef.current]);

  return (
    <S.Container>
      <div className="title">답장하기</div>
      <ParentReportDetailVolumeChecker isRecording={isRecording} />
      <ParentReportDetailRecorderButton
        isRecording={isRecording}
        setIsRecording={setIsRecording}
      ></ParentReportDetailRecorderButton>
    </S.Container>
  );
});
