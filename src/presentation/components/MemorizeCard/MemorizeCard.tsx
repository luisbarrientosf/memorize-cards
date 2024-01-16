import Image from 'next/image';
import { Card } from '@/domain/entities/Card.entity';

interface MemorizeCardProps {
  onClick: () => void;
  card: Card;
  matched: boolean;
}

export const MemorizeCard: React.FC<MemorizeCardProps> = (props) => {
  return (
    <div style={{
      borderWidth: 1,
      borderColor: "#00FFFF",
      borderStyle: "solid",
      height: 100,
      width: 100,
      display: "inline-block"
    }}>
    
    <Image
      alt='card image'
      style={{
        opacity: props.matched ? 1 : 0,
      }}
      width={100}
      height={100}
      src={props.card.url}
      onClick={props.onClick}
    />
    </div>
  )
}