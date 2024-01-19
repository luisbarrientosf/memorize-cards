import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { LoginForm } from '@/presentation/components/LoginForm/LoginForm';

describe('LoginForm', () => {
  it('renders correctly', () => {
    render(
      <LoginForm
        name=''
        onChangeName={() => {}}
        handleContinueButton={() => {}}
      />
    );
    const textInput = screen.getByLabelText('Enter your name:');
    expect(textInput).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('fire onChangeName when key is pressed', async () => {
    const spyFn = jest.fn();
    render(
      <LoginForm
        name=''
        onChangeName={e => spyFn(e)}
        handleContinueButton={() => {}}
      />
    );
    const textInput = screen.getByLabelText('Enter your name:');
    fireEvent.change(textInput, { target: { value: "TEST" }});

    const button = screen.getByRole('button'); 
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    expect(spyFn).toHaveBeenCalledTimes(1);
  });

  it('fire handleContinueButton when key is pressed', async () => {
    const spyFn = jest.fn();
    render(
      <LoginForm
        name='TEST'
        onChangeName={() => {}}
        handleContinueButton={spyFn}
      />
    );
    const button = screen.getByRole('button'); 
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    await act(() => fireEvent.click(button));
    expect(spyFn).toHaveBeenCalledTimes(1);
  });
});