import React from 'react';
import {IonPage, IonButton, IonTitle, IonItem, IonList, IonLabel} from "@ionic/react";
import firebase from 'firebase'
import {state} from '../../state'
import {flowRight as compose} from 'lodash'
import {graphql} from 'react-apollo'
import graphqlQueries from "../../graphql";

const ListUsers = ({getAllusers}) => {
  if (getAllusers.loading) {
    return (
      <IonTitle>Loading . . .</IonTitle>
    )
  } else if (getAllusers.error) {
    return (
      <IonTitle>{getAllusers.error.message}</IonTitle>
    )
  } else {
    const {getAllUsers: users} = getAllusers
    return (
      <IonItem>
        <IonList>
          {
            users.map((user) => {
              return (
                <IonItem key={user.id}>
                  <IonLabel>Id: {user.id}</IonLabel>
                  <IonLabel>Name: {user.firstName} {user.lastName}</IonLabel>
                  <IonLabel>Email: {user.email}</IonLabel>
                </IonItem>
              )
            })
          }
        </IonList>
      </IonItem>
    )
  }
}

class More extends React.Component {

  logout = () => {
    firebase.auth().signOut()
    state.user = null
    // TODO: Push to login route
  }

  render() {
    const {getAllUsers} = this.props
    return (
      <IonPage>
        <IonButton onClick={this.logout}>Logout</IonButton>
        <ListUsers getAllusers={getAllUsers}/>
      </IonPage>
    )
  }
}

export default compose(
  graphql(graphqlQueries.getAllUsers, {name: 'getAllUsers'}),
)(More)