import * as S from '@/styles/main/selectDino.style';

export function SelectDino() {
  return (
    <S.Container>
      <div className="title">SELECT CHARACTER</div>
      <div className="selectbox">
        <div className="selectbox__title">캐릭터를 선택해주세요</div>
        <div className="selectbox__content">
          <button className="selectbox__content-prev">{'<'}</button>
          <div className="selectbox__content-dino">공룡캐릭터</div>
          <button className="selectbox__content-next">{'>'}</button>
        </div>
      </div>
      <div className="buttons">
        <button className="buttons__prev">이전</button>
        <button className="buttons__next">다음</button>
      </div>
    </S.Container>
  );
}
