import AxiosInstance from "../configs/axios/AxiosInstance";

const AdminAPIPayoll = {
  async getAllUser() {
    try {
      const response = await AxiosInstance.get("/user/all");
      return response;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  },
  async login(user) {
    const email = user.email;
    const password = user.password;
    try {
      const response = await AxiosInstance.post("/user/login", {
        email: email,
        password: password,
      });
      return response;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  },
  async getCurrentAdmin() {
    try {
      const response = await AxiosInstance.get("/user/profile");
      return response;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  },
};

export default AdminAPIPayoll;
