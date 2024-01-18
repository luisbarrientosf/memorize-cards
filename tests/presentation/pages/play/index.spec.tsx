import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Play from '@/pages/play';
import fetchMock from "jest-fetch-mock"
import { ModyoContentResponseMother } from '../../../__mocks__/ModyoContentResponse.mock';

jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("Luis")
  }),
}));

fetchMock.enableMocks();

describe('Play Screen', () => {
  const mockImages = ModyoContentResponseMother.default();
  fetchMock.mockResponse(JSON.stringify(mockImages));
  jest.useFakeTimers();

  it('renders correctly', async () => {
    await act(() => render(<Play />));
    expect(screen.getByText('Turn 1')).toBeInTheDocument();
    expect(screen.getByText('Success: 0')).toBeInTheDocument();
    expect(screen.getByText('Fail: 0')).toBeInTheDocument();
    const cards = screen.getAllByRole('button');
    expect(cards.length).toBe(mockImages.entries.length * 2);
  });

  it('does a success turn correctly', async () => {
    await act(() => render(<Play />));

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
    await act(() => render(<Play />));

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
});