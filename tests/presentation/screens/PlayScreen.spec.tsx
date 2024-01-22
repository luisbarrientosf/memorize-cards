import '@testing-library/jest-dom'
import fetchMock from "jest-fetch-mock";
import { act, fireEvent, render, screen } from '@testing-library/react';
import PlayScreen from '@/presentation/screens/PlayScreen';
import { ModyoContentResponseMother } from '../../__mocks__/ModyoContentResponse.mock';

const PLAYER_NAME = "Luis Barrientos Fajardo";

jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue(PLAYER_NAME)
  }),
}));

fetchMock.enableMocks();

describe('PlayScreen', () => {
  const mockImages = ModyoContentResponseMother.default();
  fetchMock.mockResponse(JSON.stringify(mockImages));
  jest.useFakeTimers();

  it('renders correctly', async () => {
    await act(() => render(<PlayScreen />));
    expect(screen.getByText('Turn 1')).toBeInTheDocument();
    expect(screen.getByText('Success: 0')).toBeInTheDocument();
    expect(screen.getByText('Fail: 0')).toBeInTheDocument();
    const cards = screen.getAllByRole('button');
    expect(cards.length).toBe(mockImages.entries.length * 2);
  });

  it('does a success turn correctly', async () => {
    await act(() => render(<PlayScreen />));

    const choiceOne = screen.getByAltText(`card ${mockImages.entries[0].fields.image.uuid}`);
    const choiceTwo = screen.getByAltText(`card ${mockImages.entries[0].fields.image.uuid}_2`);
    expect(choiceOne).toBeInTheDocument();
    expect(choiceTwo).toBeInTheDocument();

    await act(() => fireEvent.click(choiceOne));
    expect(choiceOne.parentElement?.parentElement).toHaveClass("visible");

    await act(() => fireEvent.click(choiceTwo));
    expect(choiceTwo.parentElement?.parentElement).toHaveClass("visible");

    expect(choiceOne.parentElement?.parentElement).toHaveClass("matched");
    expect(choiceTwo.parentElement?.parentElement).toHaveClass("matched");

    await act(async () => jest.advanceTimersByTime(2000));
  
    expect(await screen.findByText('Turn 2')).toBeInTheDocument();
    expect(await screen.findByText('Success: 1')).toBeInTheDocument();
    expect(await screen.findByText('Fail: 0')).toBeInTheDocument();
  });

  it('does a error turn correctly', async () => {
    await act(() => render(<PlayScreen />));

    const choiceOne = screen.getByAltText(`card ${mockImages.entries[0].fields.image.uuid}`);
    const choiceTwo = screen.getByAltText(`card ${mockImages.entries[1].fields.image.uuid}`);
    expect(choiceOne).toBeInTheDocument();
    expect(choiceTwo).toBeInTheDocument();

    await act(() => fireEvent.click(choiceOne));
    expect(choiceOne.parentElement?.parentElement).toHaveClass("visible");

    await act(() => fireEvent.click(choiceTwo));
    expect(choiceTwo.parentElement?.parentElement).toHaveClass("visible");

    expect(choiceOne.parentElement?.parentElement).toHaveClass("error");
    expect(choiceTwo.parentElement?.parentElement).toHaveClass("error");

    await act(async () => jest.advanceTimersByTime(2000));
  
    expect(await screen.findByText('Turn 2')).toBeInTheDocument();
    expect(await screen.findByText('Success: 0')).toBeInTheDocument();
    expect(await screen.findByText('Fail: 1')).toBeInTheDocument();
  });

  it('shows end game message', async () => {
    const mockImages = ModyoContentResponseMother.twoImages();
    fetchMock.mockResponse(JSON.stringify(mockImages));
    await act(() => render(<PlayScreen />));

    const choiceOne = screen.getByAltText(`card ${mockImages.entries[0].fields.image.uuid}`);
    const choiceTwo = screen.getByAltText(`card ${mockImages.entries[0].fields.image.uuid}_2`);
    await act(() => fireEvent.click(choiceOne));
    await act(() => fireEvent.click(choiceTwo));
    await act(async () => jest.advanceTimersByTime(2000));

    const choiceThree = screen.getByAltText(`card ${mockImages.entries[1].fields.image.uuid}`);
    const choiceFour = screen.getByAltText(`card ${mockImages.entries[1].fields.image.uuid}_2`);
    await act(() => fireEvent.click(choiceThree));
    await act(() => fireEvent.click(choiceFour));
    await act(async () => jest.advanceTimersByTime(2000));


    expect(await screen.findByText(`Turn ${mockImages.entries.length}`)).toBeInTheDocument();
    expect(await screen.findByText(`Success: ${mockImages.entries.length}`)).toBeInTheDocument();
    expect(await screen.findByText('Fail: 0')).toBeInTheDocument();

    const playerName = screen.getByText(PLAYER_NAME);
    expect(playerName).toBeInTheDocument();
    const newGameButton = screen.getByRole("button", { name: "New Game" });
    expect(newGameButton).toBeInTheDocument();
    await act(() => fireEvent.click(newGameButton));

    expect(await screen.findByText("Turn 1")).toBeInTheDocument();
    expect(await screen.findByText("Success: 0")).toBeInTheDocument();
    expect(await screen.findByText('Fail: 0')).toBeInTheDocument();
    expect(playerName).not.toBeInTheDocument();
  });
});