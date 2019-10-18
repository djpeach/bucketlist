import React from 'react';
import { IonHeader, IonToolbar, IonPage, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';



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

const List = ({match}) => {
  let list = lists[match.params.index]
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List: {list.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
            {
              list.items.map((item) => {
                return (
                  <IonItem detail={false}>
                    <IonLabel>
                      <p>From: {item.from}</p>
                      <h2>{item.message}</h2>
                    </IonLabel>
                  </IonItem>
                )
              })
            }
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default List;
