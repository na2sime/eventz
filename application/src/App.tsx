import {Redirect, Route} from 'react-router-dom';
import {IonApp, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Tab1 from './pages/home/Tab1';
import Login from './pages/login/Login';
import './theme/variables.css';
import React from "react";
// @ts-ignore
import {useUser} from "./utils/Commons"
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
import MainTabs from "./MainTabs";

setupIonicReact();

function App() {
    const {connectedUser, auth, userLoading} = useUser();
    return (
        <IonApp>
            <IonReactRouter>
                <Route path="/login" component={Login} exact={true}/>
                <Route path="/" component={!connectedUser || !auth ? Login : MainTabs}/>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
