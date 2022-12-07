import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import PageProduct from "../pages/PageProduct";
import DashboardAppPage from "../pages/admin/DashboardPage";
import Page404 from "../pages/admin/Page404";
import ProductsPage from "../pages/admin/ProductsPage";
import UserPage from "../pages/admin/UserPage";
import Transaksi from '../pages/admin/Transaksi'
import { Provider } from 'react-redux';
import ProtectedRoute from "./ProtectedRoute";
import { store } from "../store/Store"
import PrivateRoute from "./PrivateRoute";

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
            <Route path="/admin/*" element={<Page404 />} />
            <Route path="/admin/products" element={<ProductsPage />} />
            <Route path="/admin/transaksi" element={<Transaksi />} />
            <Route path="/admin/user" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default SetUpRouters;
