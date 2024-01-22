import { Button } from "./Button";
import { Pointer } from "./Pointer";
interface EndGameMessageProps {
  successPoints: number;
  failPoints: number;
  turn: number;
  player: string;
  handleNewGame: () => void;
  handleGoToHome: () => void;
}

export const EndGameMessage: React.FC<EndGameMessageProps> = (props) => {
  return(
    <div className="absolute flex justify-center items-center flex-col gap-y-10 text-white bg-black bg-opacity-80 top-0 w-full min-h-[100vh]">
      <p className="text-center text-2xl">
        Congratulations, <br />
        <span className="text-[#96c09b] text-4xl">{ props.player }</span> !
      </p>
      <div className="flex flex-row gap-x-7">
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
      <div className="flex flex-col justify-center gap-y-5 mt-5">
        <Button
          title="New Game"
          onClick={props.handleNewGame}
          autoFocus
        />
        <Button
          title="Go to Home"
          onClick={props.handleGoToHome}
          secondary
        />
      </div>
    </div>
  )
}