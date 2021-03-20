import { useEffect, useState } from 'react';

import { GetMeResponse, UserGameInfo, gameTypes, getScores } from '../core';

export const useGames = (me: GetMeResponse | null) => {
  const [games, setGames] = useState<UserGameInfo[] | null>(null);

  const getParsedScores = async (id: string) => {
    const { data: scores } = await getScores(id);
    setGames(
      gameTypes.map(({ id, name, unit }) => ({
        id,
        name,
        unit,
        percentile: scores[id].ratio,
        points: scores[id].score,
      })),
    );
  };

  useEffect(() => {
    if (me) {
      try {
        getParsedScores(me.id);
      } catch (e) {
        console.log(e);
      }
    }
  }, [me]);

  return games;
};
