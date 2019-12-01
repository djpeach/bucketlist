import React from 'react'
import authedComponent from '../common/AuthedComponent'
import {
  IonPage,
  IonTitle,
  IonContent,
  IonCard,
  IonGrid,
  IonCol,
  IonButton,
} from '@ionic/react'
import MdArrowDropleft from 'react-ionicons/lib/MdArrowDropleft'
import routes from '../../conf/routes'

class NewList extends React.Component {
  render() {
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
                <IonTitle className="bl-list-title">Create List</IonTitle>
              </IonCard>
            </IonCol>
          </IonGrid>
        </IonContent>
      </IonPage>
    )
  }
}
export default authedComponent(NewList)
