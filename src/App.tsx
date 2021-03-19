import React, { useEffect, useRef, useState } from 'react';
import aituBridge from '@btsd/aitu-bridge';
import { IonApp, IonSlides, IonSlide, IonContent, IonButton, IonText } from '@ionic/react';

import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

interface ISlideContentProps {
  title: string;
  onClick: () => void;
  description: string;
  buttonTitle: string;
  imgSrc: string;
}

const SlideContent: React.FC<ISlideContentProps> = ({
  onClick,
  title,
  description,
  buttonTitle,
  imgSrc,
}: ISlideContentProps) => {
  return (
    <>
      <img src={imgSrc} />
      <div className="slide-block">
        <IonText color="dark">
          <h2>{title}</h2>
        </IonText>
        <IonText>
          <sub>{description}</sub>
        </IonText>
      </div>
      <div className="slide-button">
        <IonButton expand="full" onClick={onClick}>
          {buttonTitle}
        </IonButton>
      </div>
    </>
  );
};

const App: React.FC = () => {
  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  const slider = useRef<HTMLIonSlidesElement>(null);

  async function getMe() {
    try {
      const data = await aituBridge.getMe();
      setName(data.name);
    } catch (e) {
      // handle error
      console.log(e);
    }
  }

  useEffect(() => {
    if (aituBridge.isSupported()) {
      getMe();
    }
  }, []);

  const [name, setName] = useState('<username>');

  const handleButtonClick = () => {
    slider.current?.slideNext();
  };

  return (
    <IonApp>
      <IonContent>
        <IonSlides pager={true} options={slideOpts} ref={slider}>
          <IonSlide>
            <SlideContent
              title={`Привет, ${name}, Мини-приложения в Aitu`}
              onClick={handleButtonClick}
              description={'Расскажем, что это и как использовать aitu.apps для своего бизнеса'}
              buttonTitle={'Я готов!'}
              imgSrc={'/assets/slide1.png'}
            />
          </IonSlide>
          <IonSlide>
            <SlideContent
              title={'+800.000 пользователей Aitu'}
              onClick={handleButtonClick}
              description={'Могут увидеть ваше мини-приложение и стать его пользователями'}
              buttonTitle={'Интересно'}
              imgSrc={'/assets/slide2.png'}
            />
          </IonSlide>
          <IonSlide>
            <SlideContent
              title={'Всегда под рукой '}
              onClick={handleButtonClick}
              description={
                'Каталог с мини-приложениями находится на центральной вкладке. Пользователи легко его найдут'
              }
              buttonTitle={'Что ещё?'}
              imgSrc={'/assets/slide3.png'}
            />
          </IonSlide>
          <IonSlide>
            <SlideContent
              title={'Баннер с ваши предложением'}
              onClick={handleButtonClick}
              description={
                'Уникальная скидка, спецпредложение или акция. Донесите ценное предложение до всех пользователей Aitu'
              }
              buttonTitle={'Далее'}
              imgSrc={'/assets/slide4.png'}
            />
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonApp>
  );
};

export default App;
