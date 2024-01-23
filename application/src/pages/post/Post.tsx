import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Post.scss';
import React from "react";
import Background from "../../components/Background/Background";
import {useUser} from "../../utils/Commons";
import UserInfo from "../../components/UserInfo/UserInfo";
import PostForm from "../../components/PostForm/PostForm";

const Post: React.FC = () => {

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
                    <IonToolbar>
                        <IonTitle size="large">Post</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Background/>
                <PostForm/>
            </IonContent>
        </IonPage>
    );
};

export default Post;
