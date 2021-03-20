import React, { useEffect, useState } from 'react';
import aituBridge from '@btsd/aitu-bridge';
import { IonApp, IonContent, IonButton, IonText, IonHeader } from '@ionic/react';
import gameIcon from '../../assets/img/num_memory.gif';

import './StartGame.css';
//Запоминание чисел
//По статистике, средний человек может запомнить не более 7 цифр. А вы сможете больше?
//gameIcon

export type Props = {
  title: string;
  description: string;
  image: any;
  startButtonOnClick: any;
};

const StartGame: React.FC<Props> = ({ title, description, image, startButtonOnClick }: Props) => {
  const startStartGameGame = () => {
    console.log('game started');
  };

  return (
    <div className="number-memory-main">
      {/* <Fade left> */}
      <p className="number-memory-p"> {title} </p>
      {/* </Fade> */}
      <p className="number-memory-p-sm">{description}</p>
      <div className="game-icon">
        <img src={image} />
      </div>
      <IonButton expand="block" shape="round" onClick={startButtonOnClick}>
        Старт
      </IonButton>
    </div>
  );
};

export default StartGame;
