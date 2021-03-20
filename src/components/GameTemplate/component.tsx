import React, { cloneElement, FC } from 'react';
import clsx from 'clsx';

import { Props } from './props';

export const GameTemplate: FC<Props> = ({
  name,
  description,
  className,
  children,
  activeGame,
  icon,
  startGame,
}: Props) => {
  return (
    <div className={clsx(['h-screen flex items-center justify-center bg-blue-500 px-4 relative', className])}>
      {!activeGame && (
        <>
          <div className="text-center">
            {cloneElement(icon, { className: 'text-white w-32 mx-auto' })}
            <h2 className="font-bold text-6xl text-white">{name}</h2>
            <p className="text-3xl text-white mt-4">{description}</p>
          </div>
          <div className="absolute h-full bg-black z-10 w-full bg-opacity-0" onClick={startGame}></div>
        </>
      )}
      {activeGame && children}
    </div>
  );
};
