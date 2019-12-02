import React from 'react'
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

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit = (event) => {
    console.log('logging in')
    event.preventDefault()
    // TODO: Form validation, check passwords match
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        // TODO: Fetch user from server
        this.props.history.push(routes.home)
      })
      .catch((error) => {
        // TODO: User error and IonAlertControl or IonToast to show alert
      })
  }

  onChange = (id, event) => {
    this.setState({
      [id]: event.target.value,
    })
  }

  render() {
    return (
      <IonPage className="bl-page">
        <IonContent className="ion-padding-horizontal">
          <p> Login to BucketList</p>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={this.state.email}
              oninput={(e) => this.onChange('email', e)} />
          </IonItem>
          <IonItem className="ion-margin-bottom">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={this.state.password}
              oninput={(e) => this.onChange('password', e)} />
          </IonItem>
          <IonRouterLink href={routes.auth.register}>
            Need an account? Register instead.
          </IonRouterLink>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton onClick={this.onSubmit}>Login</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    )
  }
}

export default unAuthedComponent(Login)
