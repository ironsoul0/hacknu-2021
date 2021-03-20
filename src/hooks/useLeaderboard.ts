import { useEffect, useState } from 'react';
import aituBridge from '@btsd/aitu-bridge';

import { getLeaderboard, LeaderboardResponse, GameType } from '../core';
import { useMe } from './useMe';

export const useLeaderboard = (gameName: GameType) => {
  const me = useMe();
  const [leaderboard, setLeaderboard] = useState<LeaderboardResponse | null>(null);

  const getParsedLeaderboard = async (id: string) => {
    const { contacts } = (await aituBridge.getContacts()) || [];
    const { data: leaderboard } = await getLeaderboard(id, gameName, contacts);
    setLeaderboard(leaderboard);
  };

  useEffect(() => {
    if (me) {
      try {
        getParsedLeaderboard(me.id);
      } catch (e) {
        console.log(e);
      }
    }
  }, [me]);

  return leaderboard;
};
