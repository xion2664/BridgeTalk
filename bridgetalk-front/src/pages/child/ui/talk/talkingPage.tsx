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

export function TalkingPage() {
  interface AudioContext {
    analyser: AnalyserNode;
    bufferLength: number;
    dataArray: Uint8Array;
  }

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const setAudioURL = useVoiceStore((state) => state.setAudioURL);
  const setVolume = useVoiceStore((state) => state.setVolume);
  const volume = useVoiceStore((state) => state.volume);

  useEffect(() => {
    console.log(volume);
  }, [volume]);
  // 녹음 관련
  const streamRef: MutableRefObject<MediaStream | null> = useRef(null);
  const recorderRef: MutableRefObject<MediaRecorder | null> = useRef(null);

  const [closingComment, setClosingComment] = useState<any>();

  useEffect(() => {
    // 오디오 스트림 연결
    if (!streamRef.current) {
      connectAudioStream(streamRef);
    }
    // 토큰 체크
    console.log(process.env.REACT_APP_CHILD_TOKEN);

    customAxios
      .get(`/reports/talk-stop`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_CHILD_TOKEN}`,
          responsType: 'Blob',
        },
      })
      .then((res) => {
        console.log(URL.createObjectURL(res.data));
        setClosingComment(URL.createObjectURL(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

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
      startRecordVoice(streamRef, recorderRef, setAudioURL);
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
    <div className="talking">
      <div className="talking__header"></div>
      <div className="talking__container">
        <div className="talking__container-guide">
          <p>user guide & state announcement</p>
        </div>
        <div className="talking__container-dino"></div>
        <div className="talking__container-talk">
          <p>dino's dialogue</p>
          <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} />
          <button
            onClick={() => {
              customAxios
                .get('/reports/talk-stop', {
                  headers: {
                    Authorization:
                      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNTgxMGJmZTAtNTIxOC00MWNkLThiNzEtNzc0MTdlNWI4YjQ0IiwiaWF0IjoxNzE0NTcyMzIxLCJleHAiOjE3MTU3ODE5MjF9.nBXZXPoO1UM4jS5_LaeVttS9l8XMYfStecwvORVOFvM',
                  },
                  responseType: 'blob',
                })
                .then((res) => {
                  console.log(res.data);
                  setClosingComment(URL.createObjectURL(res.data));
                })

                .catch((err) => console.log(err));
            }}
          >
            대화 종료
            {closingComment && <audio src={closingComment} controls />}
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              customAxios
                .get(`/reports/create-reports`, {
                  headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNTgxMGJmZTAtNTIxOC00MWNkLThiNzEtNzc0MTdlNWI4YjQ0IiwiaWF0IjoxNzE0NTcyMzIxLCJleHAiOjE3MTU3ODE5MjF9.nBXZXPoO1UM4jS5_LaeVttS9l8XMYfStecwvORVOFvM`,
                  },
                })
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => console.log(err));
            }}
          >
            리포트 만들기
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              customAxios
                .get(`/reports/talk-start`, {
                  headers: {
                    Authorization:
                      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNTgxMGJmZTAtNTIxOC00MWNkLThiNzEtNzc0MTdlNWI4YjQ0IiwiaWF0IjoxNzE0NTcyMzIxLCJleHAiOjE3MTU3ODE5MjF9.nBXZXPoO1UM4jS5_LaeVttS9l8XMYfStecwvORVOFvM',
                  },
                  responseType: 'blob',
                })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            }}
          >
            대화 시작
          </button>
        </div>
      </div>
    </div>
  );
}

function RecordButton({ isRecording, setIsRecording }: any) {
  const setIsRecordFinished = useVoiceStore((state) => state.setIsRecordFinished);
  const audioURL = useVoiceStore((state) => state.audioURL);

  return (
    <button
      onClick={() => {
        if (isRecording) {
          setIsRecording(false);
          // setTimeout(() => {
          //   setIsRecordFinished(true);
          // }, 250);
        } else {
          setIsRecording(true);
        }
      }}
    >
      {audioURL && <audio src={audioURL} controls />}
      {isRecording ? '녹음중단' : '녹음시작'}
    </button>
  );
}
