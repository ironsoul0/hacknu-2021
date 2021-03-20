import { GameType } from './GameType';

export type ScoreInfo = {
  readonly score: number | null;
  readonly ratio: number | null;
};

export type GetScoresResponse = {
  readonly [key in GameType]: ScoreInfo;
};
