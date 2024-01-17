import { Button } from "../Button/Button";

interface EndGameMessageProps {
  successPoints: number;
  failPoints: number;
  turn: number;
  handleNewGame: () => void;
}

export const EndGameMessage: React.FC<EndGameMessageProps> = (props) => {
  return(
    <div style={{ 
      backgroundColor: "rgba(0,0,0,0.7)", 
      position: "absolute",
      top: 0,
      width: "100%",
      minHeight: "100vh",
      color: "white"
    }}>
      <div>
        YOU WIN
      </div>
      <div>
        Success: {props.successPoints}
      </div>
      <div>
        Fail: {props.failPoints}
      </div>
      <div>
        Turn: {props.turn + 1}
      </div>
      <Button
        title="New Game"
        onClick={props.handleNewGame}
      />
    </div>
  )
}