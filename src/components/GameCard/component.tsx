import React, { FC, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import aituBridge from '@btsd/aitu-bridge';

import { PlayIcon, ChartIcon, ChimpIcon, ShareIcon, NumberMemoryIcon, AlarmIcon, GameType } from '../../core';
import { Props } from './props';

export const GameCard: FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ name, id, percentile, points, unit, className }: Props, ref) => {
    const gameIcons = {
      reactionTime: <AlarmIcon className="w-32 p-3" />,
      numberMemory: <NumberMemoryIcon className="w-32 p-2" />,
      chimpTest: <ChimpIcon className="w-32" />,
    };

    const shareInfo = async () => {
      const text = [
        points ? `Мой рекорд в мини-игре "${name}" это ${points} ${unit}` : `Привет! Нашел очень крутое приложение.`,
        'Мини-приложение Aitu IQ позволяет очень легко и весело измерять способности мозга в увлекательной и соревновательной форме!',
        'Скорее переходи по ссылке и присоединяйся ;)',
        'https://i2.app.link/Q4GDVUuANeb',
      ].join('\n\n');

      await aituBridge.share(text);
    };

    return (
      <div className={clsx('flex flex-col justify-between gap-x-4', className)} ref={ref}>
        <div className="grid grid-cols-12 mb-3">
          <div className="col-span-6 flex justify-center">{gameIcons[id as GameType]}</div>
          <div className="col-span-6 flex flex-col justify-center mx-5">
            <div className="flex flex-col justify-center">
              <p className="font-black text-lg whitespace-nowrap">{name}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <p className="font-bold text-4xl">{points?.toFixed(0) || '?'}</p>
                <p className="self-end text-lg ml-1.5">{points ? unit : ''}</p>
              </div>
              <div className="bg-gray-300 h-8 w-100 relative flex items-center">
                <div className="absolute bg-blue-500 h-8 flex items-center" style={{ width: `${percentile}%` }}>
                  {percentile !== null && percentile >= 50.0 && (
                    <p className="text-white font-bold ml-auto pr-3">{percentile?.toFixed(1)}%</p>
                  )}
                </div>
                {percentile !== null && percentile < 50.0 && (
                  <p className="text-gray-500 font-bold ml-auto pl-3" style={{ marginLeft: `${percentile}%` }}>
                    {percentile?.toFixed(1)}%
                  </p>
                )}
                {percentile === null && <p className="text-gray-500 font-bold ml-2">?</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-6 flex justify-center">
            <div className="container bg-gray-100 rounded-full flex justify-center items-center mx-3 p-3 shadow-sm">
              <Link to={`/game/${id}`} className="text-blue-500 text-xl font-medium flex items-center">
                <PlayIcon className="w-10" />
                <p className="ml-1.5">Играть</p>
              </Link>
            </div>
          </div>
          <div className="col-span-3 flex justify-end">
            <div className="bg-gray-100 rounded-full flex justify-center items-center p-3 mx-2 my-auto shadow-sm">
              <Link to={`/leaderboard/${id}`} className="text-blue-500 text-xl font-medium flex items-center">
                <ChartIcon className="w-8" />
              </Link>
            </div>
          </div>
          <div className="col-span-3 flex justify-begin">
            <div className="bg-gray-100 rounded-full flex justify-center items-center p-3 mx-2 my-auto shadow-sm">
              <div onClick={shareInfo} className="text-blue-500 text-xl font-medium flex items-center">
                <ShareIcon className="w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

GameCard.displayName = 'GameCard';
