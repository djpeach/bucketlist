import React from 'react';
import {
  IonPage,
  IonTitle,
  IonCard,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import routes, {routeWithParams} from "../../conf/routes";
import authedComponent from "../common/AuthedComponent";
import {useQuery} from "@apollo/react-hooks";
import graphqlQueries from '../../graphql';
import firebase from "firebase";

function NewDropsPreview() {
  const {loading, error, data} = useQuery(graphqlQueries.getNewItemsByUser, {
    variables: {userId: firebase.auth().currentUser.uid}
  });

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`
  return (
    <IonCard>
      <IonTitle className="bl-card-padding">New Drops</IonTitle>
      <IonList>
        {data.getNewItemsByUser.length > 0 ? data.getNewItemsByUser.map((item) => {
          return (
            <IonItem key={item.id}>
              <IonLabel>
                <p>From: {item.from.firstName} {item.from.lastName}</p>
                <h3>{item.message}</h3>
              </IonLabel>
            </IonItem>
          );
        }) : (
          <IonItem>
            <IonLabel>
              <h3>No Items Yet</h3>
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    </IonCard>
  )
}

class Dashboard extends React.Component {
  render() {
    return (
      <IonPage className="bl-page">
        <IonContent fullscreen>
          <NewDropsPreview/>
        </IonContent>
      </IonPage>
    )
  }
};

export default authedComponent(Dashboard);