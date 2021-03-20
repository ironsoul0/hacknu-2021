import React, { FC } from 'react';
import { AiOutlineLoading as LoadingSpinner } from 'react-icons/ai';
import clsx from 'clsx';

import { Props } from './props';

export const Spinner: FC<Props> = ({ className }: Props) => {
  return (
    <div className={clsx(['text-center', className])}>
      <LoadingSpinner className="mt-5 animate-spin text-3xl mx-auto" />
    </div>
  );
};

export default Spinner;
