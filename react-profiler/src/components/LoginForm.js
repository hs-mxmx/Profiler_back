import React, {useState} from "react";
import APIService from "./APIService";
import logo from "../logo.svg";

export default function () {
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
                    User created!
                </a>
                <p>{'name'}</p>
                <p>{'username'}</p>
                <p>{'mail'}</p>
                <p>{'password'}</p>
            </header>
        </div>
    )
}
