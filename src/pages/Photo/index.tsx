import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,

    IonFabButton,
    IonButton,
    IonText
} from '@ionic/react';
import React from 'react';

import "./style.css"

const Photo: React.FC = () => {
    return (
        <IonPage className="has-header">

            <IonContent >

                <IonText >
                    <h3 className="paddingText">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                    </h3>
                </IonText>
                <IonButton className="marginButton" color="primary" expand="block" size="large" fill="solid" shape="round">
                    <IonTitle>TAKE A PHOTO</IonTitle>
                </IonButton>

                <IonButton className="marginButton" color="primary" expand="block" size="large" fill="solid" shape="round">
                    <IonTitle>Galeeria</IonTitle>
                </IonButton>
            </IonContent>
        </IonPage>
    );
};
export default Photo;