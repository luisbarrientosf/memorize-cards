import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void;
  title: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, title, disabled }) => {
  const buttonStyles = [styles.button];
  if (disabled) {
    buttonStyles.push(styles.disabled);
  }

  return (
    <button
      className={buttonStyles.join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {title} 
    </button>
  )
}