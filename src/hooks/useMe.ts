import { useAtom, atom } from 'jotai';
import { useEffect, useState } from 'react';
import aituBridge from '@btsd/aitu-bridge';

import { createUser, CreateUserResponse, GetMeResponse } from '../core';

const meAtom = atom<CreateUserResponse | null>(null);

export const useMe = () => {
  const [me, setMe] = useAtom(meAtom);

  useEffect(() => {
    const getMe = async () => {
      try {
        const getMeResult = (await aituBridge.getMe()) as GetMeResponse;
        const { phone } = await aituBridge.getPhone();
        const { data: userInfo } = await createUser({ ...getMeResult, phone });
        setMe(userInfo);
      } catch (e) {
        alert(e);
      }
    };

    if (!me) {
      getMe();
    }
  }, []);

  return me;
};
