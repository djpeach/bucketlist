import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonInput, IonButton } from "@ionic/react";

import { lists, newItems } from "../../state";

import routes, {routeWithParams} from "../../conf/routes"

class Dashboard extends React.Component {
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Welcome Back</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol  size="12" size-sm="6">
                <IonCard>
                  <IonTitle>New Suggestions</IonTitle>
                  <IonList>
                    {
                      newItems.map((item) => {
                        return (
                          <IonItem key={item.message}>
                            <IonLabel>
                              <p>From: {item.from}</p>
                              <h3>{item.message}</h3>
                            </IonLabel>
                          </IonItem>
                        )
                      })
                    }
                  </IonList>
                </IonCard>
              </IonCol>
              <IonCol size="12" size-sm="6">
                <IonCard>
                  <IonTitle>Your Lists</IonTitle>
                  <IonList>
                    {
                      lists.map((list, index) => {
                        return (
                          <IonItem routerLink={routeWithParams(routes.lists.detail, index)} detail key={index} >
                            <IonLabel>
                              <p>{list.name}</p>
                            </IonLabel>
                            <IonLabel slot="end">
                              <p>{list.items.length} items</p>
                            </IonLabel>
                          </IonItem>
                        )
                      })
                    }
                  </IonList>
                </IonCard>
              </IonCol>
              <IonCol size="12" size-sm="6" offset-sm="6">
                <IonCard>
                  <IonItem className="ion-margin-bottom" >
                    <IonLabel>List name: </IonLabel>
                    <IonInput placeholder="A new list" />
                  </IonItem>
                  <IonButton color="success" strong type="button" className="ion-float-right ion-margin-end ion-margin-bottom">
                    + New List
                  </IonButton>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    )
  }
}

export default Dashboard;