import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import PageProduct from "../pages/PageProduct";
import DashboardAppPage from "../pages/admin/DashboardPage";
import Page404 from "../pages/admin/Page404";
import ProductsPage from "../pages/admin/ProductsPage";
import UserPage from "../pages/admin/UserPage";
import Transaksi from "../pages/admin/Transaksi";
import LoginPage from "../pages/LoginPage";

import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";

import { DashboardLayout, ProductLayout } from "../layouts/dashboard";

import Daily from "../pages/admin/Daily";
import Bills from "../pages/admin/Bills";

const SetUpRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page (For User) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/productlist" element={<PageProduct />} />
        {/* Private Route */}
        <Route path="/admin/login" element={<PrivateRoute />} />
        {/* Dashboard Admin */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardAppPage />} />
          <Route path="/admin/*" element={<Page404 />} />
          <Route path="/admin/products" element={<ProductLayout />}>
            <Route path="/admin/products/daily" element={<Daily />} />
            <Route path="/admin/products/bills" element={<Bills />} />
            <Route
              path="/admin/products/entertainment"
              element={<ProductsPage />}
            />
          </Route>
          <Route path="/admin/transaksi" element={<Transaksi />} />
          <Route path="/admin/user" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default SetUpRouters;
