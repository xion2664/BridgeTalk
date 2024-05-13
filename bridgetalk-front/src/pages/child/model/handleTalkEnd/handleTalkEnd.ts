import { errorCatch } from '@/shared';
import { getTalkStop, getTalkUpdate } from '../../query';

export async function handleTalkEnd(
  setReply: any,
  setIsTalking: any,
  setIsEnd: any,
  setIsRecording: any,
  isRecording: any,
  devounceTimerRef: any,
  navigate?: any,
) {
  if (isRecording === false) {
    navigate('/child');
    return;
  }

  const proimises = [];
  proimises.push(getTalkStop(setReply));
  proimises.push(getTalkUpdate());

  try {
    Promise.all(proimises).then((res) => {
      console.log('모든 작업 완료');
      setTimeout(() => {
        setIsTalking(false);
        setIsEnd(true);
      }, 500);

      console.log('대화 마치기');

      setIsRecording(false);
      if (devounceTimerRef.current !== null) {
        clearInterval(devounceTimerRef.current);
      }
    });
  } catch (err) {
    // errorCatch(err, setErrorModal);
  }
}
