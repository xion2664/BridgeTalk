import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/parent/parentInformationMain.style';
import { BackButton } from '@/shared';

export function ParentInformationMain() {
  const navigate = useNavigate();

  return (
    <>
      <BackButton path="../main" navigate={navigate} />
      <S.Container>
        <button onClick={() => navigate('nurture')}>
          <img src="/assets/img/parent_bg.png" width={200} />
          <div>Nurture</div>
        </button>
        <button onClick={() => navigate('word')}>
          <img src="/assets/img/parent_bg.png" width={200} />
          <div>
            tiếng lóng
            <br />
            sự viết tắt
          </div>
        </button>
      </S.Container>
    </>
  );
}
