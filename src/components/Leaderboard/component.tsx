import React, { HTMLAttributes } from 'react';
import { useParams } from 'react-router';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import { useLeaderboard, useMe } from '../../hooks';
import { CrossIcon, GameType } from '../../core';
import { Spinner } from '../../components';

type UserRowProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  name: string;
  lastname: string;
  avatar: string;
  score?: number;
  index?: number;
};

const default_avatar = 'https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3.png';

const UserRow: React.FC<any> = ({ name, lastname, id, score, avatar, className, index }: any) => {
  return (
    <div className={clsx('grid grid-cols-10 gap-2 h-10 mx-2', className)}>
      <div className="col-span-1 flex flex-col justify-center items-start">
        <p className="font-black text-xl">{index + 1}</p>
      </div>
      <div className="col-span-6 flex flex-col justify-center items-start">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-2 flex flex-col justify-center items-center">
            <div
              className="bg-gray-300 rounded-full h-6 w-6"
              style={{
                backgroundImage: 'url(' + (avatar ? avatar : default_avatar) + ')',
                backgroundSize: 'cover',
              }}
            />
          </div>
          <div className="overflow-hidden col-span-10">
            <p className="flex flex-col align-middle truncate font-semibold text-md">{name + ' ' + lastname}</p>
          </div>
        </div>
      </div>
      <div className="col-span-3 flex flex-col justify-center items-center">
        <p className="font-bold text-xl bg-gray-300 rounded-full py-1 px-3">{score?.toFixed(1)}</p>
      </div>
    </div>
  );
};

type RouteParams = {
  type: string;
};

export const LeaderboardPage: React.FC = () => {
  const { type } = useParams<RouteParams>();
  const leaderboard = useLeaderboard(type as GameType);
  const history = useHistory();

  const closeGame = () => {
    history.push('/');
  };

  return (
    <div className="px-4 pt-5 relative">
      {leaderboard ? (
        <>
          <div className="absolute top-5 right-4 w-8 text-black z-30" onClick={closeGame}>
            <CrossIcon />
          </div>
          <p className="font-black text-xl mb-10 mx-2">Результаты контактов</p>
          {leaderboard.map((user, index) => (
            <UserRow key={user.id} {...user} index={index} className="mb-6" />
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
