import React, {useState, useEffect} from 'react';
import {Navigate, BrowserRouter, Routes, Route, Link} from "react-router-dom"
import './App.css';
import './components/Login.css';
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";


const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            console.log(user);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          {currentUser ? (
              <Route path="/dashboard*" element={<Dashboard />} />
          ) : (
              <Route path="/" element={<Login />} />
          )}
          <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
