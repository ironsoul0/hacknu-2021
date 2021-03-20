import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  name: string;
  description: string;
  activeGame: boolean;
  icon: React.ReactElement;
  startGame: () => void;
};
