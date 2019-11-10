import React from 'react';
import { IonPage } from "@ionic/react";
import { Redirect } from 'react-router-dom';
import routes from "../../conf/routes";

class NewSuggestion extends React.Component {
  render() {
    const authenticated = false
    return authenticated ? (
      <IonPage>
        <h1>New Suggestion Page</h1>
      </IonPage>
    ) : (
      <Redirect to={routes.auth.login} />
    )
  }
}

export default NewSuggestion