import { postCommentCreate } from '@/pages/parent/query';
import { useReportStore } from '@/pages/parent/store';
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

  async function handleCommentCreate(boardsId: number, commentsContent: string, language: any) {
    const requestDto = {
      boardsId,
      commentsContent,
      language,
    };

    try {
      const data = await postCommentCreate(requestDto);
      console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        errorCatch(err, setErrorModalState);
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
            handleCommentCreate(boardsId, contentRef.current!.value, language);
          }}
        >
          등록하기
        </button>
      </div>
    </>
  );
}
