
import { Button } from "./Button";

interface ErrorRetryProps {
  errorMessage: string;
  handleRetry: () => void;
}

export const ErrorRetry: React.FC<ErrorRetryProps> = ({ errorMessage, handleRetry }) => {
  return (
    <section className="rounded-xl px-16 py-5 flex flex-col justify-center border border-[#cb6144] gap-y-5 mb-1 shadow shadow-black/30">
      <p className="text-[#cb6144] my-5 text-center">
        {errorMessage}
      </p>
      <Button
        title='Retry'
        onClick={handleRetry}
      />
    </section>
  );
}