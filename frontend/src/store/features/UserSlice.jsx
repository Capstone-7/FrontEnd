import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AdminAPIPayoll from "../../apis/AdminPayOll.Api";

const initialState = {
  admin: "",
  status: "idle",
  error: null,
};

export const getCurrentAdmins = createAsyncThunk(
  "PayOll/getCurrentAdmins",
  async () => {
    const res = await AdminAPIPayoll.getCurrentAdmin();
    return res.data;
  }
);

export const login = createAsyncThunk("PayOll/login", async (user) => {
  const res = await AdminAPIPayoll.login(user);
  return res.data.data.token;
});

export const UserSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.admin = action.payload;
      })
      .addCase(getCurrentAdmins.fulfilled, (state, action) => {
        state.status = "success";
        state.admin = action.payload;
      });
  },
});

export default UserSlice.reducer;
