import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from "../../../src/presentation/components/Button"

describe('Button', () => {
  it('renders correctly', () => {
    render(
      <Button
        title='test'
        onClick={() => {}}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('fire onClick function when button clicked', () => {
    const spyFn = jest.fn()
    render(
      <Button
        title='test'
        onClick={spyFn}
      />
    );
    const button = screen.getByText('test');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(spyFn).toHaveBeenCalledTimes(1);
  });
});