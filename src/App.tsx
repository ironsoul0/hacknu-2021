import React, { useEffect, useState } from 'react';
import aituBridge from '@btsd/aitu-bridge';
import { IonApp, IonContent, IonButton, IonText, IonHeader } from '@ionic/react';

import './App.css';

/* Core CSS required for Ionic components to work properly */
// import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
// import './theme/variables.css';

const App: React.FC = () => {
  async function getMe() {
    try {
      const data = await aituBridge.getMe();
      console.log('data', data);
      setName(data.name);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (aituBridge.isSupported()) {
      getMe();
    }
  }, []);

  const [name, setName] = useState('<username>');

  return <div className="font-bold text-green-100">Kek</div>;
};

export default App;
