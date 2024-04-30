import { customAxios } from '@/shared';

export function postVoiceBlob(reportId: number, voice: Blob) {
  const formData = new FormData();
  const voiceFile = new File([voice], 'testfile.mp3', { type: 'audio/mp3' });

  formData.append('reportsId', String(reportId));
  formData.append('lettersFile', voiceFile);

  console.log(URL.createObjectURL(voice), voice, voiceFile);

  customAxios
    .post('/letters/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
}
