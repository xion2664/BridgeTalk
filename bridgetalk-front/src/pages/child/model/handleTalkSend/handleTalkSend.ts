import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { postSendTalk } from '../../query';
import { webmToMp3 } from '../webmToMp3/webmToMp3';

export async function handleTalkSend(audio: Blob, setReply: any) {
  console.log('{handleTalkSend: 한마디 전송 함수 호출');

  const mp3Blob = await webmToMp3(audio);
  console.log('{handleTalkSend: mp3 blob 생성 완료');

  const formData = new FormData();
  formData.append('reportsFile', mp3Blob);

  const response = await postSendTalk(formData);
  console.log(`{handleTalkSend: 한마디 전송 API 호출 완료 ${response}}`);

  if (response) {
    setReply(URL.createObjectURL(response.data));
  }
}
