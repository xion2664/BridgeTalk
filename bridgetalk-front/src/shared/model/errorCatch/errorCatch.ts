import axios from 'axios';

export function errorCatch(err: Error, setErrorModalState: any) {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      console.log(err.response.data);
      const reader = new FileReader();

      reader.onload = () => {
        const text: any = reader.result;

        try {
          const errorData = JSON.parse(text);

          console.log(errorData);
          switch (errorData.errorCode) {
            case 'GPT_004':
              setErrorModalState('더 많은 이야기를 해주세요!');
              break;
            case 'REPORTS_004':
              setErrorModalState('조금 더 길게 이야기해 보아요!');
              break;
            case 'REPORTS_005':
              setErrorModalState('이미 시작된 대화가 있습니다. 이어서 이야기해 보아요!');
              break;
            default:
              setErrorModalState(errorData.message);
              break;
          }
        } catch (err) {
          console.log(err);
        }
      };

      reader.readAsText(err.response.data);
    }
  }
}
