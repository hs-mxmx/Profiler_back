import React, {useEffect, useState} from "react";
import logo from '../logo.svg';
import {useLocation} from "react-router-dom";
import {useCookies} from 'react-cookie';

export default function Dashboard(props) {

    const {state} = useLocation();
    const [currentUserName, setCurrentUserName] = useState(() => state['Username'])
    const [currentUserUID, setCurrentUserUID] = useState(() => state['UID'])
    const [sessionId, setSessionId] = useState('')
    const [cookies, setCookie] = useCookies(['session']);

    const handle = () => {
        setCookie('session', sessionId, {path: '/'});
    };

    console.log(cookies)

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
                <p>{currentUserName}</p>
                <p>{currentUserUID}</p>
                <p>{cookies.sessionId}</p>
            </header>
        </div>
    )
}