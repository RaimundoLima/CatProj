import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,

    IonFabButton,
    IonRefresher,
    IonRefresherContent
} from '@ionic/react';
import React, { useState } from 'react';
import { refreshOutline } from 'ionicons/icons';
import TimeLine from '../../components/TimeLine';
import { RefresherEventDetail } from '@ionic/core';

const Perfil: React.FC = () => {

    const filter = {
        breed: "",
        category: "",
        type: ""
    }

    const [refresh, setRefresh] = useState(Date.now)

    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        console.log('Reload TimeLine');
        setTimeout(() => {
            setRefresh(Date.now)
            event.detail.complete();
        }, 1000);
    }
    
    return (
        <IonPage className="has-header" >
            <IonContent >
                <h3>Minhas img(only mobile) </h3>
                <IonRefresher className="refresh" snapback-duration="3000ms" pullFactor={1.5} slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent

                        pullingIcon={refreshOutline}
                        refreshingSpinner="crescent"
                    >
                    </IonRefresherContent>
                </IonRefresher>

                <TimeLine key={refresh} filters={filter} perfil={true} />
            </IonContent>
        </IonPage>
    );
};
export default Perfil;