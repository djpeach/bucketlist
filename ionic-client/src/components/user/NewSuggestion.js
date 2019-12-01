import React from 'react'
import { IonPage } from '@ionic/react'
import authedComponent from '../common/AuthedComponent'

class NewSuggestion extends React.Component {
  render() {
    return (
      <IonPage className="bl-page">
        <h1>New Suggestion Page</h1>
      </IonPage>
    )
  }
}

export default authedComponent(NewSuggestion)
