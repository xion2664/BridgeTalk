import { dateToString } from '@/shared';

interface Reply {
  commentsId: number;
  parentsNickname: string;
  commentsContent: string;
  likes: number;
  createdAt: string;
}

interface Props {
  reply: Reply;
}

export function ReplyListItem({ reply }: Props) {
  return (
    <div className="replyListItem">
      <div className="replyListItem-left"></div>
      <div className="replyListItem-right">
        <div className="replyListItem-right-top">
          <div className="replyListItem-right-top-writer">{reply.parentsNickname}</div>
          <div className="replyListItem-right-top-date">{dateToString(reply.createdAt)}</div>
        </div>
        <div className="replyListItem-right-bottom">{reply.commentsContent}</div>
      </div>
    </div>
  );
}
