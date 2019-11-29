import React from 'react';
import authedComponent from '../common/AuthedComponent';
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
  IonButton,
} from "@ionic/react";
import { ReactComponent as BucketListIcon} from '../../bucketlist.svg';
import {lists} from "../../state";
import MdArrowDropleft from 'react-ionicons/lib/MdArrowDropleft'
import routes from "../../conf/routes";

class List extends React.Component {
  render() {
    let list = lists[this.props.match.params.id];
    return (
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
            <IonCol size="12" size-sm="6">
            <IonButton color="light" type="button"
                       routerLink={routes.home}
                       className="bl-list-back-btn">
              <MdArrowDropleft /> Back
            </IonButton>
              <IonCard>
                <IonTitle className="bl-list-title">{list.name}</IonTitle>
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
                      <p className="bl-card-padding"> No items </p>
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
export default authedComponent(List);
