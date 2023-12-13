import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Tab1 from './pages/home/Tab1';
import Login from './pages/login/Login';
import './theme/variables.css';
import React from "react";
import {useState, useEffect} from "react";
// @ts-ignore
import {useUser} from "./utils/Commons.js"
import {
    addCircleOutline,
    cogOutline,
    homeOutline,
    listOutline,
    personCircle,
    personCircleOutline, ticketOutline
} from 'ionicons/icons';
// Import ionic react css
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

function App() {
    const [isConnected, setConnected] = useState<boolean>(false);
    const {connectedUser, auth, userLoading} = useUser();
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet placeholder={undefined}>
                        <Route exact path="/home">
                            {!connectedUser || !auth ? <Redirect to="/login"/> : <Tab1/>}
                        </Route>
                        <Route exact path="/signup">
                            <Login/>
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path={"publish"}>
                            <Login/>
                        </Route>
                        <Route exact path={"profile"}>
                            <Login/>
                        </Route>
                        <Route exact path={"event/:id"}>
                            <Login/>
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/home"/>
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon icon={homeOutline}/>
                            {/* <IonLabel>Tab 1</IonLabel> */}
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon icon={addCircleOutline}/>
                            {/* <IonLabel>Tab 2</IonLabel> */}
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon icon={ticketOutline}/>
                            {/* <IonLabel>Tab 2</IonLabel> */}
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3">
                            <IonIcon icon={personCircleOutline}/>
                            {/* <IonLabel>Tab 3</IonLabel> */}
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
