import React from 'react';
import {IonPage} from "@ionic/react";

import {lists} from '../../state';
import authedComponent from '../common/AuthedComponent';

class List extends React.Component {
  render() {
    console.log(this.props.match.params)
    let list = lists[this.props.match.params.id];

    return (
      <IonPage>
        <p>{list.name}</p>
      </IonPage>
    )
  }
}

export default authedComponent(List);