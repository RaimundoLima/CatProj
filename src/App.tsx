import React from 'react';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonFab, IonFabButton, IonPage, IonContent, IonTabs, IonTabBar, IonTabButton, IonLabel, IonGrid, IonRow, IonCol, IonNav } from '@ionic/react';
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
import { filterSharp, cameraSharp, personSharp } from 'ionicons/icons';
import Photo from './pages/Photo';
import Filter from './pages/Filter';



const App: React.FC = () => (


    <IonApp>
        <IonReactRouter>
            <IonContent>
                <IonNav>
                    <IonTitle>
                        aaaaaaa
                    </IonTitle>

                </IonNav>

                <IonTabs>
                    <IonRouterOutlet mode="md" animated={true} >
                        <Route path="/home" component={Home} exact />
                        <Route path="/filter" component={Filter} exact />
                        <Route path="/photo" component={Photo} exact />
                        <Route path="/perfil" component={Perfil} exact />
                        <Redirect from="/" to="/home" />

                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton  tab="home" href="/home">
                            <IonTitle>Logo</IonTitle>
                        </IonTabButton>
                        <IonTabButton  tab="filter" href="/filter">
                            <IonIcon icon={filterSharp}></IonIcon>
                        </IonTabButton>
                        <IonTabButton tab="photo" href="/photo">
                            <IonIcon icon={cameraSharp}></IonIcon>
                        </IonTabButton>
                        <IonTabButton tab="perfil" href="/perfil">
                            <IonIcon icon={personSharp}></IonIcon>
                        </IonTabButton>
                    </IonTabBar>

                </IonTabs>
            </IonContent>
        </IonReactRouter>
    </IonApp>

);

export default App;
