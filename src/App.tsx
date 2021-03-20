import React from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider as JotaiProvider } from 'jotai';

import { DashboardPage, ReactionGame, ChimpGame } from './components';
import NumberMemory from './components/NumberMemory/NumberMemory';

const App: React.FC = () => (
  <JotaiProvider>
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
          <Route exact path="/game/chimp">
            <ChimpGame />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </JotaiProvider>
);

export default App;
