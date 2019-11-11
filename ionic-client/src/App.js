import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, addCircleOutline, person } from 'ionicons/icons';
import firebase from "firebase";

import { Dashboard, List, NewSuggestion, More, Login, Register } from './components';
import routes from './conf/routes'
import {state} from './state'

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

// TODO: Write wrapper component for auth guards

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path={routes.auth.login} render={props => {
            return !!firebase.auth().currentUser ? <Dashboard {...props} /> : <Login />;
          }} />
          <Route exact path={routes.auth.register} render={props => {
            return !!firebase.auth().currentUser ? <Dashboard {...props} /> : <Register />;
          }} />
          <Route exact path={routes.home} render={props => {
              return !!firebase.auth().currentUser ? <Dashboard {...props} /> : <Login />;
          }} />
          <Route exact path={routes.lists.detail} render={props => {
            return !!firebase.auth().currentUser ? <List {...props} /> : <Login />;
          }} />
          <Route exact path={routes.suggestions.create} render={props => {
            return !!firebase.auth().currentUser ? <NewSuggestion {...props} /> : <Login />;
          }} />
          <Route exact path={routes.more} render={props => {
            return !!firebase.auth().currentUser ? <More {...props} /> : <Login />;
          }} />
          <Redirect exact from={routes.index} to={routes.suggestions.create} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="lists" href={routes.home}>
            <IonIcon icon={list} />
            <IonLabel>Your Lists</IonLabel>
          </IonTabButton>
          <IonTabButton tab="newSuggestion" href={routes.suggestions.create}>
            <IonIcon icon={addCircleOutline} />
            <IonLabel>New Suggestion</IonLabel>
          </IonTabButton>
          <IonTabButton tab="more" href={routes.more}>
            <IonIcon icon={person} />
            <IonLabel>Profile &amp; Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
