import React, {useState} from "react";
import {isEmail} from "validator";
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="invalid-feedback d-block">
                This is not a valid email.
            </div>
        );
    }
};


const validUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="invalid-feedback d-block">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const validPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="invalid-feedback d-block">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Login = () => {
    const navigate = useNavigate();

    const [authMode, setAuthMode] = useState("signin")
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const Login = (e) => {
        e.preventDefault();
        AuthService.login(username, password)
            .then((response) => {
                console.log(response);
                navigate('/dashboard')
                window.location.reload();
            })
            .catch((error) => {
                console.log('error: ' + error);
            });
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        AuthService.register(name, username, email, password).then(
            (response) => {
                setAuthMode("signin");
                setMessage(response.data.message);
                setSuccessful(true);
                setPassword('');
                setUsername('');
                setEmail('');
                setName('');
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(error)

                setMessage(resMessage);
                setSuccessful(false);
            }
        );

    }


    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
        setPassword('');
        setUsername('');
        setEmail('');
        setName('');
    }

    if (authMode === "signin") {
        return (<div className="Auth-form-container">
                <form className="Auth-form" onSubmit={Login}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                <b>Sign Up</b>
              </span>

                        </div>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <p className="text-center mt-2">
                            <a href="react-profiler/src/components/Login#Login_old.js">Forgot password?</a>
                        </p>
                    </div>
                </form>
            </div>
        )
    }

    return (<div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSignUp}>
                {!successful && (
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
                                name="name"
                                value={name}
                                onChange={onChangeName}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required, validUsername]}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={onChangeEmail}
                                validations={[required, validEmail]}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required, validPassword]}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Sign Up</button>
                        </div>

                        <p className="text-center mt-2">
                            Forgot <a href="react-profiler/src/components/Login#Login_old.js">password?</a>
                        </p>
                    </div>
                )}
                {message && (
                    <div className="form-group">
                        <div
                            className={
                                successful ? "alert alert-success" : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {message}
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Login;