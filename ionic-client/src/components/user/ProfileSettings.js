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
import { state } from '../../state'
import routes from '../../conf/routes'
import { flowRight as compose } from 'lodash'
import { graphql } from 'react-apollo'
import graphqlQueries from '../../graphql'
import authedComponent from '../common/AuthedComponent'

const ListUsers = ({ getAllusers }) => {
  if (getAllusers.loading) {
    return <IonTitle>Loading . . .</IonTitle>
  } else if (getAllusers.error) {
    return <IonTitle>{getAllusers.error.message}</IonTitle>
  } else {
    const { getAllUsers: users } = getAllusers
    return (
      <IonItem>
        <IonList>
          {users.map((user) => {
            return (
              <IonItem key={user.id}>
                <IonLabel>Id: {user.id}</IonLabel>
                <IonLabel>
                  Name: {user.firstName} {user.lastName}
                </IonLabel>
                <IonLabel>Email: {user.email}</IonLabel>
              </IonItem>
            )
          })}
        </IonList>
      </IonItem>
    )
  }
}

class ProfileSettings extends React.Component {
  logout = () => {
    firebase.auth().signOut()
    state.user = null
    return this.props.history.push(routes.auth.login)
  }

  render() {
    const { getAllUsers } = this.props
    console.log(getAllUsers)
    return (
      <IonPage className="bl-page">
        <IonContent>
          <IonCard className={"bl-card-padding"}>
            <h1> User Information </h1>
            <p>Name: {state.user.firstName} {state.user.lastName}</p>
            <p>Email: {state.user.email}</p>
            <p>UserID: {state.user.uid}</p>
          </IonCard>
          <ListUsers getAllusers={getAllUsers} />
        </IonContent>
        <IonButton onClick={this.logout} style={{ marginBottom: '20px' }}>Logout</IonButton>
      </IonPage>
    )
  }
}

export default compose(
  graphql(graphqlQueries.getAllUsers, { name: 'getAllUsers' }),
  authedComponent
)(ProfileSettings)
