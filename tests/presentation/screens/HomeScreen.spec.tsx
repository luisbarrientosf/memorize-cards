import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import HomeScreen from '@/presentation/screens/HomeScreen';
import mockRouter from "next-router-mock";

jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  push: jest.fn()
}));

describe('HomeScreen Screen', () => {
  it('renders correctly', async () => {
    await act(() => render(<HomeScreen />));
    const welcomeText = screen.getByText('Memorize');
    expect(welcomeText).toBeInTheDocument();
    const input = screen.getByLabelText("Enter your name:");
    expect(input).toBeInTheDocument();
    const button = screen.getByText("Continue");
    expect(button).toBeInTheDocument();
  });

  it('button is disabled when text input is empty', async () => {
    await act(() => render(<HomeScreen />));
    const input = screen.getByLabelText("Enter your name:")
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "" }});
    const button = screen.getByText("Continue");
    expect(button).toBeDisabled();
  });

  it('button is enabled when text input is not empty', async () => {
    await act(() => render(<HomeScreen />));
    const input = screen.getByLabelText("Enter your name:");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Player" }});
    const button = screen.getByText("Continue");
    expect(button).toBeEnabled();
  });

  it('navigate and save user when button is clicked', async () => {
    await act(() => render(<HomeScreen />));
    expect(mockRouter.pathname).toBe("/");
    expect(localStorage.getItem("userId")).toBe(null);

    const input = screen.getByLabelText("Enter your name:");
    expect(input).toBeInTheDocument();    
    fireEvent.change(input, { target: { value: "Player" }});
    
    const button = screen.getByText("Continue");
    await act(async () => fireEvent.click(button));

    expect(localStorage.getItem("userId")).toBe("Player");
    expect(mockRouter.pathname).toBe("/play");
  });
});