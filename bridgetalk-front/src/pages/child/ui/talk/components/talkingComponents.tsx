import { getTalkStart, getTalkStop, postMakeReport, postSendTalk } from '@/pages/child/model';
import { useTalkStore } from '@/pages/child/store';
import { useVoiceStore } from '@/pages/parent';
import {
  connectAudioStream,
  generateAudioContext,
  generateVolumeCheckInterval,
  startRecordVoice,
  stopRecordVoice,
} from '@/shared';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

export function TalkingComponents() {
  // State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [reply, setReply] = useState<any>();

  // Global State
  const setVolume = useVoiceStore((state) => state.setVolume);
  const volume = useVoiceStore((state) => state.volume);
  const reportsId = useTalkStore((state) => state.reportsId);
  const setReportsId = useTalkStore((state) => state.setReportsId);

  // Ref
  const audioDataRef = useRef<Blob | null>(null);

  // 녹음 관련
  const streamRef: MutableRefObject<MediaStream | null> = useRef(null);
  const recorderRef: MutableRefObject<MediaRecorder | null> = useRef(null);
  const [closingComment, setClosingComment] = useState<any>();
  const [startComment, setStartComment] = useState<any>();

  // 볼륨 체크
  useEffect(() => {
    console.log(volume);
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

    return () => {
      // 음량 체크 및 녹음 종료
      if (isRecording && volumeCheckInterval) {
        clearInterval(volumeCheckInterval);
        stopRecordVoice(recorderRef);
        setVolume(0);
      }
    };
  }, [isRecording]);

  // 녹음 종료 시 '한 마디 전송' API 요청
  useEffect(() => {
    if (audioDataRef.current && !isRecording) {
      postSendTalk(reportsId, audioDataRef.current!).then((res: any) => {
        if (res && res.data) {
          setReply(URL.createObjectURL(res.data));
        }
      });
    }
  }, [audioDataRef.current]);

  return (
    <>
      {' '}
      <button
        onClick={() => {
          getTalkStart(setStartComment);
          postMakeReport(setReportsId);
        }}
      >
        대화 시작 & 리포트 만들기
        {startComment && <audio src={startComment} controls autoPlay hidden />}
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
            setIsRecording(false);

            setTimeout(() => {
              setIsRecording(true);
            }, 500);
          }}
        >
          한 마디 전송하기
        </button>
        <audio src={reply} autoPlay hidden />
      </div>
      <button
        onClick={() => {
          getTalkStop(reportsId, setClosingComment);
        }}
      >
        대화 종료
        {closingComment && <audio src={closingComment} controls autoPlay hidden />}
      </button>
    </>
  );
}
