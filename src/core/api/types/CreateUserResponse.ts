import { GetMeResponse } from './GetMeResponse';

export type CreateUserResponse = GetMeResponse & {
  readonly phone: string;
};
