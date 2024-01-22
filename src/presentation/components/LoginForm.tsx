import { Button } from "./Button";
import { TextInput } from "./TextInput";

interface LoginFormProps {
  name: string;
  onChangeName: (name: string) => void;
  handleContinueButton: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  return (
    <form
      className="flex flex-col justify-between gap-4 font-light"
      onSubmit={e => e.preventDefault()}
    >
      <TextInput
        label='Enter your name:'
        placeholder='John Doe'
        value={props.name}
        onChange={props.onChangeName}
        autoFocus
      />
      <Button
        title='Continue'
        disabled={props.name.trim().length === 0}
        onClick={props.handleContinueButton}
        type='submit'
      />
    </form>
  )
}