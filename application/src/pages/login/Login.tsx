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

const Login: React.FC = () => {

    const [loginMode, setLoginMode] = React.useState<boolean>(true);
    const [registerMode, setRegisterMode] = React.useState<boolean>(false);

    function switchMode() {
        setLoginMode(!loginMode);
        setRegisterMode(!registerMode);
    }

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
                <LoginForm/>
            </IonContent>
        </IonPage>
    );
};

export default Login;
