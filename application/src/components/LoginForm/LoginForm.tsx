import "./LoginForm.scss"
import React, {JSX, useEffect, useState} from "react";
import axios from "axios";
import {API_ROUTES, storeInLocalStorage, useUser} from "../../utils/Commons";
import {useHistory} from 'react-router-dom';

export default function LoginForm(): JSX.Element {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({error: false, message: ''});

    const {connectedUser, auth, userLoading} = useUser();
    useEffect(() => {
        if (connectedUser || auth) {
            history.push('/');
        }
    });
    const signIn = async () => {
        console.log('signIn');
        try {
            console.log('signIn try');
            setIsLoading(true);
            const response = await axios({
                method: 'post',
                url: API_ROUTES.SIGN_IN,
                data: {
                    email,
                    password,
                },
            });
            console.log('signIn response', response);
            if (!response?.data?.token) {
                setNotification({error: true, message: 'Une erreur est survenue'});
                console.log('Something went wrong during signing in: ', response);
            } else {
                storeInLocalStorage(response.data.token, response.data.userId);
                history.push('/');
            }
        } catch (err: any) {
            setNotification({error: true, message: err.message});
            console.log('Some error occured during signing in: ', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-form">
            <form>
                <img className={"logo"} src={"assets/logos/text-no-background-500x500.png"} alt={"logo"}/>
                <h3>Connexion</h3>

                <label htmlFor="username">Email</label>
                <input type="text" placeholder="Adresse email"
                       name="email"
                       id="email"
                       value={email}
                       onChange={(e) => {
                           setEmail(e.target.value);
                       }}/>

                <label htmlFor="password">Mot de passe</label>
                <input type="password" placeholder="Mot de passe" id="password"
                       name="password"
                       value={password}
                       onChange={(e) => {
                           setPassword(e.target.value);
                       }}/>

                <button type="submit" onClick={signIn}>Connexion</button>
                <p className="forgot-password text-right">
                    Vous n'avez pas de compte ? <a href="#">Créer un compte</a>
                </p>
            </form>
        </div>
    )
}