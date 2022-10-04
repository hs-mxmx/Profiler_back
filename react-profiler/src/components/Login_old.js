import React, {useState} from 'react';
import APIService from "./APIService";
import {useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import './Login.css';

export default function (props) {
    let [authMode, setAuthMode] = useState("signin")
    let [name, setName] = useState('')
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [UserOrEmail, setUserOrEmail] = useState('')
    let [error, setError] = useState(null)
    let [userFound, setUserFound] = useState(null)
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['sessionId']);

    const handleCookie = () => {
        setCookie('Name', username, {path: '/'});
        setCookie('Password', password, {path: '/'});
    };

    const Register = () => {
        APIService.Register({name, username, email, password})
            .then((response) => {
                console.log(response);
                handleCookie();
            })
            .catch((error) => {
                console.log('error: ' + error);
                setUserFound({requestFailed: true});
            });
    }

    const Login = () => {
        APIService.Login({UserOrEmail, password})
            .then((response) => {
                console.log(response);
                navigate('/dashboard', {state: response}
                );
            })
            .catch((error) => {
                console.log('error: ' + error);
                setUserFound({requestFailed: true});
            });
    }

    const handleSignUp = (event) => {
        event.preventDefault()
        Register()
        setName('')
        setUsername('')
        setEmail('')
        setPassword('')
    }

    const handleSignIn = (event) => {
        event.preventDefault()
        Login()
        setUserOrEmail('')
        setPassword('')
    }

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    if (authMode === "signin") {
        return (<div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSignIn}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                <b>Sign Up</b>
              </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email or Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Email or Username"
                            value={UserOrEmail}
                            onChange={(e) => setUserOrEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onClick={handleSignIn}>
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        <a href="react-profiler/src/components/Login#Login_old.js">Forgot password?</a>
                    </p>
                </div>
            </form>
        </div>)
    }

    return (<div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSignUp}>
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign Up</h3>
                <div className="text-center">
                    Already registered?{" "}
                    <span className="link-primary" onClick={changeAuthMode}>
                            <b>Sign In</b>
                        </span>
                </div>
                <div className="form-group mt-3">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
                <p className="text-center mt-2">
                    Forgot <a href="react-profiler/src/components/Login#Login_old.js">password?</a>
                </p>
            </div>
        </form>
    </div>)
}