import styles from './TextInput.module.css'

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <input
      type='text'
      value={props.value}
      className={styles.textinput}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
    />
  )
}