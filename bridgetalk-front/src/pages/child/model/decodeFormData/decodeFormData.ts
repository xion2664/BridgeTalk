import axios from 'axios';
import { webmToMp3 } from '../webmToMp3/webmToMp3';

export async function decodeFormData(data: any) {
  const responseFormData = await data.data.text();

  const key = responseFormData.split('\r\n')[0];

  /** key 를 기준으로 split한 배열 */
  const parsedArray_1 = responseFormData.split(key);

  const subtitleArray = parsedArray_1[1].split('\r\n');
  const subtitleValue = subtitleArray[5].trim();

  const emotionArray = parsedArray_1[2].split('\r\n');
  const splitedEmotionValue = emotionArray[5].split('"');
  let emotionValue = '';

  for (let word of splitedEmotionValue) {
    emotionValue += word.trim();
  }

  const audioArray = parsedArray_1[3];
  let [_, disposition, type, length, header, ...audioData] = audioArray.split('\r\n');

  // audioData = audioData.join('\r\n');
  // audioData = audioData.join('\r\n').trim();
  // console.log(audioData.substring(0, 4) == 'ID3\x03', audioData[1].substring(0, 4), `ID3\x03`);

  // const contentType = data.headers['content-type'];
  // const boundary = contentType.split('=')[1];

  // const reader = new FileReader();
  // reader.onload = () => {
  //   const text: any = reader.result;
  //   const parts = text.split(`--${boundary}`);
  //   parts.forEach((part: any) => {
  //     let [_1, _2, _3, _4, ...data] = part.split('\r\n');
  //     console.log(data.join('\r\n').trim());
  //   });
  // };
  // reader.readAsText(data.data);\
  // const encoder = new TextEncoder();
  // const byte = encoder.encode(audioData);
  // console.log(audioData);
  // console.log(byte);

  // const audioValue = new Blob([byte], { type: 'audio/mpeg' });

  // const buffer = new TextEncoder().encode(audioData);
  // console.log(buffer);
  // const audioValue = new Blob([buffer], { type: 'audio/mpeg' });
  // console.log(audioValue);
  // const blobURL = URL.createObjectURL(audioValue);
  // console.log(blobURL);

  const audioValue = URL.createObjectURL(data.data);

  return {
    subtitleValue,
    emotionValue,
    audioValue,
  };
}
