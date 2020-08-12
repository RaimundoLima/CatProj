import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresherContent, IonRefresher, IonIcon, IonButtons, IonButton, IonToggle, IonLabel, IonRow, IonCol, IonSelectOption, IonSelect } from '@ionic/react';
import { refreshOutline, time, person, personSharp, cameraSharp, filterSharp } from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';

import React, { Component, useState, useEffect } from 'react';
import './style.css';

import TimeLine from '../../components/TimeLine'
import Filters from '../../components/Filters';

const Home: React.FC = () => {

    const [refresh, setRefresh] = useState(Date.now)

    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        console.log('Reload TimeLine');
        setTimeout(() => {
            setRefresh(Date.now)
            event.detail.complete();
        }, 1000);
    }

    const [filters, setFilters] = useState({
        breed:"",
        category:"",
        type:""
    })

    useEffect(() => {
        setRefresh(Date.now)
    },[filters])

    return (
        <IonPage className="has-header" >
            <Filters setter={setFilters}/>
            <IonContent  >
                <IonRefresher className="refresh" snapback-duration="3000ms" pullFactor={1.5} slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent

                        pullingIcon={refreshOutline}
                        refreshingSpinner="crescent"
                    >
                    </IonRefresherContent>
                </IonRefresher>

                <TimeLine key={refresh} filters={filters} perfil={false} />

            </IonContent>
        </IonPage >
    );
};

export default Home;
