import { customAxios } from '@/shared';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export async function postSendTalk(reportsId: number, audio: Blob, setReply: any) {
  const formData = new FormData();

  const file: any = new File([audio], 'input.webm', { type: 'audio/webm' });
  const fileData = await audio.arrayBuffer();
  const newFileData = new Uint8Array(fileData);

  const ffmpeg = new FFmpeg();

  const baseURL = '/@ffmpeg/core/dist/esm';

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  await ffmpeg.writeFile('input.webm', newFileData);
  console.log('{writeFile}');
  await ffmpeg.exec(['-i', 'input.webm', '-vn', '-ab', '192k', 'output.mp3']);
  console.log('{exec}');
  const data: any = await ffmpeg.readFile('output.mp3');
  console.log('{readFile}');
  const newBlob = new Blob([data.buffer], { type: 'audio/mpeg' });
  console.log('{create new Blob}');

  formData.append('reportsFile', newBlob);
  console.log(newBlob);
  return customAxios
    .patch(`/reports/talk-send/${reportsId}`, formData, {
      responseType: 'blob',
    })
    .then((res) => {
      console.log(res.data);
      setReply(URL.createObjectURL(res.data));
    })
    .catch((err) => console.log(err));
}
