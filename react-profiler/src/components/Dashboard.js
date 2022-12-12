import React, {useState} from "react";
import logo from '../logo.svg';
import AuthService from "../services/auth.service";

export default function Dashboard() {

    const [authenticated] = useState(AuthService.getCurrentUser());

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <p>Username: {authenticated.username}</p>
                <p>Token: {authenticated.accessToken}</p>
            </header>
        </div>
    )
}

