interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  autoFocus?: boolean;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <>
      <label htmlFor="textInput">{props.label}</label>
      <input
        type='text'
        value={props.value}
        className="bg-[#dadada] text-black py-2 px-5 rounded-3xl text-sm min-w-[200px] border-transparent shadow shadow-black/30"
        placeholder={props.placeholder}
        onChange={e => props.onChange(e.target.value)}
        id='textInput'
        autoFocus={props.autoFocus}
      />
    </>
    
  )
}