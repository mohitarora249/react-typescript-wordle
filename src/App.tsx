import React, { useState, KeyboardEvent, useEffect } from "react";
import { NUMBER_OF_ROWS } from "./constants/index";
import useKeyboard from "./hooks/useKeyboard";
import { WORDS } from "./data/index";
import GameRow from "./components/GameRow";

function App() {
  const [words, setWords] = useState(Array(NUMBER_OF_ROWS).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [secretWord, setSecretWord] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSecretWord(
      WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase()
    );
  }, []);

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && currentGuess.length === 5) {
      setGuessCount((s) => ++s);
      setCurrentGuess("");
      if (words.indexOf(secretWord) > -1) {
        setMessage("You Won!");
        return;
      }
    }
    if (guessCount === NUMBER_OF_ROWS) {
      setMessage("You Lost");
      return;
    }
    if (message) return;
    if (/^[a-z]+$/.test(e.key) && currentGuess.length !== 5) {
      const currentWord = `${currentGuess}${e.key}`.toUpperCase();
      const wordsCopy = [...words];
      wordsCopy[guessCount] = currentWord;
      setWords(wordsCopy);
      setCurrentGuess(currentWord);
    }
  };

  useKeyboard(onKeyPress, [words, currentGuess]);

  return (
    <div className="h-screen flex flex-column justify-center items-center">
      <div>
        {words.map((word, idx) => (
          <GameRow
            word={word ?? ""}
            key={idx}
            rowIdx={idx}
            currentRow={guessCount}
            secretWord={secretWord}
            isGameOver={!!message}
          />
        ))}

        <div className={message ? "" : "invisible"}>
          <div className="flex justify-center font-bold text-2xl">
            {message}
          </div>
          <div className="flex justify-center font-bold text-2xl">
            Word was {secretWord}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
