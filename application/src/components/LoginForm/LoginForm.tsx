import "./LoginForm.scss"
import React, {JSX, useEffect, useState} from "react";
import axios from "axios";
import {API_ROUTES, storeInLocalStorage, useUser} from "../../utils/Commons";
import {useHistory} from 'react-router-dom';

// @ts-ignore
export default function LoginForm({updateMode}): JSX.Element {
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

    const sendNotification = (message: string, timeout: number) => {
        setNotification({error: true, message: message});
        setTimeout(() => {
            setNotification({error: false, message: ''});
        }, timeout);
    }

    const signIn = async () => {
        console.log('signIn');
        if (!email || !password) {
            sendNotification('Veuillez remplir tous les champs', 3000);
            return;
        }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const validEmail = validRegex.test(email);
        if (!validEmail) {
            sendNotification('Veuillez entrer une adresse email valide', 3000)
            return;
        }
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
                sendNotification('Une erreur est survenue', 3000);
                console.log('Something went wrong during signing in: ', response);
            } else {
                console.log('signIn response.data', response.data);
                console.log("connected");
                storeInLocalStorage(response.data.token, response.data.userId);
                history.push('/home');
            }
        } catch (err: any) {
            sendNotification('Une erreur est survenue', 3000);
            console.log('Some error occured during signing in: ', err);
        } finally {
            setIsLoading(false);
        }
        // Wait 4 secondes and set notification to empty
    };

    const registerPage = () => {
        updateMode(false);
    };

    return (
        <div className="login-form">
            <form>
                <img className={"logo"} src={"assets/logos/text-no-background-500x500.png"} alt={"logo"}/>
                <h3>Connexion</h3>
                <div className={"error"}>
                    {notification.error && <p className="error">{notification.message}</p>}
                </div>
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
                           e.preventDefault();
                           setPassword(e.target.value);
                       }}/>

                <button type="button" onClick={signIn}>Connexion</button>
                <p className="forgot-password text-right">
                    Vous n'avez pas de compte ? <a onClick={registerPage}>Créer un compte</a>
                </p>
            </form>
        </div>
    )
}