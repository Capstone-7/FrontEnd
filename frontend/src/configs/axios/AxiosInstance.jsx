import axios from "axios";
import CONST from "../../utils/Constants";

const AxiosInstance = axios.create({
  baseURL: CONST.BASE_URL_API,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "admin-secret": process.env.REACT_APP_API_KEY,
  },
});

export default AxiosInstance;
