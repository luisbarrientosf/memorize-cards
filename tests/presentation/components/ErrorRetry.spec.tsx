import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { ErrorRetry } from "../../../src/presentation/components/ErrorRetry/ErrorRetry"

describe('ErrorRetry', () => {
  it('renders correctly', () => {
    render(
      <ErrorRetry
        errorMessage='TEST'
        handleRetry={() => {}}
      />
    );
    const errorMessage = screen.getByText('TEST');
    expect(errorMessage).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('fire onClick function when button clicked', () => {
    const spyFn = jest.fn()
    render(
      <ErrorRetry
        errorMessage='TEST'
        handleRetry={spyFn}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(spyFn).toHaveBeenCalledTimes(1);
  });
});