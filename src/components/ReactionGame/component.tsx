import React, { useState } from 'react';

import { GameTemplate } from '../GameTemplate';
import { ReactionIcon } from '../../core';

const icon = <ReactionIcon />;

export const ReactionGame = () => {
  const [activeGame, setActiveGame] = useState(false);

  return (
    <GameTemplate
      name="Эрекция"
      description="Попробуйте себя в этой увлекательной игре и проверьте реакцию"
      activeGame={activeGame}
      icon={icon}
      startGame={() => setActiveGame(true)}
    >
      <p>Hi there</p>
    </GameTemplate>
  );
};
