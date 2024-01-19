import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  name: string;
  onChangeName: (name: string) => void;
  handleContinueButton: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
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