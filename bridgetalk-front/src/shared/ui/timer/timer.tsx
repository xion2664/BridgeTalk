import { useEffect, useState } from 'react';

interface Props {
  isRecording: any;
}

export function Timer({ isRecording }: Props) {
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
