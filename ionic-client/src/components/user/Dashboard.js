import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
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
import { ReactComponent as BucketListIcon} from '../../bucketlist.svg';
import firebase from "firebase";

import {lists, newItems} from "../../state";

import routes, {routeWithParams} from "../../conf/routes";
import {Redirect} from "react-router";

const cardTitleStyle = {
  padding: '10px',
};

const newListButtonStyle = {
  marginTop: '10px',
};

class Dashboard extends React.Component {
  render() {
    if (!firebase.auth().currentUser) {
      return (
        <Redirect exact from={routes.index} to={routes.suggestions.create}/>
      );
    } else {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar color="primary">
            <div style={{height:'100px',
            width: '100px', float: 'left'}}>
              <BucketListIcon />
            </div>
            <IonTitle style={{marginTop: '40px', fontSize: '40px'}}>BucketList</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-sm="6">
                {(newItems.length > 0) ? (
                  <IonCard>
                  <IonTitle style={cardTitleStyle}>New Suggestions</IonTitle>
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
                        );
                      })
                    }
                  </IonList>
                  </IonCard>
                ) : null }
                </IonCol>

                <IonCol size="12" size-sm="6">
                  <IonCard>
                    <IonGrid>
                      <IonRow>
                        <IonTitle style={cardTitleStyle}>Your Lists</IonTitle>
                        <IonButton color="success" strong type="button"
                                  className="ion-float-right ion-margin-end ion-margin-bottom"
                                  style={newListButtonStyle}>
                          + New List
                        </IonButton>
                      </IonRow>
                      <IonList>
                        {
                          lists.map((list, index) => {
                            return (
                              <IonItem routerLink={routeWithParams(routes.lists.detail, index)} detail key={index}>
                                <IonLabel>
                                  <p>{list.name}</p>
                                </IonLabel>
                                <IonLabel slot="end">
                                  <p>{(list.items.length > 0) ? list.items.length + ' items' : 'No items'}</p>
                                </IonLabel>
                              </IonItem>
                            );
                          })
                        }
                      </IonList>
                    </IonGrid>
                  </IonCard>
                </IonCol>

                <IonCol size="12" size-sm="6" offset-sm="6">
                  
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    };
  };
};

export default Dashboard;