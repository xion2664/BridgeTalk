import axios from 'axios';

const PERMISSION_DENIED = 'Permission denied';

export function errorCatch(err: Error, setErrorModalState: any) {
  console.log(err, 1);
  if (axios.isAxiosError(err)) {
    console.log(err, 2);
    if (err.response) {
      console.log(err, 3);

      const reader = new FileReader();

      reader.onload = () => {
        const text: any = reader.result;
        console.log(err, 4);

        try {
          const errorData = JSON.parse(text);
          console.log(errorData);

          switch (errorData.errorCode) {
            case 'AUTH_001':
              setErrorModalState('이미 존재하는 닉네임입니다.');
              break;
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
          console.log('예기치 못한 에러 발생');
          setErrorModalState('예기치 못한 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      };

      console.log(err, 5);
      reader.readAsText(err.response.data);
    }
  } else {
    if (PERMISSION_DENIED.match(err.message)) {
      setErrorModalState('마이크 권한을 허용해주세요!');
    }
  }
}
