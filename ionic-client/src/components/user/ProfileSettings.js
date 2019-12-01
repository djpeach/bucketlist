import React from 'react'
import {
  IonPage,
  IonButton,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  IonCard,
  IonContent,
} from '@ionic/react'
import firebase from 'firebase'
import routes from '../../conf/routes'
import gql from '../../graphql'
import authedComponent from '../common/AuthedComponent'

function ProfileSettings(props) {
  const logout = () => {
    firebase.auth().signOut().then(() => {
      props.history.push(routes.auth.login)
    })
  }

  return (
    <IonPage className="bl-page">
      <IonContent>
        <IonCard className={"bl-card-padding"}>
          <h1> User Information </h1>
          {/*<p>Name: {state.user.firstName} {state.user.lastName}</p>*/}
          {/*<p>Email: {state.user.email}</p>*/}
          {/*<p>UserID: {state.user.uid}</p>*/}
        </IonCard>
      </IonContent>
      <IonButton onClick={logout} style={{ marginBottom: '20px' }}>Logout</IonButton>
    </IonPage>
  )
}

export default authedComponent(ProfileSettings)
