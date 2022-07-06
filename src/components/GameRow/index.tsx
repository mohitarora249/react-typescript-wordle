import { WORD_LENGTH } from "../../constants/index";

interface GameProps {
  word: string;
  secretWord: string;
  currentRow: number;
  rowIdx: number;
  isGameOver: boolean;
}

const GameRow = ({
  word,
  currentRow,
  secretWord,
  rowIdx,
  isGameOver,
}: GameProps) => {
  const tiles: any = [];
  const isApplyCss = rowIdx < currentRow;
  for (let i = 0; i < WORD_LENGTH; i++) {
    let classes = "bg-gray-300";
    if (isApplyCss) {
      if (word[i] === secretWord[i]) classes = "bg-green-300";
      else if (secretWord.includes(word[i])) classes = "bg-yellow-300";
    }
    tiles.push(
      <div
        key={i}
        className={`h-14 w-14 flex justify-center items-center text-3xl font-bold border-2 m-1 border-black rounded-md ${classes}`}
      >
        {word[i] ?? ""}
      </div>
    );
  }

  return (
    <div className="flex">
      {tiles}
      {rowIdx === currentRow && (
        <div
          className={`${
            isGameOver && "invisible"
          } flex items-center mx-4 font-extrabold text-4xl`}
        >{`<`}</div>
      )}
    </div>
  );
};

export default GameRow;
