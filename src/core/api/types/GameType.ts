export enum GameType {
  reactionTime = 'reactionTime',
  numberMemory = 'numberMemory',
  chimpTest = 'chimpTest',
}

export const gameTypes = [
  { id: GameType.reactionTime, name: 'Время реакции' },
  { id: GameType.numberMemory, name: 'Числовая память' },
  { id: GameType.chimpTest, name: 'Тест Шимпанзе' },
];
