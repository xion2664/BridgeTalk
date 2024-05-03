import * as S from '@/styles/child/talk/talkingPage.style';
import { useVoiceStore } from '@/pages/parent';
import {
  connectAudioStream,
  customAxios,
  generateAudioContext,
  generateVolumeCheckInterval,
  startRecordVoice,
  stopRecordVoice,
} from '@/shared';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { getTalkStart, getTalkStop, postMakeReport, postSendTalk } from '../../model';
import { useTalkStore } from '../../store';

export function TalkingPage() {
  interface AudioContext {
    analyser: AnalyserNode;
    bufferLength: number;
    dataArray: Uint8Array;
  }

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const setAudioBlob = useVoiceStore((state) => state.setAudioBlob);
  const setVolume = useVoiceStore((state) => state.setVolume);
  const volume = useVoiceStore((state) => state.volume);
  const { reportsId, setReportsId } = useTalkStore((state) => ({
    reportsId: state.reportsId,
    setReportsId: state.setReportsId,
  }));

  useEffect(() => {
    // console.log(volume);
  }, [volume]);

  // 녹음 관련
  const streamRef: MutableRefObject<MediaStream | null> = useRef(null);
  const recorderRef: MutableRefObject<MediaRecorder | null> = useRef(null);

  const [closingComment, setClosingComment] = useState<any>();
  const [startComment, setStartComment] = useState<any>();

  useEffect(() => {
    // 오디오 스트림 연결
    if (!streamRef.current) {
      connectAudioStream(streamRef);
    }
    // 토큰 체크
    console.log(process.env.REACT_APP_CHILD_TOKEN);

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
      startRecordVoice(streamRef, recorderRef, setAudioBlob);
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

  return (
    <S.Container>
      <div className="talking">
        <div className="talking__header"></div>
        <div className="talking__container">
          <div className="talking__container-guide"></div>
          <div className="talking__container-dino"></div>
          <div className="talking__container-talk">
            <button
              onClick={() => {
                getTalkStart(setStartComment);
                postMakeReport(setReportsId);
              }}
            >
              대화 시작 & 리포트 만들기
              {startComment && <audio src={startComment} controls autoPlay hidden />}
            </button>
            <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} />
            <button
              onClick={() => {
                getTalkStop(reportsId, setClosingComment);
              }}
            >
              대화 종료
              {closingComment && <audio src={closingComment} controls autoPlay hidden />}
            </button>
          </div>
        </div>
      </div>
    </S.Container>
  );
}

function RecordButton({ isRecording, setIsRecording }: any) {
  const audioBlob = useVoiceStore((state) => state.audioBlob);
  const reportsId = useTalkStore((state) => state.reportsId);
  const [reply, setReply] = useState<any>();
  const audioData = useRef<any>();
  console.log(audioData.current);

  useEffect(() => {
    if (audioBlob && !isRecording) {
      postSendTalk(reportsId, audioBlob!).then((res: any) => {
        if (res && res.data) {
          setReply(URL.createObjectURL(res.data));
        }
      });
    }
  }, [audioBlob]);

  return (
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
  );
}
