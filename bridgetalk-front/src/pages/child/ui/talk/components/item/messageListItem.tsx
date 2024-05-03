import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/child/talk/messageListItem.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// interface MessageListItemProps {
//   date: string;
// }

// export function MessageListItem({ date }: MessageListItemProps) {
//   const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <div className="messageListItem">
//       <div className="messageListItem__icon">메시지</div>
//       <div className="messageListItem__date">{formattedDate}의 편지</div>
//     </div>
//   );
// }

interface MessageListItemProps {
  id: string;
}

export function MessageListItem({ id }: MessageListItemProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/message/${id}`); // ID를 경로에 포함하여 이동
  };

  return (
    <S.Container>
      <div className="messageListItem" onClick={handleClick}>
        <div className="messageListItem__icon">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div className="messageListItem__date">YYYY년 mm월 dd일의 편지</div>
        <div className="messageListItem__time">TT:MM:SS</div>
      </div>
    </S.Container>
  );
}
