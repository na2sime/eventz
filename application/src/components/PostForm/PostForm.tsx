import "./PostForm.scss"
import React, {JSX, useEffect, useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonCheckbox, IonContent, IonDatetime, IonDatetimeButton,
    IonGrid, IonIcon, IonInput,
    IonItem, IonLabel,
    IonList, IonModal, IonThumbnail, useIonRouter
} from "@ionic/react";
import Event from "../../models/Event.model";
import {bookOutline, homeOutline, mailOutline} from "ionicons/icons";

// @ts-ignore
export default function PostForm(): JSX.Element {
    const router = useIonRouter();
    // Removed getCurrentUser function
    const [event, setEvent] = useState<Event>({
        eventId: "",
        name: "",
        imageUrl: "",
        description: "",
        date: new Date(),
        location: "",
        maxPlaces: 0,
        owner: "",
        members: [],
    });


    return (
        <section className={"postform"}>
            <IonCard>
                <img alt="user profile picture"
                     src={"https://www.cewe.fr/cdn/images/tl/j4/TlJ4aGc1YmJ3V2JXNitYNUswYk9QVTE5T1RPUHI4US9jTy9WejgxRXhrL2d3Q2lYMHc1VUd4Q0JlMkE1ZUhpQzYyT2Zoc2Vpc3Mrd1BuNDF1YnpzYys5QjM5NXNFNjdxNDVhTHlOc1lUa0k9"}/>
                <IonCardHeader>
                    <IonCardTitle>Créer un nouvelle évènement</IonCardTitle>
                    <IonCardSubtitle>Veuilliez remplir tout les champs</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <form className="ion-padding">
                        <IonItem>
                            <IonLabel position="floating">Name</IonLabel>
                            <IonInput name={"name"} type="text" inputMode={"text"} autofocus={true}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Description</IonLabel>
                            <IonInput name={"description"} type="text" inputMode={"text"}/>
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel position="floating">Date de debut</IonLabel>
                            <IonDatetimeButton datetime="start-datetime"></IonDatetimeButton>
                            <IonModal keepContentsMounted={true}>
                                <IonDatetime id="start-datetime"></IonDatetime>
                            </IonModal>
                        </IonItem>
                        <IonItem lines="none">
                            <IonLabel position="floating">Date de fin</IonLabel>
                            <IonDatetimeButton datetime="end-datetime"></IonDatetimeButton>
                            <IonModal keepContentsMounted={true}>
                                <IonDatetime id="end-datetime"></IonDatetime>
                            </IonModal>
                        </IonItem>
                        <IonButton className="ion-margin-top" type="submit" expand="block">
                            Login
                        </IonButton>
                    </form>
                </IonCardContent>
            </IonCard>
            <IonButton fill={"clear"} onClick={() => disconnect()}>Deconnection</IonButton>
        </section>
    );
}