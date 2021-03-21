export enum GameType {
  reactionTime = 'reactionTime',
  numberMemory = 'numberMemory',
  chimpTest = 'chimpTest',
}

export const gameTypes = [
  { id: GameType.reactionTime, name: 'Реакция', unit: 'мс.' },
  { id: GameType.numberMemory, name: 'Память', unit: 'урв.' },
  { id: GameType.chimpTest, name: 'Тест Шимпанзе', unit: 'урв.' },
];
