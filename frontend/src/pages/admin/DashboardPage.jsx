import { Helmet } from "react-helmet-async";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";

import React, { useState, useEffect } from "react";
import AxiosInstance from "../../configs/axios/AxiosInstance";
import Cookies from "js-cookie";
// components
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from "../../section";

// styles
// import styles from '../../assets/styles/DashboardPage.module.css'
import "./DashboardPage.css";

import ProductDashboard from "../../assets/images/Product_dashboard.png";
import TransaksiDashboard from "../../assets/images/Transaction_dashboard.png";
import UserDashboard from "../../assets/images/User_dashboard.png";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAdmins } from "../../store/features/UserSlice";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [token, setToken] = useState(Cookies.get("token"));
  const [user, setUser] = useState(0);
  const [product, setProduct] = useState(0);
  const [transaksi, setTransaksi] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentAdmins());
  }, []);

  const admin = useSelector((state) => state?.UserSlice?.admin);
  const [pieChart, setPieChart] = useState(0);

  useEffect(() => {
    AxiosInstance.get("user/count", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => setUser(res.data.data));
  }, []);

  useEffect(() => {
    AxiosInstance.get("transaction/count", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => setTransaksi(res.data.data));
  }, []);

  useEffect(() => {
    AxiosInstance.get("product/count", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => setProduct(res.data.data));
  }, []);

  useEffect(() => {
    AxiosInstance.get("transaction/topbycategory", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => setPieChart(res.data.data));
  }, []);

  return (
    <>
      <Helmet>
        <title> Admin | PayOll </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Halo, Selamat Datang {admin?.data?.name}
        </Typography>

        <Grid container spacing={3}>
          <div className="container dashboardPage">
            <div className="row d-flex flex-row justify-content-between content">
              <h3 className="dataStatistik">
                Data Statistik{" "}
                <span className="dataStatistikSecond">hari ini</span>
              </h3>
              <div className="col-md-4 dataDashboard ms-3">
                <div className="justify-content-center mx-3 mt-4">
                  <img
                    src={UserDashboard}
                    alt="Total Pengguna"
                    className="DataImage"
                  />
                  <h3 className="DataText">Total Pengguna</h3>
                  {/* <p onClick={() => AmbilPengguna()}>Ambil Pengguna</p> */}
                  <h4 className="secondText">
                    <strong>{user}</strong> Pengguna
                  </h4>
                </div>
              </div>
              <div className="col-md-4 dataDashboard">
                <div className="justify-content-center mx-3 mt-4">
                  <img
                    src={ProductDashboard}
                    alt="Transaksi Dashboard"
                    className="DataImage"
                  />
                  <h3 className="DataText">Total Produk</h3>
                  {/* <p onClick={() => AmbilBarang()}>Ambil Pengguna</p> */}
                  <h4 className="secondText">
                    <strong>{product}</strong> Produk
                  </h4>
                </div>
              </div>
              <div className="col-md-4 dataDashboard">
                <div className="justify-content-center mx-3 mt-4">
                  <img
                    src={TransaksiDashboard}
                    alt="User Dashboard"
                    className="DataImage"
                  />
                  <h3 className="DataText">Total Transaksi</h3>
                  <h4 className="secondText">
                    <strong>{transaksi}</strong> Transaksi hari ini
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Data Statistik"
              subheader="Total Pemasukan"
              chartLabels={[
                "01/01/2022",
                "02/01/2022",
                "03/01/2022",
                "04/01/2022",
                "05/01/2022",
                "06/01/2022",
                "07/01/2022",
                "08/01/2022",
                "09/01/2022",
                "10/01/2022",
                "11/01/2022",
              ]}
              chartData={[
                {
                  name: "Pulsa",
                  type: "column",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: "PLN",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: "PDAM",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: "Pulsa", value: 4344 },
                { label: "Paket Data", value: 5435 },
                { label: "Wifi", value: 1443 },
                { label: "Top Up", value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
