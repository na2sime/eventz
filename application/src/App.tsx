import {Redirect, Route} from 'react-router-dom';
import {IonApp, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Tab1 from './pages/home/Tab1';
import Login from './pages/login/Login';
import './theme/variables.css';
import React, {useEffect} from "react";
// @ts-ignore
import {API_ROUTES, useUser} from "./utils/Commons"
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
import axios from "axios";

setupIonicReact();

function App() {
    const {connectedUser, auth, userLoading} = useUser();

    console.log('connectedUser', connectedUser);

    useEffect(() => {
        console.log('A');
        if (connectedUser) {
            console.log('B');
            const getUser = async () => {
                console.log('C');
                const response = await axios({
                    method: 'get',
                    url: API_ROUTES.IS_CONNECTED,
                    headers: {
                        Authorization: `Bearer ${connectedUser.token}`,
                    },
                });
                console.log('D');
                if(response.status == 401) {
                    console.log('E');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    console.log('Something went wrong during getting user: ', response);
                    console.log("A")
                    console.log(localStorage.getItem('token'));
                    console.log(localStorage.getItem('userId'));
                } else {
                    console.log('F');
                    console.log('getUser response', response);
                }
                console.log('G');
            }
            console.log('H');
            getUser().then(r => r);
        }
    }, [connectedUser]);

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
