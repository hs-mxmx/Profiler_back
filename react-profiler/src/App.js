import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import './components/Login.css';
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";


const App = () => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    useEffect(() => {
        console.log(currentUser);
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

  return (
      <BrowserRouter>
      <Routes>
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
