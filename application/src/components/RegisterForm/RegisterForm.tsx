import "./RegisterForm.scss"
import React, {JSX, useEffect, useState} from "react";
import axios from "axios";
import {API_ROUTES, storeInLocalStorage, useUser} from "../../utils/Commons";
import {useHistory} from 'react-router-dom';

// @ts-ignore
export default function RegisterForm({updateMode}): JSX.Element {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

    const signUp = async () => {
        console.log('signIn');
        if (!email || !password || !username || !firstName || !lastName) {
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
                url: API_ROUTES.SIGN_UP,
                data: {
                    email,
                    password,
                    username,
                    firstName,
                    lastName,
                },
            });
            console.log('signIn response', response);
            if (response.status != 201) {
                sendNotification('Une erreur est survenue', 3000);
                console.log('Something went wrong during signup: ', response);
            } else {
                sendNotification('Inscription reussis!', 2000);
                setTimeout(() => {
                    updateMode(true);
                }, 2000);
            }
        } catch (err: any) {
            sendNotification('Une erreur est survenue', 3000);
            console.log('Some error occured during signing in: ', err);
        } finally {
            setIsLoading(false);
        }
        // Wait 4 secondes and set notification to empty
    };

    const loginPage = () => {
        updateMode(true);
    };

    return (
        <div className="register-form">
            <form>
                <h3>Inscription</h3>
                <div className={"error"}>
                    {notification.error && <p className="error">{notification.message}</p>}
                </div>
                <label htmlFor="email">Email</label>
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

                <label htmlFor="userName">Pseudo</label>
                <input type="text" placeholder="Pseudo" id="userName"
                       name="userName"
                       value={username}
                       onChange={(e) => {
                           setUserName(e.target.value);
                       }}/>

                <label htmlFor="firstName">Prenom</label>
                <input type="text" placeholder="Prenom" id="firstName"
                       name="firstName"
                       value={firstName}
                       onChange={(e) => {
                           setFirstName(e.target.value);
                       }}/>

                <label htmlFor="lastName">Nom</label>
                <input type="text" placeholder="Nom" id="lastName"
                       name="lastName"
                       value={lastName}
                       onChange={(e) => {
                           setLastName(e.target.value);
                       }}/>

                <button type="button" onClick={signUp}>Inscription</button>
                <p className="forgot-password text-right">
                    Vous avez deja un compte ? <a onClick={loginPage}>Connectez vous</a>
                </p>
            </form>
        </div>
    )
}