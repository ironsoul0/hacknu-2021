import { AxiosError } from 'axios';

import { ErrorResponse } from './types/ErrorResponse';

export const parseAxiosError = (value: unknown, err = value as AxiosError<ErrorResponse>): string =>
  err?.response?.data.message || err?.response?.data.error || err?.message;

export const catchAxiosError = (cb: (message: string) => any) => (
  err: AxiosError<ErrorResponse>,
): ReturnType<typeof cb> => cb(parseAxiosError(err));
