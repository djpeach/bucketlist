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
import firebase from 'firebase';
import { state } from '../../state';
import routes from "../../conf/routes";
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

const Register = () => {

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async values => {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
      // TODO: create user in mongodb (issue created)
      // TODO: redirect to dashboard

    }
  });

  const state = {
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  const onSubmit = (event) => {
    event.preventDefault()
    // TODO: Form validation, check passwords match
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((res) => {
      // TODO: Create user in mongodb
      state.user = {
        uid: res.user.uid
      }
      // TODO: Push to dashboard route
    }).catch((error) => {
      // TODO: User error and IonAlertControl to show alert
    })
  }

  const onChange = (id, event) => {
    this.setState({
      [id]: event.target.value
    })
  }

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
            <IonInput type="password" value={this.state.password} oninput={(e) => this.onChange('password', e)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password Confirmation</IonLabel>
            <IonInput type="password" value={this.state.passwordConfirmation} oninput={(e) => this.onChange('passwordConfirmation', e)}></IonInput>
          </IonItem>
        </form>
        <IonRouterLink href={routes.auth.login}>Back to login</IonRouterLink>
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
  );
}

export default Register