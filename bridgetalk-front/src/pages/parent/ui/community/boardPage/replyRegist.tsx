import { postCommentCreate } from '@/pages/parent/query';
import { useBoardStore, useReportStore } from '@/pages/parent/store';
import { errorCatch } from '@/shared';
import { useErrorStore } from '@/shared/store';
import { useRef } from 'react';

interface Props {
  boardsId?: number;
}

export function ReplyRegist({ boardsId }: Props) {
  const language = useReportStore((state) => state.language);
  const setErrorModalState = useErrorStore((state) => state.setErrorModalState);

  const contentRef = useRef<HTMLInputElement>(null);
  const setRefresh = useBoardStore((state) => state.setRefresh);

  async function handleCommentCreate(boardsId: number, commentsContent: string, language: any) {
    const requestDto = {
      boardsId,
      commentsContent,
      language,
    };
    console.log(requestDto);
    try {
      const data = await postCommentCreate(requestDto);

      return data;
    } catch (err) {
      if (err instanceof Error) {
        return errorCatch(err, setErrorModalState);
      }
    }
  }
  return (
    <>
      <div className="boardDetailPage__container-reply-input">
        <input type="text" ref={contentRef} />
      </div>
      <div className="boardDetailPage__container-reply-button">
        <button
          onClick={() => {
            if (!boardsId) return;
            handleCommentCreate(boardsId, contentRef.current!.value, language).then((res) => {
              if (!res) return;
              setRefresh();
            });
          }}
        >
          등록하기
        </button>
      </div>
    </>
  );
}
