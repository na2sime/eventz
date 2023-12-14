import "./LoginForm.scss"
import React, {JSX} from "react";

export default function LoginForm(): JSX.Element {
  return (
    <div className="login-form">
        <form>
            <h3>Connexion</h3>

            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" placeholder="Email ou nom d'utilisateur" id="username"/>

            <label htmlFor="password">Mot de pass</label>
            <input type="password" placeholder="Mot de pass" id="password"/>

            <button>Connexion</button>
            <p className="forgot-password text-right">
                Vous n'avez pas de compte ? <a href="#">Créer un compte</a>
            </p>
        </form>
    </div>
  )
}