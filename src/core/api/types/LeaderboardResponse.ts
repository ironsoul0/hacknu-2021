import { CreateUserResponse } from './CreateUserResponse';

export type LeaderboardResponse = (CreateUserResponse & { readonly score: number })[];
