import axios from 'axios';
import { getTalkStart } from '../../query';

export async function handleTalkStart(setReply: any, setErrorModalState: any) {
  try {
    const data = await getTalkStart(setReply);
    console.log(data);
  } catch (err) {
    console.log('에러 캐치하기', err);

    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.log(err.response.data);
        const reader = new FileReader();

        reader.onload = () => {
          const text: any = reader.result;

          try {
            const errorData = JSON.parse(text);

            setErrorModalState(errorData.message);
          } catch (err) {
            console.log(err);
          }
        };

        reader.readAsText(err.response.data);
      }
    }
  }
}
