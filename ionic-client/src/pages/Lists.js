import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { trash, checkbox } from 'ionicons/icons';
import React from 'react';

const newItems = [
  {
    from: "Cory Schafer",
    message: "Learn python"
  },
  {
    from: "Net Ninja",
    message: "Learn GraphQL"
  }
]

const lists = [
  {
    name: "School Stuff",
    items: [
      {
        from: "Matt Thomas",
        message: "Free movie on campus"
      },
      {
        from: "John Doe",
        message: "Try out CS Club",
        link: "https://theden.iupui.edu/organization/csclub"
      },
      {
        from: "John Hancock",
        message: "Lets study on Friday"
      }
    ]
  },
  {
    name: "This weekend",
    items: [
      {
        from: "Kate Harris",
        message: "Rollerblading"
      },
      {
        from: "John Daley",
        message: "Sugar creek is great for fishing"
      },
      {
        from: "Mark Anthony",
        message: "Shooting range",
        link: "https://shootpointblank.com/shoot-point-blank-greenwood-in/"
      },
    ]
  }
]

const Lists = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>New Suggestions</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {
                newItems.map((item) => {
                  return (
                    <IonItem>
                      <IonLabel>
                        <p>From: {item.from}</p>
                        <h2>{item.message}</h2>
                      </IonLabel>
                      <IonIcon icon={trash} />
                      <IonIcon icon={checkbox} />
                    </IonItem>
                  )
                })
              }
            </IonList>
            <p>
              Click the trash to reject the suggestion or the checkmark to add the suggestion to a list.
            </p>
          </IonCardContent>
        </IonCard>

        <IonList lines="none">
          <IonListHeader>
            <IonLabel>Lists</IonLabel>
          </IonListHeader>
          {
            lists.map((list, index) => {
              return (
                <IonItem routerLink={`/list/${index}`} detail={true}>
                  <IonLabel>
                    {list.name}
                  </IonLabel>
                  {list.items.length} items
                </IonItem>
              )
            })
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Lists;
