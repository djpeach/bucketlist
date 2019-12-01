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
import Select from 'react-select';
import authedComponent from '../common/AuthedComponent'
import {state as userState} from "../../state";

userState.user.friends.map((obj) => {
  obj.value = obj.email
  obj.label = `${obj.firstName} ${obj.lastName}`
})

const friendSearchStyles = {
  menu: (provided, state) => ({
    ...provided,
    background: 'white',
    zIndex: '100 !important',
  }),
  option: (provided, state) => ({
    ...provided,
  }),
}

class NewDrop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      friendObj: null,
      message: ''
    }
  }

  handleFriendSearchChange = friendObj => {
    this.setState({
      friendObj,
    })
  }

  handleDescriptionChange = (event) => {
    var description = event.target.value
    // Handle newlines in the description textarea (thinking either <br /> or \n)
    description = description.replace(/\r?\n/g, ' <br /> ')
    this.setState({
      message: description
    })
  }

  render() {
    const { friendObj } = this.state;
    return (
      <IonPage className="bl-page">
        <IonCard className="bl-card-padding">
          <h1 style={{ paddingBottom: '20px' }}>New Drop</h1>

          <Select
            value={friendObj}
            placeholder='Search Friends'
            styles={friendSearchStyles}
            onChange={this.handleFriendSearchChange}
            noOptionsMessage={() => 'Friend not found'}
            isClearable
            isSearchable
            name="friends"
            // TODO: set this up to not use mock state (options are label, value)
            options={userState.user.friends}
          />


          <IonItem style={{ marginTop: '20px' }}>
            <IonLabel position="floating"></IonLabel>
            <IonTextarea rows={1} cols={20} autoGrow={true} placeholder={"Description"} onIonChange={this.handleDescriptionChange}></IonTextarea>
          </IonItem>
          <IonButton style={{ marginTop: '20px' }} onClick={() => {console.log(this.state)}}>
            Send Drop
          </IonButton>
        </IonCard>
      </IonPage>
    )
  }
}

export default authedComponent(NewDrop)
