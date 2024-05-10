import { useTalkStore } from '@/pages';
import { useEffect, useRef, useState } from 'react';

interface Props {
  isRecording?: any;
  setIsRecording?: any;
  getTalkStop?: any;
  reportsId?: any;
  setReply?: any;
  devounceTimerRef?: any;
}

export function Timer({ isRecording, setIsRecording, getTalkStop, reportsId, setReply, devounceTimerRef }: Props) {
  const [time, setTime] = useState<number>(0);

  const isEnd = useTalkStore((state) => state.isEnd);
  const setIsEnd = useTalkStore((state) => state.setIsEnd);

  const timerRef = useRef<any>();

  useEffect(() => {
    // let timerRef.current: any = null;

    if (isRecording === undefined) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (isRecording !== undefined && isRecording) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setTime(0);
      clearInterval(timerRef.current);
    }
    console.log(`{ Recording 상태 변화 ${isRecording} ${isEnd}}`);
    if (isEnd) {
      console.log('{ 타이머 종료 }');
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  useEffect(() => {
    if (isEnd) {
      clearTimeout(timerRef.current);
    }
  }, [isEnd]);

  useEffect(() => {
    if (setIsRecording !== null && time >= 60 * 4 + 40 && !isEnd) {
      getTalkStop(reportsId, setReply);
      setIsRecording(false);
      setIsEnd(true);
      if (devounceTimerRef.current !== null) {
        clearInterval(devounceTimerRef.current);
      }
    }
  }, [time]);

  return <div>{`${Math.floor(time / 60)}`.padStart(2, '0') + ' : ' + `${Math.floor(time % 60)}`.padStart(2, '0')}</div>;
}
