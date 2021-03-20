import React, { useState } from 'react';

import { GameTemplate } from '../GameTemplate';
import { ReactionIcon } from '../../core';
import clsx from 'clsx';

const icon = <ReactionIcon />;

enum MODES {
  Question,
  Result,
}

type PuzzleState = Record<number, number>;

const CELLS = 25;
const MAX_STRIKES = 3;

export const ChimpGame = () => {
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
    level: 1,
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

  const continueGame = () => {
    setGameState((gameState) => ({
      ...gameState,
      puzzle: generatePuzzle(gameState.numbers),
      mode: MODES.Question,
    }));
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
      {gameState.mode === MODES.Question && (
        <>
          (gameState.strikes === MAX_STRIKES ? (
          <div>
            <h3>Score</h3>
            <p>{gameState.level}</p>
          </div>
          ) : (
          <div>
            <h3>Количество чисел</h3>
            <p>{gameState.level}</p>
            <h4>Штраф</h4>
            <h4>
              {gameState.strikes} из {MAX_STRIKES}
            </h4>
            <button onClick={continueGame}>Продолжить</button>
          </div>
          ))
        </>
      )}
    </GameTemplate>
  );
};
