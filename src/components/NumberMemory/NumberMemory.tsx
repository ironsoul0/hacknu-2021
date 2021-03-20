import React, { useEffect, useState } from 'react';
import { IonApp, IonContent, IonButton, IonProgressBar, IonText, IonHeader, IonInput } from '@ionic/react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import './NumberMemory.css';

const NumberMemory: React.FC = () => {
  const [gameActive, setGameActive] = useState(1);
  const [level, setLevel] = useState(1);
  const [guess, setGuess] = useState(1);
  const [answer, setAnswer] = useState(1);
  const [counter, setCounter] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');

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

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
      <div className="round-main">
        <div>
          <p className="round-number" style={{ color: 'white' }}>
            {' '}
            {answer}{' '}
          </p>
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
        <IonInput
          style={{ marginTop: 36, backgroundColor: 'white', borderRadius: 8 }}
          value={inputValue}
          onIonChange={handleInputChange}
        />
        <IonButton style={{ marginTop: 36 }} expand="block" shape="round" onClick={sendUserInput}>
          Отправить
        </IonButton>
      </div>
    );
  } else if (gameActive === 3) {
    res = (
      <div className="round-main">
        <p className="round-p"> Число </p>
        <p className="round-p-lg"> {answer} </p>
        <p className="round-p"> Ваш ответ </p>
        <p className="round-p-lg"> {guess} </p>
        <p className="round-level-p">Уровень {level}</p>
        <IonButton expand="block" shape="round" onClick={callNextLevel}>
          Следующий
        </IonButton>
      </div>
    );
  } else {
    res = (
      <div className="round-main">
        <p className="round-p"> Число </p>
        <p className="round-p-lg"> {answer} </p>
        <p className="round-p"> Ваш ответ </p>
        <p
          className="round-p-lg "
          style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'black' }}
        >
          {guess}
        </p>
        <p className="round-level-p">Уровень {level}</p>
        <IonButton expand="block" shape="round" onClick={() => history.push('/')}>
          Вернуться
        </IonButton>
        <IonButton expand="block" shape="round" onClick={() => history.push('/startGame')}>
          Заново
        </IonButton>
      </div>
    );
  }

  return res;
};

export default NumberMemory;
