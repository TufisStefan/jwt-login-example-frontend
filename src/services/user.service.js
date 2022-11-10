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

const deleteUser = (username) => {
    axiosService.delete(API_URL + "admin", { params: { username: username } });
}

const updateUser = (id, user) => {
    return axiosService.post(API_URL + "admin", user, { params: { id: id } });
}

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    deleteUser,
    updateUser
};

export default UserService