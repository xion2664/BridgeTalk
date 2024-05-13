import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { customAxios } from '@/shared';
import * as S from '@/styles/child/game/finish.style';

interface Landmark {
  puzzleId: number;
  puzzleNation: string;
  puzzleImageUrl: string;
  puzzleLandmarkName: string;
  puzzleLandmarkContent: string;
}

export function FinishPage() {
  const { id } = useParams();
  const [landmark, setLandmark] = useState<Landmark>();

  useEffect(() => {
    const fetchLandmark = async () => {
      try {
        const response = await customAxios.get(`/puzzle/${id}`, {});
        setLandmark(response.data);
        console.log('API Response Status Code:', response.status);
      } catch (error) {
        console.error('Failed to fetch landmark data:', error);
      }
    };

    if (id) {
      fetchLandmark();
    }
  }, [id]);

  return (
    <S.Container>
      <div className="finishPage">
        {/* <div className="finishPage__header">
          <div className="finishPage__header-toMain">
            <img src="#" alt="메인으로 돌아가기" />
          </div>
        </div> */}
        <div className="finishPage__container">
          <div className="finishPage__container-img">
            <img src={landmark?.puzzleImageUrl} alt="" />
          </div>
          <div className="finishPage__container-side">
            <div className="finishPage__container-side-title">{landmark?.puzzleLandmarkName}</div>
            <div className="finishPage__container-side-description">{landmark?.puzzleLandmarkContent}</div>
            <div className="finishPage__container-side-ok">완료</div>
          </div>
        </div>
      </div>
    </S.Container>
  );
}
