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
      <div className="replyListItem__left">
        <div className="replyListItem__left-like">
          <button className="replyListItem__left-like-btn">
            <img src={'/assets/img/parent/community/favor_solid.svg'} />
          </button>
        </div>
        <div className="replyListItem__left-cnt">0</div>
      </div>
      <div className="replyListItem__right">
        <div className="replyListItem__right-top">
          <div className="replyListItem__right-top-writer">{reply.parentsNickname}</div>
          <div className="replyListItem__right-top-date">{dateToString(reply.createdAt)}</div>
        </div>
        <div className="replyListItem__right-bottom">{reply.commentsContent}</div>
      </div>
    </div>
  );
}
