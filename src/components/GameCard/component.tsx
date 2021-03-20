import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { PlayIcon, ChartIcon } from '../../core';
import { Props } from './props';

export const GameCard: FC<Props> = ({ name, id, percentile, points, className }: Props) => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx('flex justify-between items-center gap-x-4', className)}>
      <div className="flex-1">
        <p className="font-bold text-md mb-3">{name}</p>
        <Link to={`/game/${id}`} className="text-blue-500 font-medium flex items-center">
          <PlayIcon className="w-5" />
          <p className="ml-1.5">Играть</p>
        </Link>
        <Link to="/" className="text-blue-500 font-medium flex items-center">
          <ChartIcon className="w-5" />
          <p className="ml-1.5">Статистика</p>
        </Link>
      </div>
      <div className="flex-1">
        <p className="font-bold text-4xl">{points?.toFixed(1) || '?'}</p>
        <div className="bg-gray-300 h-8 w-100 relative flex items-center" ref={container}>
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
  );
};
