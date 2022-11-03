import axios from "axios"
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth/"

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password
    });
};

const login = (username, password) => {
    return axios.post(API_URL + "signin", {
        username,
        password
    }).then((response) => {
        if (response.data.token) {
            const token = jwtDecode(response.data.token);
            response.data.roles = Object.entries(token["Role"]).map(([, v]) => v.authority);
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService