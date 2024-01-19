import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  type?: "button"|"submit"|"reset"|undefined;
  autoFocus?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, title, disabled, type, autoFocus }) => {
  const buttonStyles = [styles.button];
  if (disabled) {
    buttonStyles.push(styles.disabled);
  }

  return (
    <button
      className={buttonStyles.join(" ")}
      onClick={onClick}
      disabled={disabled}
      type={type}
      autoFocus={autoFocus}
    >
      {title} 
    </button>
  )
}