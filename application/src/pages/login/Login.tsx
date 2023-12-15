import {
    IonContent,
    IonPage,
    useIonViewDidEnter,
    useIonViewDidLeave
} from '@ionic/react';
import './Login.scss';
import React from "react";
import {hideTabBar, showTabBar} from "../../utils/Commons";
import LoginForm from "../../components/LoginForm/LoginForm";
import Background from "../../components/Background/Background";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Login: React.FC = () => {

    const [loginMode, setLoginMode] = React.useState<boolean>(true);

    useIonViewDidEnter(() => {
        console.log('ionViewDidEnter event fired');
        hideTabBar();
    });

    useIonViewDidLeave(() => {
        console.log('ionViewDidLeave event fired');
        showTabBar();
    });

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <Background/>
                {loginMode ? <LoginForm updateMode={setLoginMode}/> : <RegisterForm updateMode={setLoginMode}/>}
            </IonContent>
        </IonPage>
    );
};

export default Login;
