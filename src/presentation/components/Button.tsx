interface ButtonProps {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  type?: "button"|"submit"|"reset"|undefined;
  autoFocus?: boolean;
  secondary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, title, disabled, type, autoFocus, secondary }) => {
  const buttonStyles = ["flex flex-row justify-center items-center bg-[#28b69c] text-[#0f0f0f] self-center shadow shadow-black/30 gap-2 py-2 px-5 text-sm min-w-[120px] w-[200px] font-semibold rounded-3xl transition-all duration-300 hover:bg-[#43d6bb] hover:duration-300 hover:text-black"];
  
  
  if (disabled) {
    buttonStyles.push("bg-[#808080] text-[#505050]");
  } else {
    if(secondary) {
      buttonStyles.push("bg-transparent border border-[#28b69c] text-[#28b69c]");
    } else {
      buttonStyles.push("bg-[#28b69c] text-[#0f0f0f]")
    }
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