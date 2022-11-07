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


const getAdminBoard = (page, rowsPerPage) => {
    return axiosService.get(API_URL + "admin", { params: { pageNumber: page, pageSize: rowsPerPage } });
}

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard
};

export default UserService