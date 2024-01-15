import Image from 'next/image';
import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void;
  title: string;
  icon?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, title, icon }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      { icon && (
        <Image
          src={icon}
          className={styles.icon}
          alt={`${title} image`}
          /> 
      )}
      {title} 
    </button>
  )
}