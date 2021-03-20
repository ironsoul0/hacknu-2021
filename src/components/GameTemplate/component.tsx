import React, { cloneElement, FC } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import { CrossIcon } from '../../core';
import { Props } from './props';

export const GameTemplate: FC<Props> = ({
  name,
  description,
  className,
  children,
  icon,
  activeGame,
  setActiveGame,
}: Props) => {
  const history = useHistory();

  const closeGame = () => {
    history.push('/');
  };

  return (
    <div className={clsx(['h-screen flex items-center justify-center bg-blue-500 relative', className])}>
      <div className="absolute top-3 right-3 w-10 text-white z-30" onClick={closeGame}>
        <CrossIcon />
      </div>
      {!activeGame && (
        <>
          <div className="text-center animate-smooth-appear">
            {cloneElement(icon, { className: 'text-white w-32 mx-auto animate-pulse-fast' })}
            <h2 className="font-bold text-4xl text-white fade">{name}</h2>
            <p className="text-2xl text-white mt-5">{description}</p>
            <p className="text-2xl text-white mt-5">Нажмите чтобы продолжить.</p>
          </div>
          <div className="absolute h-full bg-black z-10 w-full bg-opacity-0" onClick={() => setActiveGame(true)} />
        </>
      )}
      {activeGame && children}
    </div>
  );
};
