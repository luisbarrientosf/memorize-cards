"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MemorizeCard } from '@/presentation/components/MemorizeCard/MemorizeCard';
import { EndGameMessage } from '@/presentation/components/EndGameMessage/EndGameMessage';
import { Card } from '@/domain/entities/Card.entity';
import { getCards } from '@/infrastructure/actions/getCards';
import { shuffleArray } from '@/infrastructure/utils';
import styles from './PlayScreen.module.css';
import { Loading } from '@/presentation/components/Loading/Loading';

export default function PlayScreen() {
  const router = useRouter();
  const player = useSearchParams()!.get("player") || "";
  const [cards, setCards] = useState<Card[]|null>(null);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [endTurn, setEndTurn] = useState<boolean>(false);
  const [turn, setTurn] = useState<number>(0);
  const [successPoints, setSuccessPoints] = useState<number>(0);
  const [failPoints, setFailPoints] = useState<number>(0);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);

  useEffect(() => {
    if (!cards) {
      getCards()
        .then(cards => {
          const shuffledCards = shuffleArray(cards);
          setCards(shuffledCards);
        })
        .catch(() => {
          // Manage error
        });
    }
  }, [cards]);

  useEffect(() => {
    if (endTurn) {
      setTimeout(() => {
        setEndTurn(false);
        if(cards){
          if (cards.length === cards.filter(c => c.matched).length) {
            setIsEndGame(true);
            setSelectedCards([]);
            return;
          }
        }
        setTurn(prevTurn => prevTurn + 1);
        setSelectedCards([]);
      }, 1000);
    }
  }, [endTurn, cards, router]);

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
    <main className={styles.main}>
      
      <p className={styles.infoContainer}>
        <span>
          Success: {successPoints}
        </span>
        <span>
          Turn {turn + 1}
        </span>
        <span>
          Fail: {failPoints}
        </span>
      </p>

      { !cards && <Loading /> }
      
      { cards && (
        <div className={styles.cardsContainer}>
          { cards.map(card => 
            <MemorizeCard
              key={card.id}
              card={card}
              error={isErrorCard(card)}
              visible={!!selectedCards.find(c => c.id === card.id) || card.matched}
              onClick={() => handleCardClick(card)}
            />
          )}
        </div>
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
