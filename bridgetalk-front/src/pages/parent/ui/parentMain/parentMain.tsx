import { customAxios } from '@/shared';
import * as S from '@/styles/parent/parentMain.style';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReportStore } from '../../store';

export function ParentMain() {
  const navigate = useNavigate();

  const setChildrenList = useReportStore((state) => state.childrenList);

  useEffect(() => {
    customAxios
      .get('/profile')
      .then((res) => {
        // 부모의 프로필에서 자녀들의 정보를 빼 childrneList에 저장
        const childrenList: any = [];
        const profileList = res.data.profileList;

        for (let i = 1; i < profileList.length; i++) {
          childrenList.push(profileList[i]);
        }

        setChildrenList(childrenList);
        console.log(childrenList);
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
