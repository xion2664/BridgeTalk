import * as S from '@/styles/parent/createPage.style';
import { useState } from 'react';

export function CreatePage() {
  const [like, setLike] = useState(false);

  return (
    <S.Container>
      <div className="createPage">
        <div className="createPage__header">
          <button className="createPage__header-toBack">{`<`}</button>
        </div>
        <div className="createPage__container">
          <div className="createPage__container-title">
            <div>Q</div>
            <input type="text" placeholder="제목을 입력하세요" required />
          </div>
          <div className="createPage__container-content">
            <textarea name="article" id="article" cols={40} rows={30} placeholder="내용을 입력해주세요"></textarea>
          </div>
          <div className="createPage__container-btns">
            <button>작성 완료</button>
          </div>
        </div>
      </div>
    </S.Container>
  );
}
