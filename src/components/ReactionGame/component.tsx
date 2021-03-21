import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import aituBridge from '@btsd/aitu-bridge';

import { GameTemplate } from '../GameTemplate';
import { GameType, AlarmIcon, updateScore } from '../../core';
import { useMe } from '../../hooks';

const MIN_COUNT_DOWN = 2000;
const MAX_COUNT_DOWN = 4000;
const NUM_ROUND = 4;
const icon = <AlarmIcon />;

export const ReactionGame = () => {
  const me = useMe();
  const history = useHistory();
  const [activeGame, setActiveGame] = useState(false);

  const [roundState, setRoundState] = useState(-1);
  const [falseStart, setFalseStart] = React.useState(false);
  const [level, setLevel] = useState(1);
  const [timerStart, setTimerStart] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [sumScore, setSumScore] = useState(0);
  const [timerId, setTimerId] = useState(setTimeout(() => '', 1));

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => setRoundState(0), [activeGame]);

  useEffect(() => {
    if (roundState == 0) {
      setTimerId(
        setTimeout(() => {
          setRoundState(1);
          setTimerStart(Date.now());
        }, getRandomInt(MIN_COUNT_DOWN, MAX_COUNT_DOWN)),
      );
    } else clearTimeout(timerId);
  }, [roundState]);

  const handleClick = () => {
    if (roundState == 0) {
      setFalseStart(true);
      setRoundState(2);
    } else if (roundState == 1) {
      setLastScore(Date.now() - timerStart);
      setSumScore(sumScore + Date.now() - timerStart);
      if (level == NUM_ROUND) {
        setRoundState(3);
      } else {
        setFalseStart(false);
        setRoundState(2);
      }
    } else if (roundState == 2) {
      if (!falseStart) setLevel(level + 1);
      setRoundState(0);
    } else if (roundState == 3) {
    }
  };

  useEffect(() => {
    if (roundState === 3) {
      if (me) updateScore(me.id, GameType.reactionTime, sumScore / NUM_ROUND);
      aituBridge.vibrate([2000, 500, 2000, 500]);
    }
  }, [roundState]);

  const returnToHomePage = () => {
    history.push('/');
  };

  const restartGame = () => {
    setRoundState(0);
    setSumScore(0);
    setLevel(1);
    setLastScore(0);
  };

  let gameBody;
  if (roundState == 0) {
    gameBody = (
      <div className="text-center px-4">
        <h2 className="font-bold text-2xl text-white fade">Приготовьтесь к зелёному экрану...</h2>
      </div>
    );
  } else if (roundState == 1) {
    gameBody = (
      <div className="text-center px-4">
        <h2 className="font-bold text-2xl text-white fade">Нажимайте на экран!</h2>
      </div>
    );
  } else if (roundState == 2) {
    gameBody = (
      <div className="text-center px-4">
        {falseStart && (
          <>
            <h2 className="font-bold text-2xl text-white fade">Фальш старт! Дождитесь появления зеленого экрана.</h2>
            <p className="text-3xl text-white mt-5">Кликните чтобы переиграть раунд.</p>
          </>
        )}
        {!falseStart && (
          <>
            <h2 className="font-bold text-2xl text-white fade">Ваш результат: {lastScore} милисекунд.</h2>
            <p className="text-3xl text-white mt-5">Кликните чтобы перейти к следующему раунду.</p>
          </>
        )}
      </div>
    );
  } else if (roundState == 3) {
    gameBody = (
      <div className="text-center px-4">
        <h2 className="font-bold text-2xl text-white fade">Ваш результат: {lastScore} милисекунд. </h2>
        <h2 className="font-bold text-3xl text-white fade mt-3">
          Ваше среднее время реакции: {sumScore / NUM_ROUND} милисекунд.{' '}
        </h2>
        <div className="mx-auto">
          <button
            onClick={restartGame}
            className="focus:outline-none  bg-yellow-300 text-black font-bold px-4 py-3 rounded mt-4 ml-3"
          >
            Попробовать снова
          </button>
        </div>
        <button
          onClick={returnToHomePage}
          className="focus:outline-none bg-gray-200 text-black font-bold px-4 py-3 rounded mt-4 ml-3"
        >
          Вернуться в меню
        </button>
      </div>
    );
  }

  return (
    <GameTemplate
      name="Тест на реакцию"
      description="Нажимайте на экран как только жёлтый цвет сменится на зелёный."
      icon={icon}
      activeGame={activeGame}
      setActiveGame={setActiveGame}
      className={clsx([!activeGame && 'px-4'])}
    >
      {roundState != 1 && (
        <div className="h-screen w-full flex items-center justify-center bg-yellow-500" onClick={() => handleClick()}>
          {gameBody}
        </div>
      )}
      {roundState == 1 && (
        <div className="h-screen w-full flex items-center justify-center bg-green-500" onClick={() => handleClick()}>
          {gameBody}
        </div>
      )}
    </GameTemplate>
  );
};
