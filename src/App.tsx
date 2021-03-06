import React from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonContent, IonInfiniteScrollContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider as JotaiProvider } from 'jotai';

import { GameType } from './core';
import { DashboardPage, ReactionGame, ChimpGame, LeaderboardPage } from './components';
import NumberMemory from './components/NumberMemory/NumberMemory';

const App: React.FC = () => (
  <JotaiProvider>
    <IonApp className="max-w-md mx-auto">
      <IonReactRouter>
        <IonRouterOutlet>
          <IonContent>
            <Route exact path="/">
              <DashboardPage />
            </Route>
            <Route exact path="/leaderboard/:type">
              <LeaderboardPage />
            </Route>
            <Route exact path={`/game/${GameType.reactionTime}`}>
              <ReactionGame />
            </Route>
            <Route exact path={`/game/${GameType.numberMemory}`}>
              <NumberMemory />
            </Route>
            <Route exact path={`/game/${GameType.chimpTest}`}>
              <ChimpGame />
            </Route>
          </IonContent>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </JotaiProvider>
);

export default App;
