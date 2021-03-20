import { useEffect, useState } from 'react';

import { GetMeResponse, UserGameInfo, gameTypes, getScores } from '../core';

export const useGames = (me: GetMeResponse | null) => {
  const [games, setGames] = useState<UserGameInfo[] | null>(null);

  useEffect(() => {
    const getParsedScores = async (id: string) => {
      const { data: scores } = await getScores(id);
      setGames(
        gameTypes.map(({ id, name }) => ({
          id,
          name,
          percentile: scores[id].ratio,
          points: scores[id].score,
        })),
      );
    };

    if (me) {
      try {
        getParsedScores(me.id);
      } catch (e) {
        alert(e);
      }
    }
  }, [me]);

  return games;
};
