"use client";
import { useEffect, useState } from 'react';
import { getCards } from '@/infrastructure/actions/getCards';
import { MemorizeCard } from '@/presentation/components/MemorizeCard/MemorizeCard';
import { shuffleArray } from '@/infrastructure/utils';

interface InGameCard {
  id: string;
  uuid: string;
  url: string;
  matched: boolean;
}

export default function Play() {
  const [cards, setCards] = useState<InGameCard[]|null>(null);
  const [selectedCards, setSelectedCards] = useState<InGameCard[]>([]);
  const [endTurn, setEndTurn] = useState<boolean>(false);
  const [turn, setTurn] = useState<number>(0);
  const [successPoints, setSuccessPoints] = useState<number>(0);
  const [failPoints, setFailPoints] = useState<number>(0);

  useEffect(() => {
    if (!cards) {
      getCards()
        .then(cards => {
          const shuffledCards = shuffleArray(cards);
          setCards(shuffledCards);
        })
        .catch(err => console.log({ err }));
    }
  }, [cards]);

  useEffect(() => {
    if (endTurn) {
      setTimeout(() => {
        setEndTurn(false);
        setTurn(prevTurn => prevTurn + 1);
        setSelectedCards([]);
      }, 1000);
    }
  }, [endTurn]);

  useEffect(() => {
    if (selectedCards.length === 2 && !endTurn) {
      if (selectedCards[0].uuid === selectedCards[1].uuid ) {
        setCards(prevCards => prevCards!.map(card => {
          if (selectedCards.find(c => c.id === card.id)){
            return { ...card, matched: true };
          } 
          return card;
        }));
      
        setSuccessPoints(prevSuccessPoints => prevSuccessPoints + 1);
      } else {
        setFailPoints(prevFailPoints => prevFailPoints + 1);
      }
      
      setEndTurn(true);
    }
  }, [selectedCards, successPoints, failPoints, turn, endTurn]);


  const handleCardClick = (selectedCard: InGameCard) => {
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

  return (
    <>
      <div>
        Success: {successPoints}
      </div>
      <div>
        Fail: {failPoints}
      </div>
      <div>
        Turn: {turn + 1}
      </div>
      { cards && cards.map(card => 
        <MemorizeCard
          key={card.id}
          card={card}
          matched={!!selectedCards.find(c => c.id === card.id) || card.matched}
          onClick={() => handleCardClick(card)}
        />
      )}
    </>
  )
}
