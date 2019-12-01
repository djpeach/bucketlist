import React from 'react'
import authedComponent from '../common/AuthedComponent'
import {
  IonPage,
  IonTitle,
  IonContent,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonCol,
  IonButton,
} from '@ionic/react'
import { lists } from '../../state'
import MdArrowDropleft from 'react-ionicons/lib/MdArrowDropleft'
import routes from '../../conf/routes'
import { useQuery } from '@apollo/react-hooks';
import gql from '../../graphql'
import firebase from 'firebase'

function ListView(props) {
  const {loading, error, data} = useQuery(gql.getListsByQuery, {variables: {userId: firebase.auth().currentUser.uid, query: props.title}})

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
      {console.log((Array.isArray(data.getListsByQuery[0].items) && data.getListsByQuery[0].items.length))}
      {(Array.isArray(data.getListsByQuery[0].items) && data.getListsByQuery[0].items.length) ? (
        data.getListsByQuery[0].items.map((item) => {
          return (
            <IonItem key={item.message}>
              <IonLabel>
                {item.from ? <p>From: {item.from.firstName} {item.from.lastName}</p> : null}
                {item.link ? (
                  <a href={item.link} target="_">
                    <h3>{item.message}</h3>
                  </a>
                ) : (
                  <h3>{item.message}</h3>
                )}
              </IonLabel>
            </IonItem>
          )
        })
      ) : (
        <p className="bl-card-padding"> No items </p>
      )}
    </IonList>
  )
};


function List() {
  const title = window.location.href.split('/lists/')[1]
  return (
    <IonPage className="bl-page">
      <IonContent>
        <IonGrid>
          <IonCol size="12" size-sm="6">
            <IonButton
              color="light"
              type="button"
              routerLink={routes.home}
              className="bl-list-back-btn">
              <MdArrowDropleft /> Back
            </IonButton>
            <IonCard>
              <IonTitle className="bl-list-title">{title}</IonTitle>
              <ListView title={title} />
            </IonCard>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};

export default authedComponent(List)
