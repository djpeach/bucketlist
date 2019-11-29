import React from 'react';
import {IonPage} from "@ionic/react";
import {Redirect} from 'react-router-dom';

import routes from "../../conf/routes";
import {state} from '../../state'
import authedComponent from '../common/AuthedComponent';

class NewSuggestion extends React.Component {
  render() {
    // console.log(!!state.user)
    return (
      <IonPage>
        <h1>New Suggestion Page</h1>
      </IonPage>
    )
  }
}

export default authedComponent(NewSuggestion)