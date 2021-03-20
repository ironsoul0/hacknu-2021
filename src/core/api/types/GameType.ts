export enum GameType {
  reactionTime = 'reactionTime',
  numberMemory = 'numberMemory',
  chimpTest = 'chimpTest',
}

export const gameTypes = [
  { id: GameType.reactionTime, name: 'Время реакции', unit: 'мс.' },
  { id: GameType.numberMemory, name: 'Числовая память', unit: 'урв.' },
  { id: GameType.chimpTest, name: 'Тест Шимпанзе', unit: 'урв.' },
];
