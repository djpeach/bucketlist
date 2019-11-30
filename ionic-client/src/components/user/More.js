import React from 'react'
import {
  IonPage,
  IonButton,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
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

class More extends React.Component {
  logout = () => {
    firebase.auth().signOut()
    state.user = null
    return this.props.history.push(routes.auth.login)
  }

  render() {
    const { getAllUsers } = this.props
    return (
      <IonPage className="bl-page">
        <IonButton onClick={this.logout}>Logout</IonButton>
        <ListUsers getAllusers={getAllUsers} />
      </IonPage>
    )
  }
}

export default compose(
  graphql(graphqlQueries.getAllUsers, { name: 'getAllUsers' }),
  authedComponent
)(More)
