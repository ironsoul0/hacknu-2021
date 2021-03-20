import React, { useEffect, useState } from 'react';
import { IonApp, IonContent, IonButton, IonProgressBar, IonText, IonHeader, IonInput } from '@ionic/react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import './NumberMemory.css';
import { GameTemplate } from '../../components';
import { NumberMemoryIcon } from '../../core';

const icon = <NumberMemoryIcon />;

const NumberMemory: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [guess, setGuess] = useState(1);
  const [counter, setCounter] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [gameActive, setGameActive] = useState(1);
  const [answer, setAnswer] = useState(getRandomInt(Math.pow(10, 1), Math.pow(10, 2)));

  const restartGame = () => {
    setCounter(0);
    setLevel(1);
    setGuess(1);
    setAnswer(getRandomInt(Math.pow(10, 1), Math.pow(10, 2)));
    setInputValue('');
    setGameActive(1);
  };

  let res;
  const history = useHistory();

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
    const num = parseInt(event.target.value);
    setGuess(num);
  };

  const sendUserInput = () => {
    setInputValue('');
    if (guess !== answer) {
      // let id = 0;
      // const ans = answer.toString();
      // const gue = guess.toString();

      // for (let i = 0; i < ans.length && i < gue.length; i++) {
      //   if (ans.charAt(i) === gue.charAt(i)) {
      //     id++;
      //   } else {
      //     break;
      //   }
      // }

      // const crossed = gue.substring(id, gue.length).strike();
      // console.log(crossed);
      // // const inCorrectString = ans.substring(0, id) + ;
      // setIncorrectGuess(crossed);
      setGameActive(4);
    } else {
      setGameActive(3);
    }
  };

  const callNextLevel = () => {
    setLevel(level + 1);
    const randNumber = getRandomInt(Math.pow(10, level), Math.pow(10, level + 1));
    setAnswer(randNumber);
    setGameActive(1);
    setCounter(0);
  };

  React.useEffect(() => {
    counter < 1 && setTimeout(() => setCounter(counter + 0.01), 20);

    if (counter >= 1) {
      setGameActive(2);
    }
  }, [counter]);

  if (gameActive === 1) {
    res = (
      <>
        <div>
          <p className="round-number" style={{ color: 'white' }}>
            {' '}
            {answer}{' '}
          </p>
        </div>
        <div className="round-progress">
          <IonProgressBar value={counter} reversed></IonProgressBar>
        </div>
      </>
    );
  } else if (gameActive === 2) {
    res = (
      <>
        <p className="animate-bounce" style={{ fontSize: 64, marginBottom: 36 }}>
          {' '}
          🧐{' '}
        </p>
        <p className="round-p"> Какое было число? </p>
        <IonInput
          style={{ marginTop: 36, backgroundColor: 'white', borderRadius: 8, fontSize: 28 }}
          value={inputValue}
          onIonChange={handleInputChange}
        />
        <IonButton
          color="dark"
          style={{ marginTop: 36, height: 48 }}
          expand="block"
          shape="round"
          onClick={sendUserInput}
        >
          Отправить
        </IonButton>
      </>
    );
  } else if (gameActive === 3) {
    res = (
      <>
        <p className="animate-bounce round-p-lg" style={{ marginBottom: 36 }}>
          {' '}
          🎉 Ураааа 🎉{' '}
        </p>
        <p className="round-p"> Число </p>
        <p className="round-p-lg"> {answer} </p>
        <p className="round-p"> Ваш ответ </p>
        <p className="round-p-lg"> {guess} </p>
        <p className="animate-pulse round-level-p">Уровень {level}</p>
        <IonButton color="dark" style={{ height: 48 }} expand="block" shape="round" onClick={callNextLevel}>
          Следующий
        </IonButton>
      </>
    );
  } else {
    res = (
      <>
        <p className="animate-bounce round-p-lg" style={{ marginBottom: 36 }}>
          {' '}
          👏👏👏{' '}
        </p>
        <p className="round-p"> Число </p>
        <p className="round-p-lg"> {answer} </p>
        <p className="round-p"> Ваш ответ </p>
        <p
          className="round-p-lg "
          style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'black' }}
        >
          {guess}
        </p>
        <p className="animate-pulse round-level-p">Уровень {level}</p>
        <IonButton color="dark" style={{ height: 48 }} expand="block" shape="round" onClick={() => history.push('/')}>
          Вернуться
        </IonButton>
        <IonButton
          color="dark"
          style={{ marginTop: 36, height: 48 }}
          expand="block"
          shape="round"
          onClick={restartGame}
        >
          Заново
        </IonButton>
      </>
    );
  }

  return (
    <GameTemplate name="Вербальная память" description="Узнайте насколько хороша ваша память." icon={icon}>
      <div className="round-main">{res}</div>
    </GameTemplate>
  );
};

export default NumberMemory;
