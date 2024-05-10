import { useEffect, useState } from 'react';

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
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    let timer: any = null;
    if (isRecording === undefined) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (isRecording !== undefined && isRecording) {
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
