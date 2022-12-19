import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import PageProduct from "../pages/PageProduct";
import DashboardAppPage from "../pages/DashboardPage";
import Page404 from "../pages/Page404";
import UserPage from "../components/User/UserPage";
import Transaction from "../components/Transaction/Transaction";
import { Provider } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import { store } from "../store/Store";
import PrivateRoute from "./PrivateRoute";
import { ProductLayout } from "../layouts/dashboard";
import Daily from "../components/Product/Daily/Daily"
import Bills from "../components/Product/Bills/Bills";
import Entertainment from "../components/Product/Entertainment/Entertainment";

const SetUpRouters = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Landing Page (For User) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/productlist" element={<PageProduct />} />
          {/* Login Page */}
          <Route path="/admin/login" element={<PrivateRoute />} />
          {/* Protected Route */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route index element={<DashboardAppPage />} />
            <Route path="/admin/products" element={<ProductLayout />}>
              <Route path="/admin/products/daily" element={<Daily />} />
              <Route path="/admin/products/bills" element={<Bills />} />
              <Route
                path="/admin/products/entertainment"
                element={<Entertainment />}
              />
            </Route>
            <Route path="/admin/transaksi" element={<Transaction />} />
            <Route path="/admin/user" element={<UserPage />} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default SetUpRouters;
