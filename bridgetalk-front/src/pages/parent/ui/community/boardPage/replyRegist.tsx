import { postCommentCreate } from '@/pages/parent/query';
import { useBoardStore, useReportStore } from '@/pages/parent/store';
import { errorCatch } from '@/shared';
import { useErrorStore } from '@/shared/store';
import { MutableRefObject, RefObject, useRef } from 'react';

interface Props {
  boardsId?: number;
}

export function ReplyRegist({ boardsId }: Props) {
  const language = useReportStore((state) => state.language);
  const setErrorModalState = useErrorStore((state) => state.setErrorModalState);

  const contentRef = useRef<HTMLInputElement>(null);
  const setRefresh = useBoardStore((state) => state.setRefresh);

  function inputInit(contentRef: RefObject<HTMLInputElement>) {
    contentRef.current!.value = '';
  }

  async function handleCommentCreate(boardsId: number, commentsContent: string, language: any) {
    const requestDto = {
      boardsId,
      commentsContent,
      language,
    };

    try {
      const data = await postCommentCreate(requestDto);

      return data;
    } catch (err) {
      if (err instanceof Error) {
        return false;
      }
    }
  }
  return (
    <>
      <div className="boardDetailPage__container-reply-input">
        <input
          type="text"
          ref={contentRef}
          placeholder="생각을 답글로 달아보세요"
          onKeyDown={(e) => {
            if (e.key !== 'Enter' || !boardsId) return;

            handleCommentCreate(boardsId, contentRef.current!.value, language).then((res) => {
              setRefresh();
              inputInit(contentRef);
            });
          }}
        />
      </div>
      <div className="boardDetailPage__container-reply-button">
        <button
          onClick={() => {
            if (!boardsId) return;
            handleCommentCreate(boardsId, contentRef.current!.value, language).then((res) => {
              setRefresh();
              inputInit(contentRef);
            });
          }}
        >
          등록하기
        </button>
      </div>
    </>
  );
}
