import React from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonModal,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonItem,
  IonList,
  IonLabel,
} from "@ionic/react";
import authedComponent from "../common/AuthedComponent";
import NewDropsPreview from './NewDropsPreview'
import ListsPreview from './ListsPreview'
import {useState} from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from '../../graphql'
import firebase from 'firebase'

function ListOfLists() {
  const {loading, error, data} = useQuery(gql.getListsByUser, {variables: {id: firebase.auth().currentUser.uid}})

  if (loading) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            Loading Lists ...
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  console.log(error)

  if (error) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
           Error: {error.message}
          </IonLabel>
        </IonItem>
      </IonList>
    )
  }

  console.log(data)

  return (
    <IonList>
      {data.getListsByUser.length > 0 ? (
        <IonItem>
          <IonLabel>
          Placeholder
          </IonLabel>
        </IonItem>
      ) : (
        <IonItem>
          <IonLabel>
           No Buckets yet, go back and make one!
          </IonLabel>
        </IonItem>
      )}
    </IonList>
  )
}

function BucketSelectModal({acceptingItem, drop, setAcceptingItem}) {

  return (
    <IonModal isOpen={acceptingItem}>
      <IonContent>
        <IonTitle className="push-to-top">Select a list to add this new drop to:</IonTitle>
        <IonCard className="mt-5">
          <IonCardHeader>Item to add:</IonCardHeader>
          <IonItem>
            {drop !== {} ? (
              <div>
                <p>From: {drop.from && drop.from.firstName} {drop.from && drop.from.lastName}</p>
                <h5>{drop.message}</h5>
              </div>
            ) : (
              <p>No Item</p>
            )}
          </IonItem>
        </IonCard>
        <ListOfLists/>
        <IonButton className="fix-to-bottom" color="danger" onClick={() => setAcceptingItem(false)}>Cancel</IonButton>
      </IonContent>
    </IonModal>
  )
}

function Dashboard() {
  const [acceptingItem, setAcceptingItem] = useState(false)
  const [drop, setDrop] = useState({})

  return (
    <IonPage className="bl-page">
      <IonContent fullscreen>
        <BucketSelectModal acceptingItem={acceptingItem} drop={drop} setAcceptingItem={setAcceptingItem}/>
        <NewDropsPreview setAcceptingItem={setAcceptingItem} setDrop={setDrop}/>
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