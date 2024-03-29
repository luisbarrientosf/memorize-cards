"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MemorizeCard } from '@/presentation/components/MemorizeCard/MemorizeCard';
import { EndGameMessage } from '@/presentation/components/EndGameMessage';
import { Card } from '@/domain/entities/Card.entity';
import { getCards } from '@/infrastructure/actions/getCards';
import { shuffleArray } from '@/infrastructure/utils';
import { Loading } from '@/presentation/components/Loading/Loading';
import { ErrorRetry } from '@/presentation/components/ErrorRetry';

export default function PlayScreen() {
  const router = useRouter();
  const player = useSearchParams()!.get("player") || "";
  const [cards, setCards] = useState<Card[]|null>(null);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [successPoints, setSuccessPoints] = useState<number>(0);
  const [failPoints, setFailPoints] = useState<number>(0);
  const [turn, setTurn] = useState<number>(0);
  const [isEndTurn, setIsEndTurn] = useState<boolean>(false);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (!cards && !error) {
      getCards()
        .then(cards => {
          const shuffledCards = shuffleArray(cards);
          setCards(shuffledCards);
        })
        .catch(() => setError("Error while fetching cards"));
    }
  }, [cards, error]);

  useEffect(() => {
    if (isEndTurn) {
      setTimeout(() => {
        setIsEndTurn(false);
        if (selectedCards.length === 2) {
          if (selectedCards[0].uuid === selectedCards[1].uuid ) {
            setSuccessPoints(prevSuccessPoints => prevSuccessPoints + 1);
          } else {
            setFailPoints(prevFailPoints => prevFailPoints + 1);
          }
        }
        setSelectedCards([]);

        if (cards) {
          if (cards.length === cards.filter(c => c.matched).length) {
            setIsEndGame(true);
            return;
          }
        }
        setTurn(prevTurn => prevTurn + 1);
      }, 1000);
    }
  }, [isEndTurn, selectedCards, cards]);

  useEffect(() => {
    if (selectedCards.length === 2 && !isEndTurn) {
      if (selectedCards[0].uuid === selectedCards[1].uuid ) {
        setCards(prevCards => prevCards!.map(card => {
          if (selectedCards.find(c => c.id === card.id)){
            return { ...card, matched: true };
          } 
          return card;
        }));
      }
      setIsEndTurn(true);
    }
  }, [selectedCards, isEndTurn]);


  const handleCardClick = (selectedCard: Card) => {
    if(selectedCard.matched) return;

    if(!selectedCards.find(c => c.id === selectedCard.id) && selectedCards.length < 2) {
      setSelectedCards(prevSelectedCards => {
        const newSelected = [...selectedCards];
        newSelected.push(selectedCard);
        prevSelectedCards.push(selectedCard);
        return newSelected;
      });
    }
  }

  const isErrorCard = (card: Card) => {
    if (selectedCards.length === 2 && selectedCards.find(c => c.id === card.id)) {
      return selectedCards[0].uuid !== selectedCards[1].uuid
    }
    return false;
  }

  const handleNewGame = () => {
    setCards(null);
    setIsEndGame(false);
    setSuccessPoints(0);
    setFailPoints(0);
    setTurn(0);
  }

  return (
    <main className="flex flex-col items-center overflow-y-hidden">
      
      <p className="flex flex-row justify-center items-center gap-x-7 h-20 py-8 mb-5">
        <span className="w-24 text-center text-lg">
          Success: {successPoints}
        </span>
        <span className="w-24 text-center text-3xl">
          Turn {turn + 1}
        </span>
        <span className="w-24 text-center text-lg">
          Fail: {failPoints}
        </span>
      </p>

      { (!cards && !error) && <Loading /> }

      { error && (
        <ErrorRetry
          errorMessage={error}
          handleRetry={() => setError(null)}
        />
      )}
      
      { cards && (
        <section className="flex justify-center items-center w-full flex-wrap max-w-[600px] py-3">
          { cards.map(card => 
            <MemorizeCard
              key={card.id}
              card={card}
              error={isErrorCard(card)}
              visible={!!selectedCards.find(c => c.id === card.id) || card.matched}
              onClick={() => handleCardClick(card)}
            />
          )}
        </section>
      )}
      
      { isEndGame && (
        <EndGameMessage 
          successPoints={successPoints}
          failPoints={failPoints}
          turn={turn + 1}
          player={player}
          handleNewGame={handleNewGame}
          handleGoToHome={() => router.push("/")}
        />
      )}
    </main>
  )
}
