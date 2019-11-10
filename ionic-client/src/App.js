import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, addCircleOutline, person } from 'ionicons/icons';

import { Dashboard, List, NewSuggestion, More, Login } from './components';
import routes from './conf/routes'

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

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path={routes.home} component={Dashboard} />
          <Route exact path={routes.lists.detail} component={List} />
          <Route exact path={routes.suggestions.create} render={(props) => {
            return false ? ( <NewSuggestion></NewSuggestion> ) : ( <Redirect to={routes.auth.login} />)
          }} />
          <Route exact path={routes.more} component={More} />
          <Route exact path={routes.auth.login} component={Login} />
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
