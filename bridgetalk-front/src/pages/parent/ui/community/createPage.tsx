import * as S from '@/styles/parent/createPage.style';
import { useRef, useState } from 'react';
import { useReportStore } from '../../store';
import { postBoardCreate } from '../../query';
import { errorCatch } from '@/shared';
import { useErrorStore } from '@/shared/store';

export function CreatePage() {
  const language = useReportStore((state) => state.language);
  const setErrorModalState = useErrorStore((state) => state.setErrorModalState);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [reportsId, setReportsId] = useState<number>(0);

  async function handleBoardCreate(reportsId: number, boardsTitle: string, boardsContent: string, language: any) {
    const DTO = {
      reportsId,
      boardsTitle,
      boardsContent,
      language,
    };

    try {
      const response = await postBoardCreate(DTO);
      console.log(response);
    } catch (err) {
      if (err instanceof Error) {
        errorCatch(err, setErrorModalState);
      }
    }
  }

  return (
    <S.Container>
      <div className="createPage">
        <div className="createPage__header">
          <button className="createPage__header-toBack">{`<`}</button>
        </div>
        <div className="createPage__container">
          <div className="createPage__container-title">
            <div>Q</div>
            <input type="text" placeholder="제목을 입력하세요" required ref={titleRef} />
          </div>
          <div className="createPage__container-content">
            <textarea
              name="article"
              id="article"
              cols={40}
              rows={30}
              placeholder="내용을 입력해주세요"
              ref={contentRef}
            ></textarea>
          </div>
          <div className="createPage__container-btns">
            <button
              onClick={() => {
                handleBoardCreate(reportsId, titleRef.current!.value, contentRef.current!.value, language);
              }}
            >
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </S.Container>
  );
}
