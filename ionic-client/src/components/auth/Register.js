import React, {useState} from 'react'
import {
  IonPage,
  IonToolbar,
  IonFooter,
  IonRouterLink,
  IonButton,
  IonButtons,
  IonContent,
  IonInput,
  IonLabel,
  IonItem,
} from '@ionic/react'
import firebase from 'firebase'
import routes from '../../conf/routes'
import unAuthedComponent from '../common/UnAuthedComponent'
import {useMutation} from "@apollo/react-hooks";
import gql from "../../graphql"

function Register(props) {
  const [inputs, setInputs] = useState({});
  const [createUser] = useMutation(gql.createUser)

  const onSubmit = (event) => {
    event.preventDefault()
    // TODO: Form validation, check passwords match
    firebase
      .auth()
      .createUserWithEmailAndPassword(inputs.email, inputs.password)
      .then((res) => {
        const {password, passwordConfirmation, ...accountInputs} = inputs
        return createUser({variables: {...accountInputs}})
      }).then((res) => {
      props.history.push(routes.home)
    })
      .catch((error) => {
        // TODO: User error and IonAlertControl to show alert
      })
  }

  const onChange = (id, event) => {
    setInputs(inputs => ({...inputs, [id]: event.target.value}));
  }

  return (
    <IonPage className="bl-page">
      <IonContent>
        <p> Register an account for BucketList</p>
        <form>
          <IonItem>
            <IonLabel position="stacked">First Name</IonLabel>
            <IonInput
              type="text"
              value={inputs['firstName']}
              oninput={(e) => onChange('firstName', e)}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Last Name</IonLabel>
            <IonInput
              type="text"
              value={inputs['lastName']}
              oninput={(e) => onChange('lastName', e)}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={inputs['email']}
              oninput={(e) => onChange('email', e)}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={inputs['password']}
              oninput={(e) => onChange('password', e)}/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password Confirmation</IonLabel>
            <IonInput
              type="password"
              value={inputs['passwordConfirmation']}
              oninput={(e) =>
                onChange('passwordConfirmation', e)
              }/>
          </IonItem>
        </form>
        <IonRouterLink href={routes.auth.login}>
          Have an account? Login instead.
        </IonRouterLink>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton onClick={onSubmit}>Register</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}

export default unAuthedComponent(Register)
