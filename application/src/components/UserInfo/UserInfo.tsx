import "./UserInfo.scss"
import React, {JSX, useEffect, useState} from "react";
import {getFromLocalStorage, getUser, hideTabBar, useUser} from "../../utils/Commons";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonContent,
    IonGrid, IonIcon,
    IonItem, IonLabel,
    IonList, IonThumbnail, useIonRouter
} from "@ionic/react";
import User from "../../models/User.model";
import {bookOutline, homeOutline, mailOutline} from "ionicons/icons";

// @ts-ignore
export default function UserInfo({userId}): JSX.Element {
    const router = useIonRouter();
    // Removed getCurrentUser function
    const [user, setUser] = useState<User>({
        email: "",
        events: [],
        firstName: "",
        lastName: "",
        ownEvents: [],
        username: "",
    });

    useEffect(() => {
        const id = getFromLocalStorage("userId");
        if (id) {
            getUser(id)
                .then(response => {
                    setUser(response);
                })
                .catch(err => {
                    console.error(err);
                });
        }

    }, [setUser]);

    function disconnect() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        router.push("/login");
        hideTabBar();
    }


    return (
        <section className={"userInfo"}>
            <IonCard>
                <img alt="user profile picture"
                     src={"https://www.cewe.fr/cdn/images/tl/j4/TlJ4aGc1YmJ3V2JXNitYNUswYk9QVTE5T1RPUHI4US9jTy9WejgxRXhrL2d3Q2lYMHc1VUd4Q0JlMkE1ZUhpQzYyT2Zoc2Vpc3Mrd1BuNDF1YnpzYys5QjM5NXNFNjdxNDVhTHlOc1lUa0k9"}/>
                <IonCardHeader>
                    <IonCardTitle>{user.username}</IonCardTitle>
                    <IonCardSubtitle>Vos informations</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonThumbnail slot="start">
                                <IonIcon size={"large"} icon={mailOutline}/>
                            </IonThumbnail>
                            <IonLabel>{user.email}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonThumbnail slot="start">
                                <IonIcon size={"large"} icon={bookOutline}/>
                            </IonThumbnail>
                            <IonLabel>{user.lastName} {user.firstName} </IonLabel>
                        </IonItem>
                    </IonList>
                </IonCardContent>
            </IonCard>
            <IonButton fill={"clear"} onClick={() => disconnect()}>Deconnection</IonButton>
        </section>
    );
}