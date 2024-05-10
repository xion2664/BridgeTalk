import * as S from '@/styles/parent/parentInformationNews.style';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BackButton } from '@/shared';

interface News {
  newsId: number;
  newsTitle: string;
  newsDescription: string;
}

export function ParentInformationNews() {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    const fetchData = [
      {
        newsId: 1,
        newsTitle: 'Dòng vốn ròng trong ngày thứ ba từ Quỹ Anh',
        newsDescription:
          'Các quỹ đã được rút khỏi quỹ loại trong ngày thứ ba. Theo Hiệp hội Đầu tư Tài chính vào ngày 26, 12,6 tỷ won đã bị rò rỉ ròng từ các quỹ <b> cổ phiếu trong nước </b>, không bao gồm các quỹ thương mại trao đổi (ETF) vào ngày 22. 47,2 tỷ won đã được nhập và 59,8 tỷ won là quỹ... ',
      },
      {
        newsId: 2,
        newsTitle: 'Dòng vốn ròng trong ngày thứ ba từ Quỹ Anh',
        newsDescription:
          'Các quỹ đã được rút khỏi quỹ loại trong ngày thứ ba. Theo Hiệp hội Đầu tư Tài chính vào ngày 26, 12,6 tỷ won đã bị rò rỉ ròng từ các quỹ <b> cổ phiếu trong nước </b>, không bao gồm các quỹ thương mại trao đổi (ETF) vào ngày 22. 47,2 tỷ won đã được nhập và 59,8 tỷ won là quỹ... ',
      },
    ];

    setNewsList(fetchData);
  }, []);

  return (
    <>
      <BackButton path="../information" navigate={navigate} />
      <S.Container></S.Container>
    </>
  );
}
