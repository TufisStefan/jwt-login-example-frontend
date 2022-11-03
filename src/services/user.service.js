import axiosService from "./axios.service";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return axiosService.get(API_URL + "all");
}

const getUserBoard = () => {
    return axiosService.get(API_URL + "user");
}


const getModeratorBoard = () => {
    return axiosService.get(API_URL + "mod");
}


const getAdminBoard = () => {
    return axiosService.get(API_URL + "admin");
}

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard
};

export default UserService