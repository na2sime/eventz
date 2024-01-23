import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import {addCircleOutline, homeOutline, personCircleOutline, ticketOutline} from "ionicons/icons";
import React from "react";
import Tab1 from "./pages/home/Tab1";
import Account from "./pages/account/Account";
import Post from "./pages/post/Post";

const MainTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/" to="/home"/>
                <Route path="/home" render={() => <Tab1/>} exact={true}/>
                <Route path="/publish" render={() => <Post/>} exact={true}/>
                <Route path="/profile" render={() => <Account/>} exact={true}/>
                <Route path="/ticket" render={() => <Tab1/>} exact={true}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                    <IonIcon icon={homeOutline}/>
                </IonTabButton>
                <IonTabButton tab="publish" href="/publish">
                    <IonIcon icon={addCircleOutline}/>
                </IonTabButton>
                <IonTabButton tab="ticket" href="/ticket">
                    <IonIcon icon={ticketOutline}/>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={personCircleOutline}/>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default MainTabs;