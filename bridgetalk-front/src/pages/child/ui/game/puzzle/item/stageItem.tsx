import { useNavigate } from 'react-router-dom';

interface StageItemProps {
  id: string;
  img: string;
  name: string;
}

export function StageItem({ id, img, name }: StageItemProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/puzzle/${id}`);
  };

  return (
    <div className="stageItem" onClick={handleClick}>
      <div className="stageItem__title">{name}</div>
      <div className="stageItem__img">
        <img src={img} alt={name} />
      </div>
    </div>
  );
}
