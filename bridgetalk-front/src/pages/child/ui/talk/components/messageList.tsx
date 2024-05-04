import { useLetters } from '@/pages/child/model/useLetter';
import { MessageListItem } from './item/messageListItem';
import * as S from '@/styles/child/talk/messageList.style';

export function MessageList() {
  // const { data: letters, isLoading } = useLetters();

  // if (isLoading) return <div>Loading...</div>;

  return (
    <S.Container>
      <div className="messageList">
        <div className="messageList__list">
          <div className="messageList__list-header">
            <img src={'/assets/img/pic/envelop.svg'} />
            <img src={'/assets/img/pic/mailbox.svg'} />
          </div>
          <div className="messageList__list-content">
            {/* {letters?.map((letter: any) => ( */}
            {/* <MessageListItem key={letter.lettersId} date={letter.lettersRegDate} /> */}
            {/* ))} */}

            <MessageListItem id="1" />
            <MessageListItem id="2" />
            <MessageListItem id="3" />
            <MessageListItem id="4" />
            <MessageListItem id="5" />
          </div>
        </div>
        <div className="messageList__info">
          <span>
            익명의 다이노 친구가
            <br />
            보낸 편지들이야!
          </span>
          <img src={'/assets/img/pic/pink.svg'} />
        </div>
      </div>
    </S.Container>
  );
}
