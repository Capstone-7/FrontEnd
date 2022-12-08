import axios from "axios";
import CONST from "../../utils/Constants";
import Cookies from "js-cookie";

const AxiosInstance = axios.create({
    baseURL: CONST.BASE_URL_API,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
    }
});

export default AxiosInstance;