import React from 'react';
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonRouterLink,
  IonButton,
  IonButtons,
  IonContent,
  IonInput,
  IonLabel,
  IonItem
} from "@ionic/react";
import firebase from 'firebase'
import {state} from '../../state'
import routes from '../../conf/routes'

class Login extends React.Component {

  state = {
    email: '',
    password: ''
  }

  onSubmit = (event) => {
    event.preventDefault()
    // TODO: Form validation, check passwords match
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((res) => {
      // TODO: Fetch user from server
      firebase.auth().currentUser.getIdToken(true).then((token) => {
        localStorage.setItem('authtoken', token)
      })
      // TODO: Push to dashboard route
    }).catch((error) => {
      // TODO: User error and IonAlertControl to show alert
    })
  }

  onChange = (id, event) => {
    this.setState({
      [id]: event.target.value
    })
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <form>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput type="email" value={this.state.email} oninput={(e) => this.onChange('email', e)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput type="password" value={this.state.password}
                        oninput={(e) => this.onChange('password', e)}></IonInput>
            </IonItem>
          </form>
          <IonRouterLink href={routes.auth.register}>Need an account? Register instead.</IonRouterLink>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton onClick={this.onSubmit}>
                Login
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    )
  }
}

export default Login