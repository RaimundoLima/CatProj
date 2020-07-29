import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,

    IonFabButton
} from '@ionic/react';
import React from 'react';

const Filter: React.FC = () => {
    return (
        <IonPage >
            <IonContent className="has-header">
                <IonFabButton>Butão</IonFabButton>
            </IonContent>
        </IonPage>
    );
};
export default Filter;