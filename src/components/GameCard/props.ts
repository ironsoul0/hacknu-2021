import { HTMLAttributes, RefAttributes } from 'react';

import { UserGameInfo } from '../../core';

export type Props = HTMLAttributes<HTMLDivElement> & UserGameInfo & RefAttributes<HTMLDivElement>;
