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
    <div className="stagePage__container-stage" onClick={handleClick}>
      <div className="stagePage__container-stage-title">{name}</div>
      <div className="stagePage__container-stage-img">
        <img src={img} alt={name} />
      </div>
    </div>
  );
}
