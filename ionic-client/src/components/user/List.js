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
  IonCol,
} from "@ionic/react";

import firebase from "firebase";

import {lists} from "../../state";

import routes from "../../conf/routes";
import {Redirect} from "react-router";

const cardTitleStyle = {
  padding: '10px',
};

const cardContentPadding = {
  padding: '10px',
};

class List extends React.Component {
  render() {
    console.log(this.props.match.params)
    let list = lists[this.props.match.params.id];

    if (!firebase.auth().currentUser) {
      return (
        <Redirect exact from={routes.index} to={routes.suggestions.create}/>
      )
    } else {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>BucketList</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid>
              <IonCol size="12" size-sm="6">
                <IonCard>
                  <IonTitle style={cardTitleStyle}>{list.name}</IonTitle>
                  <IonList>
                      { (list.items.length > 0) ?
                        list.items.map((item) => {
                          return (
                            <IonItem key={item.message}>
                              <IonLabel>
                              {item.from ? (<p>From: {item.from}</p>) : null} 
                              {item.link ? (<a href={item.link} target="_"><h3>{item.message}</h3></a>) : <h3>{item.message}</h3>}
                              </IonLabel>
                            </IonItem>
                          );
                        }) :
                        <p style={cardContentPadding}> No items </p>
                      }
                    </IonList>
                </IonCard>
              </IonCol>
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    };
  };
};

export default List;