import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  name: string;
  id: string;
  points?: number;
  percentile?: number;
};
