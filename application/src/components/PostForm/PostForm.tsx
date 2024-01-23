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

const DefaultImage = "../../assets/images/default.webp";

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
                <IonCardHeader>
                    <IonCardTitle>Créer un nouvelle évènement</IonCardTitle>
                    <IonCardSubtitle>Veuilliez remplir tout les champs</IonCardSubtitle>
                </IonCardHeader>
                <img alt="event picture"
                     src={DefaultImage}/>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Nom de l'évènement</IonLabel>
                            <IonInput name={"name"} type="text" inputMode={"text"} autofocus={true}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Description</IonLabel>
                            <IonInput name={"description"} type="text" inputMode={"text"}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Date de debut</IonLabel>
                            <IonDatetimeButton datetime="start-datetime"></IonDatetimeButton>
                            <IonModal keepContentsMounted={true}>
                                <IonDatetime id="start-datetime"></IonDatetime>
                            </IonModal>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Date de fin</IonLabel>
                            <IonDatetimeButton datetime="end-datetime"></IonDatetimeButton>
                            <IonModal keepContentsMounted={true}>
                                <IonDatetime id="end-datetime"></IonDatetime>
                            </IonModal>
                        </IonItem>
                    </IonList>
                </IonCardContent>
                <IonButton fill={"clear"}>Valider</IonButton>
            </IonCard>
        </section>
    );
}