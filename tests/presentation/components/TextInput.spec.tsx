import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { TextInput } from "../../../src/presentation/components/TextInput/TextInput"

describe('TextInput', () => {
  it('renders correctly', () => {
    render(
      <TextInput
        value=''
        placeholder='placeholder-test'
        onChange={() => {}}
      />
    );
    const input = screen.getByPlaceholderText("placeholder-test");
    expect(input).toBeInTheDocument();
  });

  it('fire onChange function when input value changed', () => {
    const spyFn = jest.fn();
    render(
      <TextInput
        value=''
        placeholder='placeholder-test'
        onChange={e => spyFn(e)}
      />
    );
    const input = screen.getByPlaceholderText("placeholder-test");
    console.log(input)
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "TEST"}})
    expect(spyFn).toHaveBeenCalledTimes(1);
    expect(spyFn).toHaveBeenCalledWith("TEST");
  });
});