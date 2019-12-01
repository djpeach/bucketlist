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
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption,
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
      <IonItem>
        {data.getListsByUser.length > 0 ? (
            <>
              <IonLabel>Your Buckets: </IonLabel>
              <IonSelect placeholder="Select a Bucket" okText="Select" cancelText="Cancel">
                {data.getListsByUser.map((list, index) => {
                  return (
                      <IonSelectOption value={list.id} key={list.id}>
                        {list.title}
                      </IonSelectOption>
                  )
                })}
              </IonSelect>
            </>
        ) : (
          <IonLabel>
          No Buckets yet, go back and make one!
          </IonLabel>
        )}
      </IonItem>
    </IonList>
  )
}

function BucketSelectModal({acceptingItem, drop, setAcceptingItem}) {

  return (
    <IonModal isOpen={acceptingItem}>
      <IonContent>
        <h1 className="bl-list-title">Add New Drop to a Bucket</h1>
        <IonCard className="mt-5">
          <IonCardHeader>New Drop</IonCardHeader>
          <IonItem>
            {drop !== {} ? (
              <div>
                <p>From: {drop.from && drop.from.firstName} {drop.from && drop.from.lastName}</p>
                <h5>{drop.message}</h5>
              </div>
            ) : (
              <p>No Drops</p>
            )}
          </IonItem>
        </IonCard>
        <IonCard>
          <IonCardHeader>Select a Bucket</IonCardHeader>
          <ListOfLists/>
        </IonCard>
        <IonButton className="bl-list-back-btn">
          Add to Bucket
        </IonButton>
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