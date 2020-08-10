import React from 'react';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonFab, IonFabButton, IonPage, IonContent, IonTabs, IonTabBar, IonTabButton, IonLabel, IonGrid, IonRow, IonCol, IonNav, IonRouterLink, IonImg } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

import Perfil from './pages/Perfil';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './global.css';
import { filterSharp, cameraSharp, personSharp } from 'ionicons/icons';
import Photo from './pages/Photo';
import Camera from './components/Camera';


const App: React.FC = () => {

    return (
        <IonApp>

            <IonReactRouter>
                <IonHeader>
                    <IonToolbar className="toolBar">
                        <IonRouterLink routerLink="/home" routerDirection="forward" slot="start">
                            <IonImg className="logo" src="/assets/icon/favicon.png" />
                        </IonRouterLink>
                        <IonButtons slot="end">
                            <IonButton routerLink="Photo" routerDirection="forward" slot="start">
                                <IonIcon icon={cameraSharp}></IonIcon>
                            </IonButton>
                            <IonButton routerLink="Perfil" routerDirection="forward" href="/Perfil" slot="start">
                                <IonIcon icon={personSharp}></IonIcon>
                            </IonButton>

                        </IonButtons>

                    </IonToolbar>
                </IonHeader>
                <IonRouterOutlet mode="md" animated={true} >
                    <Route path="/home" component={Home} exact />
                    <Route path="/photo" component={Photo} exact />
                    <Route path="/perfil" component={Perfil} exact />
                    <Redirect from="/" to="/home" />

                </IonRouterOutlet>



            </IonReactRouter>

        </IonApp>

    );

}
export default App;
