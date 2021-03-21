import React, { useEffect, useRef } from 'react';
import aituBridge from '@btsd/aitu-bridge';

import { useMe, useGames } from '../../hooks';
import { GameCard, Spinner } from '../../components';
import { config } from '../../core';

const default_avatar = 'https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3.png';

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
          <div className="flex flex-col animate-smooth-appear">
            <div className="mx-auto mb-2">
              <p className="text-md text-gray-500">Игрок</p>
            </div>
            <div
              className="bg-gray-300 rounded-full h-20 w-20 mx-auto mb-2"
              style={{
                backgroundImage: 'url(' + (me.avatar ? me.avatar : default_avatar) + ')',
                backgroundSize: 'cover',
              }}
            />
            <div className="mx-auto">
              <p className="font-bold text-3xl mb-10">{me.name + ' ' + me.lastname}</p>
            </div>
          </div>
          <div className="animate-smooth-appear">
            {games.map((game, i) => (
              <GameCard key={game.id} {...game} className="mb-12" ref={(ref) => (cardsRef.current[i] = ref)} />
            ))}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
