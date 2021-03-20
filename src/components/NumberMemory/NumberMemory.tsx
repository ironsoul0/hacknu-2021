import React, { useEffect, useState } from 'react';
import { IonApp, IonContent, IonButton, IonProgressBar, IonText, IonHeader, IonInput } from '@ionic/react';

import './NumberMemory.css';

const NumberMemory: React.FC = () => {
  const [gameActive, setGameActive] = useState(1);
  const [level, setLevel] = useState(1);
  const [guess, setGuess] = useState(1);
  const [answer, setAnswer] = useState(1);
  const [counter, setCounter] = React.useState(0);

  let res;
  // let done = 1;
  React.useEffect(() => {
    counter < 1 && setTimeout(() => setCounter(counter + 0.01), 20);

    if (counter >= 1) {
      setGameActive(2);
    }
  }, [counter]);

  if (gameActive === 1) {
    res = (
      <div className="round-main">
        <div>
          <p className="round-number"> 87524231654 </p>
        </div>
        <div className="round-progress">
          <IonProgressBar value={counter} reversed></IonProgressBar>
        </div>
      </div>
    );
  } else if (gameActive === 2) {
    res = (
      <div className="round-main">
        <p className="round-p"> Какое было число? </p>
        <input />
        <IonButton expand="block" shape="round">
          Отправить
        </IonButton>
      </div>
    );
  } else {
    res = (
      <div className="round-main">
        <p className="round-p"> Число </p>
        <p className="round-p-lg"> {answer} </p>
        <p className="round-p"> Ваш ответ </p>
        <p className="round-p-lg"> {guess} </p>
        <p className="round-level-p">Уровень {level}</p>
        <IonButton expand="block" shape="round">
          Следующий
        </IonButton>
      </div>
    );
  }

  return res;
};

export default NumberMemory;
