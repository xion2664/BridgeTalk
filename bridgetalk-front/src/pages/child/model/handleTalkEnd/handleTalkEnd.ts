import { getTalkStop, getTalkUpdate } from '../../query';

export async function handleTalkEnd(
  setReply: any,
  setIsTalking: any,
  setIsEnd: any,
  setIsRecording: any,
  isRecording: any,
  devounceTimerRef: any,
) {
  if (isRecording === false) return;

  getTalkStop(setReply).then(() => {
    setTimeout(() => {
      setIsTalking(false);
      setIsEnd(true);
    }, 500);
  });
  console.log('대화 마치기');
  setIsRecording(false);
  getTalkUpdate();

  if (devounceTimerRef.current !== null) {
    clearInterval(devounceTimerRef.current);
  }
}
