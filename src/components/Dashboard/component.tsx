import React from 'react';

import { useMe, useGames } from '../../hooks';
import { GameCard, Spinner } from '../../components';

export const DashboardPage: React.FC = () => {
  const me = useMe();
  const games = useGames(me);

  return (
    <div className="px-4 pt-5">
      {me && games ? (
        <>
          <p className="text-lg text-gray-500">Игрок</p>
          <p className="font-bold text-4xl mb-10">{me.name}</p>
          {games.map((game) => (
            <GameCard key={game.id} {...game} className="mb-6" />
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
