import React, { useEffect, useRef } from 'react';

import { useMe, useGames } from '../../hooks';
import { GameCard, Spinner } from '../../components';
import { config } from '../../core';

export const DashboardPage: React.FC = () => {
  const me = useMe();
  const games = useGames(me);

  const cardsRef = useRef<HTMLDivElement[] | null[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((cardRef: HTMLDivElement | null, i: number) => {
      if (cardRef) config.sr.reveal(cardRef, config.srConfig(i * 10));
    });
  }, [games]);

  return (
    <div className="px-4 pt-5">
      {me && games ? (
        <>
          <div className="animate-smooth-appear">
            <p className="text-lg text-gray-500">Игрок</p>
            <p className="font-bold text-4xl mb-10">{me.name}</p>
          </div>
          <div className="animate-smooth-appear">
            {games.map((game, i) => (
              <GameCard key={game.id} {...game} className="mb-6" ref={(ref) => (cardsRef.current[i] = ref)} />
            ))}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
