import * as S from '@/styles/parent/parentReportDetailRecorder.style';
import { useVoiceStore } from '@/pages/parent/store';
import { useEffect, useState } from 'react';

interface Props {
  readonly isRecording: boolean;
}

export function ParentReportDetailVolumeChecker({ isRecording }: Props) {
  const volume = useVoiceStore((state) => state.volume);

  return (
    <div className="volume-checker">
      <S.Volume>
        {[...Array(9)].map((it, idx) => (
          <S.VolumeBar volume={volume} idx={idx} key={idx} />
        ))}
      </S.Volume>
      <div className="dino">
        <img src="/assets/img/dino.svg" />
      </div>
      <Timer isRecording={isRecording} />
    </div>
  );
}

function Timer({ isRecording }: Props) {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let timer: any = null;

    if (isRecording) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setTime(0);
      clearInterval(timer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRecording]);
  return <div>{`${Math.floor(time / 60)}`.padStart(2, '0') + ' : ' + `${Math.floor(time % 60)}`.padStart(2, '0')}</div>;
}
