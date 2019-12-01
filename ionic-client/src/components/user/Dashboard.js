import React from 'react';
import {
  IonPage,
  IonTitle,
  IonContent,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import {lists, newItems} from "../../state";
import routes, {routeWithParams} from "../../conf/routes";
import {useQuery} from "@apollo/react-hooks";
import graphqlQueries from '../../graphql';
import firebase from "firebase";

function NewDropsPreview() {
  const { loading, error, data } = useQuery(graphqlQueries.getNewItemsByUser, {
    // variables: {userId: firebase.auth().currentUser.uid }
    variables: {userId: "5de364477b415da2c14e0d9f" }
  });

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`
  return (
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
  )
}

class Dashboard extends React.Component {
  render() {
    return (
      <IonPage className="bl-page">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonTitle className="bl-card-padding">New Drops</IonTitle>
                <NewDropsPreview/>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonPage>
    )
  }
};

export default Dashboard;