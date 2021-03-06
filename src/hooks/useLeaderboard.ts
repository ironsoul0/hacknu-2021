import { useEffect, useState } from 'react';
import aituBridge from '@btsd/aitu-bridge';

import { getLeaderboard, LeaderboardResponse, GameType, ContactsResponse } from '../core';
import { useMe } from './useMe';

export const useLeaderboard = (gameName: GameType) => {
  const me = useMe();
  const [leaderboard, setLeaderboard] = useState<LeaderboardResponse | null>(null);

  const getParsedLeaderboard = async (id: string) => {
    let contacts: ContactsResponse = [];

    try {
      const result = await aituBridge.getContacts();
      if (result.contacts && result.contacts.length > 0) {
        contacts = [...result.contacts];
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const { data: leaderboard } = await getLeaderboard(id, gameName, contacts);
      setLeaderboard(leaderboard);
    } catch (e) {
      setLeaderboard([]);
    }
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
