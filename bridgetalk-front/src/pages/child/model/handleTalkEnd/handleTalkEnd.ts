import { errorCatch } from '@/shared';
import { getTalkStop, getTalkUpdate } from '../../query';

export async function handleTalkEnd(
  setReply: any,
  setIsTalking: any,
  setIsEnd: any,
  setIsRecording: any,
  isRecording: any,
  devounceTimerRef: any,
  isEnd?: any,
  isTalking?: any,
  navigate?: any,
) {
  if (!isTalking && isEnd) {
    navigate('/child');
    return;
  }

  // 대화 마치기 누르고 마무리 멘트 나오는 동안 다시 실행되는 것 방지
  if (!isRecording && !isTalking) return;

  const proimises = [];
  proimises.push(getTalkStop(setReply));
  proimises.push(getTalkUpdate());

  setIsTalking(false);
  setIsRecording(false);

  try {
    const res = Promise.allSettled(proimises);
    console.log(res);
    if (devounceTimerRef.current !== null) {
      clearInterval(devounceTimerRef.current);
    }
  } catch (err) {
    // errorCatch(err, setErrorModal);
  }
}
