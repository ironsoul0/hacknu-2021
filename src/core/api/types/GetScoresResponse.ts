export type ScoreInfo = {
  readonly score: number | null;
  readonly ratio: number | null;
};

export type GetScoresResponse = {
  readonly numberMemory: ScoreInfo;
  readonly reactionTime: ScoreInfo;
  readonly chimpTime: ScoreInfo;
};
