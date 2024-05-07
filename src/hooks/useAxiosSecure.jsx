import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://foodi-backend-1.onrender.com/api/v1',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        console.log(error);
        const status = error.response ? error.response.status : null; // Check if error.response exists
        
        if (status === 401 || status === 403) {
            await logOut();
            navigate("/login");
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
