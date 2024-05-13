import { customAxios } from '@/shared';

export async function getTalkStop(setReply: any) {
  customAxios
    .get(`/reports/talk-stop`, {
      responseType: 'blob',
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);

      const arrayBuffer = res.data.arrayBuffer().then((res: any) => {
        console.log(res);
        const a = new Uint8Array(res);

        setReply(URL.createObjectURL(new Blob([a], { type: 'audio/mpeg' })));

        const decoder = new TextDecoder('utf-8');
        const dataArray = decoder.decode(a);
        console.log(decoder);
        console.log(dataArray);
        
      });

      const blob = new Blob([res.data], { type: 'audio/mpeg' });

      // setReply(URL.createObjectURL(res.data));
    })
    .catch((err) => console.log(err));
}
