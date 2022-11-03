import axios from "axios";

const axiosService = axios.create();

axiosService.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            config.headers["Authorization"] = "Bearer " + user.token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosService;