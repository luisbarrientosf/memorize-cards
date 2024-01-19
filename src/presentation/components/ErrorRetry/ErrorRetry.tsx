
import { Button } from "../Button/Button";
import styles from "./ErrorRetry.module.css";

interface ErrorRetryProps {
  errorMessage: string;
  handleRetry: () => void;
}

export const ErrorRetry: React.FC<ErrorRetryProps> = ({ errorMessage, handleRetry }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.error}>
        {errorMessage}
      </p>
      <Button
        title='Retry'
        onClick={handleRetry}
      />
    </div>
  );
}