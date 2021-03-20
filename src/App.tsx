import React from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { DashboardPage, ReactionGame } from './components';
import NumberMemory from './components/NumberMemory/NumberMemory';

const App: React.FC = () => (
  <IonApp className="max-w-md mx-auto">
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <DashboardPage />
        </Route>
        <Route exact path="/game/reaction">
          <ReactionGame />
        </Route>
        <Route exact path="/game/memory">
          <NumberMemory />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
