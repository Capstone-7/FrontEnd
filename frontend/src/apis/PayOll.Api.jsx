import AxiosInstance from "../configs/axios/AxiosInstance";

const APIPayoll = {
    async getAllUser() {
        try {
            const response = await AxiosInstance.get("/user/all");
            return response;
        } catch (err) {
            const { message } = err.response.data;
            throw new Error(message);
        }
    },
    async login() {
        try {
            const response = await AxiosInstance.post("/user/login");
            return response;
        } catch (err) {
            const { message } = err.response.data;
            throw new Error(message);
        }
    },
    async getProductAll() {
        try {
            const response = await AxiosInstance.get("/product/all");
            return response;
        } catch (err) {
            const { message } = err.response.data;
            throw new Error(message);
        }
    },
    async getTransaksi() {
        try {
            const response = await AxiosInstance.get("transaction/count");
            return response;
        } catch (err) {
            const { message } = err.response.data;
            throw new Error(message);
        }
    },
};

export default APIPayoll;