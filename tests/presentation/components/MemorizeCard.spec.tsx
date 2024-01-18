import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemorizeCard } from "../../../src/presentation/components/MemorizeCard/MemorizeCard"
import { Card } from '@/domain/entities/Card.entity';

describe('MemorizeCard', () => {
  it('renders correctly', () => {
    render(
      <MemorizeCard
        card={new Card("id", "uuid", "https://placehold.co/200x200", false)}
        visible={false}
        error={false}
        onClick={() => {}}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('fire onClick function when MemorizeCard is clicked', () => {
    const spyFn = jest.fn()
    render(
      <MemorizeCard
        card={new Card("id", "uuid", "https://placehold.co/200x200", false)}
        visible={false}
        error={false}
        onClick={spyFn}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(spyFn).toHaveBeenCalledTimes(1);
  });
});