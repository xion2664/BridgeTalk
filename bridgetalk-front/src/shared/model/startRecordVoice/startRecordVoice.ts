import { MutableRefObject, SetStateAction, Dispatch } from 'react';

export function startRecordVoice(
  streamRef: MutableRefObject<MediaStream | null>,
  recorderRef: MutableRefObject<MediaRecorder | null>,
  setAudioBlob: (audioBlob: Blob) => void,
  audioData?: any,
) {
  if (streamRef.current) {
    recorderRef.current = new MediaRecorder(streamRef.current);

    const voiceChunk: Blob[] = [];
    recorderRef.current.ondataavailable = (e: BlobEvent) => {
      voiceChunk.push(e.data);
    };

    recorderRef.current.onstop = () => {
      const audioBlob: Blob = new Blob(voiceChunk, { type: 'audio/mpeg' });

      voiceChunk.splice(0, voiceChunk.length);

      setAudioBlob(audioBlob);
    };

    recorderRef.current.start();
  }
}
