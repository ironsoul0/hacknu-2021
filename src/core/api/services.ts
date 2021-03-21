import axios, { AxiosPromise } from 'axios';

import {
  CreateUserResponse,
  GameType,
  GetScoresResponse,
  UpdateScoreResponse,
  LeaderboardResponse,
  ContactsResponse,
} from './types';

export const base = 'https://aitu-human-benchmark.herokuapp.com/';

export const api = axios.create({
  baseURL: `${base}`,
});

export const createUser = (userInfo: CreateUserResponse): AxiosPromise<CreateUserResponse> =>
  api.patch(`users/${userInfo.id}/`, userInfo);

export const getScores = (id: string): AxiosPromise<GetScoresResponse> => api.get(`users/${id}/scores/`);

export const updateScore = (id: string, game: GameType, newScore: number): AxiosPromise<UpdateScoreResponse> =>
  api.post(`users/${id}/scores/`, {
    [game]: newScore,
  });

export const getLeaderboard = (
  id: string,
  gameName: GameType,
  contactsData: ContactsResponse,
): AxiosPromise<LeaderboardResponse> =>
  api.post(`users/${id}/leaderboard/`, {
    gameName,
    contacts: contactsData || [],
  });
