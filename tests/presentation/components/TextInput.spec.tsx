import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { TextInput } from "../../../src/presentation/components/TextInput/TextInput"

describe('TextInput', () => {
  it('renders correctly', () => {
    render(
      <TextInput
        value=''
        placeholder='placeholder'
        label='label'
        onChange={() => {}}
      />
    );
    const input = screen.getByLabelText("label");
    expect(input).toBeInTheDocument();
  });

  it('fire onChange function when input value changed', () => {
    const spyFn = jest.fn();
    render(
      <TextInput
        value=''
        placeholder='placeholder'
        onChange={e => spyFn(e)}
        label='label'
      />
    );
    const input = screen.getByLabelText("label");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "TEST"}});
    expect(spyFn).toHaveBeenCalledTimes(1);
    expect(spyFn).toHaveBeenCalledWith("TEST");
  });
});