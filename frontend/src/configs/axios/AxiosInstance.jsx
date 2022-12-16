import axios from "axios";
import CONST from "../../utils/Constants";
import { errorHandler, requestHandler, successHandler } from "../Interceptors";

// const AxiosInstance = axios.create({
//     baseURL: CONST.BASE_URL_API,
//     headers: {
//         accept: 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${Cookies.get('token')}`
//     }
// });

const config = {
    baseURL: CONST.BASE_URL_API,
};

const AxiosInstance = axios.create(config);

// Handle request process
AxiosInstance.interceptors.request.use((request) => requestHandler(request));

// Handle response process
AxiosInstance.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
);

export default AxiosInstance;