import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../../store/Store";
import { setLoader } from "../../store/features/LoaderSlice";
import { Auth } from "../../utils/Auth";
import CONST from "../../utils/Constants";

const exceptionApiUrlforRT = (config) => {
    if (!config) return null;
    const arr = [config.url.includes("/admin")];
    return arr.includes(true);
};

export const isHandlerEnabled = (config) => {
    return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
        ? false
        : true;
};

export const requestHandler = async (config) => {
    store.dispatch(setLoader(true));
    if (isHandlerEnabled(config)) {
        const token = Cookies.get("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    }
    return config;
};

export const successHandler = (response) => {
    store.dispatch(setLoader(false));
    if (isHandlerEnabled(response)) {
        if (response.status === 200) {
            return response;
        }
    }
    return response;
};

export const errorHandler = (error) => {
    store.dispatch(setLoader(false));
    return Promise.reject({ ...error });
};
