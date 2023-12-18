import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Account.scss';
import React from "react";
import Background from "../../components/Background/Background";
import {useUser} from "../../utils/Commons";
import UserInfo from "../../components/UserInfo/UserInfo";

const Account: React.FC = () => {

    const [userId, setUserId] = React.useState<string>("");
    const {connectedUser, auth, userLoading} = useUser();

    React.useEffect(() => {
        if (connectedUser && auth && !userLoading) {
            setUserId(connectedUser.user.userId);
        }
    }, []);

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <Background/>
                    <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Background/>
                <UserInfo userId={userId}/>
            </IonContent>
        </IonPage>
    );
};

export default Account;
