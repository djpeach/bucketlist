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
import routes from "../../conf/routes";
import unAuthedComponent from '../common/UnAuthedComponent';

class Register extends React.Component {

  state = {
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  onSubmit = (event) => {
    event.preventDefault()
    // TODO: Form validation, check passwords match
    console.log(this.state)
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((res) => {
      // TODO: Create user in mongodb
      this.history.push(routes.home)
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
            <IonTitle>Register</IonTitle>
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
            <IonItem>
              <IonLabel position="stacked">Password Confirmation</IonLabel>
              <IonInput type="password" value={this.state.passwordConfirmation}
                        oninput={(e) => this.onChange('passwordConfirmation', e)}></IonInput>
            </IonItem>
          </form>
          <IonRouterLink href={routes.auth.login}>Have an account? Login instead.</IonRouterLink>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton onClick={this.onSubmit}>
                Register
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    )
  }
}

export default unAuthedComponent(Register)