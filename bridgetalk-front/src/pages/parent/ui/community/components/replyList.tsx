import { useReportStore } from '@/pages/parent/store';
import { ReplyListItem } from './items/replyListItem';
import { useEffect, useState } from 'react';
import { getCommentList } from '@/pages/parent/query';

export function ReplyList() {
  const language = useReportStore((state) => state.language);
  const [replyList, setReplyList] = useState<[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCommentList(language);

        if (data.status === 200) {
          console.log(data.data.commentsList);
          setReplyList(data.data.commentsList);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [language]);

  return <>{replyList && replyList.map((reply: any) => <ReplyListItem reply={reply} />)}</>;
}
