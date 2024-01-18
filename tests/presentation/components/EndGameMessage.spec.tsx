import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { EndGameMessage } from "../../../src/presentation/components/EndGameMessage/EndGameMessage"

describe('EndGameMessage', () => {
  it('renders correctly', () => {
    render(
      <EndGameMessage
        player='test'
        successPoints={10}
        failPoints={5}
        turn={15}
        handleNewGame={() => {}}
      />
    );

    const successPoints = screen.getByText('10');
    expect(successPoints).toBeInTheDocument();
    expect(successPoints.parentNode?.lastElementChild?.innerHTML).toBe("Success");
    const failPoints = screen.getByText('5');
    expect(failPoints).toBeInTheDocument();
    expect(failPoints.parentNode?.lastElementChild?.innerHTML).toBe("Fail");
    const turn = screen.getByText('15');
    expect(turn).toBeInTheDocument();
    expect(turn.parentNode?.lastElementChild?.innerHTML).toBe("Turns");
  });

  it('fire handleNewGame function when button clicked', () => {
    const spyFn = jest.fn()
    render(
      <EndGameMessage
        player='test'
        successPoints={10}
        failPoints={5}
        turn={15}
        handleNewGame={spyFn}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(spyFn).toHaveBeenCalledTimes(1);
  });
});