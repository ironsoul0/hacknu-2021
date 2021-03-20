import React from 'react';

import { useMe } from '../../hooks';
import { GameCard, GameCardProps, Spinner } from '../../components';

const mockGames: GameCardProps[] = [
  {
    name: 'Вербальная память',
    id: 'reaction',
    points: 115.2,
    percentile: 25.7,
  },
  {
    name: 'Последовательная память',
    id: 'chimp',
    points: 55.2,
    percentile: 67.7,
  },
  {
    name: 'Вербальная память',
    id: 'memory',
    points: 115.2,
    percentile: 25.7,
  },
  {
    name: 'Последовательная память',
    id: 'sequence',
    points: 55.2,
    percentile: 67.7,
  },
];

export const DashboardPage: React.FC = () => {
  const me = useMe();

  return (
    <div className="px-4 pt-5">
      <p className="text-lg text-gray-500">Игрок</p>
      <p className="font-bold text-4xl mb-10">Краучиха</p>
      {mockGames.map((game) => (
        <GameCard key={game.id} {...game} className="mb-6" />
      ))}
    </div>
  );
};
