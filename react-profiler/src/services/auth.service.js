import axios from "axios";

const API_URL = "http://localhost:5000/auth/";

const register = (name, username, email, password) => {
    return axios.put(API_URL + "signup", {
        name,
        username,
        email,
        password
    });
}

const login = (username, password) => {
    return axios.post(API_URL + "signin", {
            username,
            password
        })
        .then(response => {
            localStorage.setItem("token", JSON.stringify(response.data));
            return JSON.stringify(response.data);
        });
}

const logout = () => {
    localStorage.removeItem("token");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('token'));
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default  AuthService;