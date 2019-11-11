import React from 'react';
import { IonPage, IonButton } from "@ionic/react";
import firebase from 'firebase'
import {state} from '../../state'

class More extends React.Component {

  logout = () => {
    firebase.auth().signOut()
    state.user = null
    // TODO: Push to login route
  }

  render() {
    return (
      <IonPage>
        <IonButton onClick={this.logout}>Logout</IonButton>
      </IonPage>
    )
  }
}

export default More