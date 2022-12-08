import AxiosInstance from "../configs/axios/AxiosInstance";

const TransactionAPIPayoll = {
    // async getTransactionHistory() {
    //     try {
    //         const response = await AxiosInstance.get("/transaction/history");
    //         return response;
    //     } catch (err) {
    //         const { message } = err.response.data;
    //         throw new Error(message);
    //     }
    // },
    // async getTransactionHistoryById() {
    //     try {
    //         // ${id}
    //         const response = await AxiosInstance.get(`/transaction/history/`);
    //         return response;
    //     } catch (err) {
    //         const { message } = err.response.data;
    //         throw new Error(message);
    //     }
    // },
    async getAllTransaction() {
        try {
            const response = await AxiosInstance.get("/transaction/history/all?page=1&limit=99999");
            return response;
        } catch (err) {
            const { message } = err.response.data;
            throw new Error(message);
        }
    },
    // async getTotalTransaction() {
    //     try {
    //         const response = await AxiosInstance.get("/transaction/count");
    //         return response;
    //     } catch (err) {
    //         const { message } = err.response.data;
    //         throw new Error(message);
    //     }
    // },
    // async reviewTransaction() {
    //     try {
    //         const response = await AxiosInstance.post("/transaction/review");
    //         return response;
    //     } catch (err) {
    //         const { message } = err.response.data;
    //         throw new Error(message);
    //     }
    // },
    // async submitTransaction() {
    //     try {
    //         const response = await AxiosInstance.post("/transaction/submit");
    //         return response;
    //     } catch (err) {
    //         const { message } = err.response.data;
    //         throw new Error(message);
    //     }
    // },
    // async changeTransactionStatus() {
    //     try {
    //         // ${id}
    //         const response = await AxiosInstance.put(`/transaction/`);
    //         return response;
    //     } catch (err) {
    //         const { message } = err.response.data;
    //         throw new Error(message);
    //     }
    // },
};

export default TransactionAPIPayoll;