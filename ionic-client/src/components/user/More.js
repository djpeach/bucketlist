import React from 'react'
import {
  IonPage,
  IonButton,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  IonHeader,
  IonToolbar,
} from '@ionic/react'
import firebase from 'firebase'
import { state } from '../../state'
import { Redirect } from 'react-router-dom'
import { flowRight as compose } from 'lodash'
import { graphql } from 'react-apollo'
import { ReactComponent as BucketListIcon } from '../../bucketlist.svg'
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
  state = {
    redirect: false
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      this.logout()
    }
  }

  logout = () => {
    firebase.auth().signOut()
    state.user = null
    return <Redirect to='/register' />
  }

  render() {
    const { getAllUsers } = this.props
    return (
      <IonPage className="bl-page">
        <IonButton onClick={this.setRedirect}>Logout</IonButton>
        <ListUsers getAllusers={getAllUsers} />
        <div>{this.renderRedirect()}</div>
      </IonPage>
    )
  }
}

export default compose(
  graphql(graphqlQueries.getAllUsers, { name: 'getAllUsers' }),
  authedComponent
)(More)
