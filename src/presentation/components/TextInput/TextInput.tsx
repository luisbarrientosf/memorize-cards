import styles from './TextInput.module.css'

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <>
      <label htmlFor="textInput">{props.label}</label>
      <input
        type='text'
        value={props.value}
        className={styles.textinput}
        placeholder={props.placeholder}
        onChange={e => props.onChange(e.target.value)}
        id='textInput'
      />
    </>
    
  )
}