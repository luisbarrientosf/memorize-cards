import Image from 'next/image';
import { Card } from '@/domain/entities/Card.entity';
import styles from './MemorizeCard.module.css';

interface MemorizeCardProps {
  onClick: () => void;
  card: Card;
  visible: boolean;
  error: boolean;
}

export const MemorizeCard: React.FC<MemorizeCardProps> = (props) => {
  const containerStyles = [styles.container];

  if (props.error) {
    containerStyles.push(styles.error);
  }
  if (props.card.matched) {
    containerStyles.push(styles.matched);
  }
  if (props.visible) {
    containerStyles.push(styles.visible);
  }

  return (
    <div
      className={containerStyles.join(" ")}
      onClick={props.onClick}
      role='button'
    >
      <div className={styles.inner}>
        <div className={styles.back}>
          ?
        </div>
        
        <Image
          alt='card image'
          className={styles.image}
          width={100}
          height={120}
          src={props.card.url}
        />
      </div>
    </div>
  )
}