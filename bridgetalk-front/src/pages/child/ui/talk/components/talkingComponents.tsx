import { getAvgVolume } from '@/pages/child/model';
import { getTalkStart, getTalkStop, postMakeReport, postSendTalk } from '@/pages/child/query';
import { useTalkStore } from '@/pages/child/store';
import { useVoiceStore } from '@/pages/parent';
import {
  connectAudioStream,
  generateAudioContext,
  generateVolumeCheckInterval,
  startRecordVoice,
  stopRecordVoice,
} from '@/shared';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

export function TalkingComponents({ reply, setReply }: any) {
  // State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);

  // Global State
  const volume = useVoiceStore((state) => state.volume);
  const setVolume = useVoiceStore((state) => state.setVolume);
  const reportsId = useTalkStore((state) => state.reportsId);
  const setReportsId = useTalkStore((state) => state.setReportsId);
  const setAudioBlob = useVoiceStore((state) => state.setAudioBlob);
  const audioBlob = useVoiceStore((state) => state.audioBlob);

  // Ref
  const audioDataRef = useRef<Blob | null>(null);
  const getAvgVolumeData = useRef<any>(null);
  const devounceTimerRef = useRef<any>(null);

  // 녹음 관련
  const streamRef: MutableRefObject<MediaStream | null> = useRef(null);
  const recorderRef: MutableRefObject<MediaRecorder | null> = useRef(null);

  // 볼륨 체크
  useEffect(() => {
    if (isRecording && getAvgVolumeData.current) {
      console.log(volume, getAvgVolumeData.current(volume));
      if (volume >= Math.floor(getAvgVolumeData.current(volume) * 0.6)) {
        console.log('현재 볼륨이 평균 볼륨의 60% 이상이기에 타이머를 실행시킵니다.');

        if (devounceTimerRef.current) {
          clearTimeout(devounceTimerRef.current);
        }
        devounceTimerRef.current = setTimeout(() => {
          setIsSend(true);
          setIsRecording(false);
        }, 2000);
      }
    }
  }, [volume]);

  // 오디오 스트림 연결 및 해제
  useEffect(() => {
    if (!streamRef.current) {
      connectAudioStream(streamRef);
    }

    return () => {
      if (streamRef.current) {
        streamRef.current = null;
      }
    };
  }, []);

  // 녹음
  useEffect(() => {
    let volumeCheckInterval: any = null;

    if (isRecording && !volumeCheckInterval) {
      // 음량 체크
      const { analyser, bufferLength, dataArray }: any = generateAudioContext(streamRef)!;
      volumeCheckInterval = generateVolumeCheckInterval(analyser, dataArray, bufferLength, setVolume);

      // 녹음 시작
      startRecordVoice(streamRef, recorderRef, audioDataRef);
    }

    if (!isRecording) {
      console.log('함수 재선언');
      getAvgVolumeData.current = getAvgVolume();
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

  // 한마디 전송 시
  useEffect(() => {
    if (isSend) {
      setTimeout(() => {
        setAudioBlob(audioDataRef.current!);
      }, 0);
    }
  }, [isSend]);

  // audioBlob(내 녹음 내용) 저장 후 '한 마디 전송' API 요청
  useEffect(() => {
    if (audioBlob) {
      postSendTalk(reportsId, audioBlob, setReply).finally(() => {
        setIsSend(false);
        setIsRecording(true);
      });
    }
  }, [audioBlob]);

  return (
    <>
      <button
        onClick={() => {
          getTalkStart(setReply);
          postMakeReport(setReportsId);
        }}
      >
        대화 시작 & 리포트 만들기
      </button>
      <div className="record">
        <button
          onClick={() => {
            if (isRecording) {
              setIsRecording(false);
            } else {
              setIsRecording(true);
            }
          }}
        >
          {isRecording ? '녹음중단' : '녹음시작'}
        </button>
        {reply && <div>답장 내용</div>}
        <button
          onClick={() => {
            setIsSend(true);
            setIsRecording(false);
          }}
        >
          한 마디 전송하기
        </button>
      </div>
      <button
        onClick={() => {
          getTalkStop(reportsId, setReply);
        }}
      >
        대화 종료
      </button>
      {reply && <audio src={reply} hidden autoPlay />}
    </>
  );
}
