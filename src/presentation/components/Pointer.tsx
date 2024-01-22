interface PointerProps {
  points: number;
  title: string;
  color: string;
}

export const Pointer: React.FC<PointerProps> = ({ points, title, color }) => {
  return (
    <div className="flex flex-col justify-center self-center w-24" style={{ color }}>
      <p className="text-5xl font-semibold text-center">
        {points}
      </p>
      <p className="text-2xl font-medium text-center">
        {title}
      </p>
    </div>
  )
}