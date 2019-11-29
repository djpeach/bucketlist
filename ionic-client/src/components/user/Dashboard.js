import React from 'react';
import '../../css/index.css';
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

import {lists, newItems} from "../../state";
import routes, {routeWithParams} from "../../conf/routes";

class Dashboard extends React.Component {
  render() {
    return(
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
          <div className="bl-icon-div">
            <BucketListIcon className="bl-svg-icon"/>
          </div>
          <IonTitle className="bl-nav-title">BucketList</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-sm="6">
              {(newItems.length > 0) ? (
                <IonCard>
                <IonTitle className="bl-card-title">New Suggestions</IonTitle>
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
                      <IonTitle className="bl-card-title">Your Lists</IonTitle>
                      <IonButton color="success" strong type="button"
                                className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn">
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
                                <p>
                                  {
                                    (list.items.length > 0) ? 
                                    (list.items.length == 1 ? list.items.length + ' item' : list.items.length + ' items') : 
                                    'No items'
                                  }
                                </p>
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

export default Dashboard;