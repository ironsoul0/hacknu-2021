import React, { HTMLAttributes } from 'react';
import { useParams } from 'react-router';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import { useLeaderboard } from '../../hooks';
import { CrossIcon, GameType, gameTypes } from '../../core';
import { Spinner } from '../../components';

const default_avatar = 'https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3.png';

const UserRow: React.FC<any> = ({ name, lastname, score, avatar, className }: any) => {
  return (
    <div className={clsx(['flex justify-between h-10 mx-2 justify-between', className])}>
      <div className="col-span-6 flex flex-col justify-center items-start">
        <div className="grid grid-cols-12 gap-2 flex items-center">
          <div className="col-span-2 flex flex-col justify-center items-center">
            <div
              className="bg-gray-300 rounded-full h-9 w-9"
              style={{
                backgroundImage: 'url(' + (avatar ? avatar : default_avatar) + ')',
                backgroundSize: 'cover',
              }}
            />
          </div>
          <div className="overflow-hidden col-span-10 ml-2">
            <p className="flex flex-col align-middle truncate font-regular text-lg">{name + ' ' + lastname}</p>
          </div>
        </div>
      </div>
      <p className="font-bold text-xl bg-gray-300 rounded-md py-1 w-20 flex items-center justify-center">
        {score?.toFixed(1)}
      </p>
    </div>
  );
};

type RouteParams = {
  type: GameType;
};

export const LeaderboardPage: React.FC = () => {
  const { type } = useParams<RouteParams>();
  const leaderboard = useLeaderboard(type);
  const history = useHistory();

  const closeGame = () => {
    history.push('/');
  };

  const gameInfo = gameTypes.filter((x) => x.id === type)[0];

  return (
    <div className="px-4 pt-5 relative">
      {leaderboard ? (
        <div>
          <div className="absolute top-5 right-4 w-8 text-black z-30 animate-smooth-appear" onClick={closeGame}>
            <CrossIcon className="text-gray-500" />
          </div>
          <div className="mx-2 animate-smooth-appear">
            <p className="text-lg text-gray-500">Результаты контактов</p>
            <p className="font-bold text-4xl mb-10">{gameInfo.name}</p>
          </div>
          <div className="animate-smooth-appear">
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => <UserRow key={user.id} {...user} index={index} className="mb-4" />)
            ) : (
              <p className="px-2">Контакты отсутствуют</p>
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
