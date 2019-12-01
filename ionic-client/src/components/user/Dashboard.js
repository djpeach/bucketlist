import React from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonModal,
} from "@ionic/react";
import authedComponent from "../common/AuthedComponent";
import NewDropsPreview from './NewDropsPreview'
import ListsPreview from './ListsPreview'
import {useState} from 'react'

function Dashboard() {
  const [acceptingItem, setAcceptingItem] = useState(false)

  return (
    <IonPage className="bl-page">
      <IonContent fullscreen>
        <IonModal isOpen={acceptingItem}>
          <IonButton className="fix-to-bottom" color="danger" onClick={() => setAcceptingItem(false)}>Cancel</IonButton>
        </IonModal>
        <NewDropsPreview setAcceptingItem={setAcceptingItem}/>
        <ListsPreview/>
        <IonButton color="success" strong type="button"
                  className="ion-float-right ion-margin-end ion-margin-bottom bl-new-list-btn">
          + New Bucket
        </IonButton>
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(Dashboard);