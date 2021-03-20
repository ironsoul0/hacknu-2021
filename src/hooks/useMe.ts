import { useAtom, atom } from 'jotai';
import { useEffect, useState } from 'react';
import aituBridge from '@btsd/aitu-bridge';

import { GetMeResponse } from '../core';

const meAtom = atom<GetMeResponse | null>(null);

export const useMe = () => {
  const [me, setMe] = useAtom(meAtom);

  useEffect(() => {
    const getMe = async () => {
      const getMeResult = await aituBridge.getMe();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setMe(getMeResult);
    };

    if (!me) {
      getMe();
    }
  }, []);

  return me;
};
