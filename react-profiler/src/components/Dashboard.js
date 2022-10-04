import React, {useEffect, useState, Component} from "react";
import logo from '../logo.svg';
import {useNavigate, useLocation} from "react-router-dom";
import AuthService from "../services/auth.service";
import {useCookies} from 'react-cookie';

export default function Dashboard(props) {

    const {state} = useLocation();
    const navigate = useNavigate();
    const [authenticated, setauthenticated] = useState(AuthService.getCurrentUser());

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

