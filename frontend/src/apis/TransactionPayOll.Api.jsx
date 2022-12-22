import AxiosInstance from "../configs/axios/AxiosInstance";

const TransactionAPIPayoll = {
  async getAllTransaction() {
    try {
      const response = await AxiosInstance.get(
        "/transaction/history/all?page=1&limit=99999"
      );
      return response;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  },
  async changeTransactionStatus(data) {
    try {
      // ${id}
      const response = await AxiosInstance.put(`/transaction/${data.id}`, {
        status: data.status,
      });
      return response;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  },
};

export default TransactionAPIPayoll;
