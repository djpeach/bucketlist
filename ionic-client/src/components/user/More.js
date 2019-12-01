import React from 'react'
import {
  IonPage,
  IonButton,
} from '@ionic/react'
import firebase from 'firebase'
import routes from '../../conf/routes'
import authedComponent from '../common/AuthedComponent'

class More extends React.Component {
  logout = () => {
    firebase.auth().signOut().then(() => {
      this.props.history.push(routes.auth.login)
    })
  }

  render() {
    return (
      <IonPage className="bl-page">
        <IonButton onClick={this.logout}>Logout</IonButton>
      </IonPage>
    )
  }
}

export default authedComponent(More)
