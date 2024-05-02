import { customAxios } from '@/shared';
import * as S from '@/styles/parent/parentMain.style';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ParentMain() {
  const navigate = useNavigate();

  useEffect(() => {
    customAxios
      .get('/profile')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <S.Container>
      <button onClick={() => navigate('../report')}>
        <div>nỗi lòng con cái</div>
      </button>
      <div>DINO</div>
      <button onClick={() => navigate('../information')}>
        <div>lấy thông tin</div>
      </button>
    </S.Container>
  );
}
