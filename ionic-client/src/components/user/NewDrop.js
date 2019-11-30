import React from 'react'
import { 
  IonPage,
  IonCard,
  IonButton,
  IonSearchbar,
  IonItem,
  IonLabel,
  IonTextarea
} from '@ionic/react'

import authedComponent from '../common/AuthedComponent'

class NewDrop extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      friendListQuery: '',
      showFriendList: false,
    };

    this.handleFriendListInputChange = this.handleFriendListInputChange.bind(this);
  }

  handleFriendListInputChange = (event) => {
    this.setState({
      showFriendList: true,
      friendListQuery: event.target.value
    })
  }

  render() {
    let query = this.state.friendListQuery;
    return (
      <IonPage className="bl-page">
        <IonCard className="bl-card-padding">
          <h1>New Drop</h1>
          <IonSearchbar placeholder={"Search friends"} onIonChange={this.handleFriendListInputChange} value={query} >
          </IonSearchbar>
          
          <IonItem style={{ marginTop: '20px' }}>
            <IonLabel position="floating"></IonLabel>
            <IonTextarea rows={1} cols={20} autoGrow={true} placeholder={"Description"}></IonTextarea>
          </IonItem>
          <IonButton style={{ marginTop: '20px' }}>
          Send Drop
          </IonButton>
        </IonCard>
      </IonPage>
    )
  }
}

export default authedComponent(NewDrop)
