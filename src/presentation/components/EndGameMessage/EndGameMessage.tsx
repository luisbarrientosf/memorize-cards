import { Button } from "../Button/Button";
import styles from "./EndGameMessage.module.css";

interface PointerProps {
  points: number;
  title: string;
  color: string;
}

const Pointer: React.FC<PointerProps> = ({ points, title, color }) => {
  return (
    <div className={styles.pointsContainer} style={{ color }}>
      <p className={styles.pointsNumber}>
        {points}
      </p>
      <p className={styles.pointsText}>
        {title}
      </p>
    </div>
  )
}

interface EndGameMessageProps {
  successPoints: number;
  failPoints: number;
  turn: number;
  player: string;
  handleNewGame: () => void;
}

export const EndGameMessage: React.FC<EndGameMessageProps> = (props) => {
  return(
    <div className={styles.container}>
      <p className={styles.title}>
        Congratulations, <span>{ props.player }</span> !
      </p>
      <div className={styles.pointersContainer}>
        <Pointer
          points={props.successPoints}
          title="Success"
          color="#96c09b"
        />
        <Pointer
          points={props.turn}
          title="Turns"
          color="#FFFFFF"
        />
        <Pointer
          points={props.failPoints}
          title="Fail"
          color="#cb6144"
        />
      </div>

      <Button
        title="New Game"
        onClick={props.handleNewGame}
      />
    </div>
  )
}