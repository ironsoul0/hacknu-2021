import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router';

import { GameTemplate } from '../GameTemplate';
import { ReactionIcon } from '../../core';

const icon = <ReactionIcon />;

enum MODES {
  Question,
  Result,
}

type PuzzleState = Record<number, number>;

const CELLS = 25;
const MAX_STRIKES = 3;

export const ChimpGame = () => {
  const history = useHistory();
  const [activeGame, setActiveGame] = useState(false);

  const generatePuzzle = (cellsVisible: number): PuzzleState => {
    const cellIndices = new Array(CELLS)
      .fill(0)
      .map((_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, cellsVisible);
    const cellValues = new Array(cellsVisible).fill(0).map((_, i) => i + 1);

    const puzzle = cellIndices.reduce((acc, x, index) => ({ ...acc, [x]: cellValues[index] }), {});

    return puzzle;
  };

  const [gameState, setGameState] = useState({
    mode: MODES.Question,
    strikes: 0,
    numbers: 4,
    puzzle: generatePuzzle(4),
  });

  const [target, setTarget] = useState(1);

  const handleClick = (valueClicked: number) => {
    if (valueClicked !== target) {
      setGameState((gameState) => ({
        ...gameState,
        mode: MODES.Result,
        strikes: gameState.strikes + 1,
      }));
    } else {
      if (valueClicked === gameState.numbers) {
        setGameState((gameState) => ({
          ...gameState,
          mode: MODES.Result,
          numbers: gameState.numbers + 1,
        }));
      } else {
        setTarget((target) => target + 1);
      }
    }
  };

  const restartGame = () => {
    setTarget(1);

    setGameState({
      mode: MODES.Question,
      strikes: 0,
      numbers: 4,
      puzzle: generatePuzzle(4),
    });
  };

  const continueGame = () => {
    setTarget(1);

    setGameState((gameState) => ({
      ...gameState,
      puzzle: generatePuzzle(gameState.numbers),
      mode: MODES.Question,
    }));
  };

  const saveGame = () => {
    history.push('/');
  };

  return (
    <GameTemplate
      name="Шимпанзе"
      description="Умнее ли вы Шимпанзе?"
      icon={icon}
      activeGame={activeGame}
      setActiveGame={setActiveGame}
    >
      {gameState.mode === MODES.Question && (
        <div className="grid grid-cols-5 grid-rows-5 w-full gap-2">
          {new Array(CELLS).fill(0).map((_, i) => {
            const value = gameState.puzzle[i];
            const valueIsShown = value && value >= target;

            return (
              <div
                key={i}
                className={clsx([
                  'flex justify-center items-center h-14 w-auto font-bold border-4 rounded border-gray-300 border-opacity-50 text-white text-xl',
                  !valueIsShown && 'opacity-0',
                  target > 1 && 'bg-white',
                ])}
                onClick={valueIsShown ? () => handleClick(value) : undefined}
              >
                {value}
              </div>
            );
          })}
        </div>
      )}
      {gameState.mode === MODES.Result && (
        <div className="text-center text-white font-bold">
          {gameState.strikes === MAX_STRIKES ? (
            <div>
              <h3 className="text-4xl">Чисел</h3>
              <p className="text-5xl">{gameState.numbers}</p>
              <h4 className="text-3xl mt-4">Сохраните ваш результат</h4>
              <div className="mx-auto">
                <button
                  onClick={saveGame}
                  className="focus:outline-none bg-yellow-300 text-black font-bold px-4 py-3 rounded mt-4"
                >
                  Сохранить
                </button>
                <button
                  onClick={restartGame}
                  className="focus:outline-none bg-gray-200 text-black font-bold px-4 py-3 rounded mt-4 ml-3"
                >
                  Попробовать снова
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-4xl">Чисел</h3>
              <p className="text-5xl">{gameState.numbers}</p>
              <h4 className="font-semibold text-3xl mt-4">Штраф</h4>
              <h4 className="text-3xl">
                {gameState.strikes} из {MAX_STRIKES}
              </h4>
              <button
                onClick={continueGame}
                className="focus:outline-none bg-yellow-300 text-black font-bold px-4 py-3 rounded mt-4"
              >
                Продолжить
              </button>
            </div>
          )}
        </div>
      )}
    </GameTemplate>
  );
};
