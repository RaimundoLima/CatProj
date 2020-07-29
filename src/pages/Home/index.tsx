import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresherContent, IonRefresher, IonIcon, IonButtons, IonButton } from '@ionic/react';
import { refreshOutline, time, person, personSharp, cameraSharp, filterSharp } from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';

import React, { Component } from 'react';
import './style.css';

import TimeLine from '../../components/TimeLine'

class Home extends Component {
    TimeLine: React.RefObject<TimeLine>;

    constructor(props:any) {
        super(props);
        this.TimeLine=React.createRef()
    }

   
    render() {
        const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
            console.log('Begin async operation');

            setTimeout(() => {
                console.log(this.TimeLine.current?.reload())
                event.detail.complete();
            }, 1000);
        }
    return (
            <IonPage>

                <IonContent>
                    <IonRefresher snapback-duration="3000ms" pullFactor={1.5} slot="fixed" onIonRefresh={doRefresh}>
                        <IonRefresherContent
                            pullingIcon={refreshOutline}
                            refreshingSpinner="crescent"
                        >
                        </IonRefresherContent>
                    </IonRefresher>

                <TimeLine ref={this.TimeLine} />

                </IonContent>
            </IonPage>
    );
    }
};

export default Home;
