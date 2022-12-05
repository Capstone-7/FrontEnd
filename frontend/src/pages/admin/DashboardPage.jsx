import { Helmet } from "react-helmet-async";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from "../../section";

// styles
// import styles from '../../assets/styles/DashboardPage.module.css'
import './DashboardPage.css';

import ProductDashboard from '../../assets/images/Product_dashboard.png'
import TransaksiDashboard from '../../assets/images/Transaction_dashboard.png'
import UserDashboard from '../../assets/images/User_dashboard.png'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCurrentAdmins } from "../../store/features/UserSlice";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentAdmins())
  }, [])

  return (
    <>
      <Helmet>
        <title> Admin | PayOll </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Halo, Selamat Datang Admin
        </Typography>

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Weekly Sales"
              total={714000}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="New Users"
              total={1352831}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid> */}

          <div className="container dashboardPage">
            <div className="row d-flex flex-row justify-content-between content">
              <h3 className='dataStatistik'>Data Statistik <span className="dataStatistikSecond">hari ini</span></h3>
              <div className="col-md-4 dataDashboard ms-3">
                <div className="justify-content-center mx-3 mt-4">
                  <img src={UserDashboard} alt="Total Pengguna" className="DataImage" />
                  <h3 className="DataText">Total Pengguna</h3>
                  <h4 className='secondText'><strong>115</strong> Pengguna</h4>
                </div>
              </div>
              <div className="col-md-4 dataDashboard">
                <div className="justify-content-center mx-3 mt-4">
                  <img src={ProductDashboard} alt="Transaksi Dashboard" className="DataImage" />
                  <h3 className="DataText">Total Produk</h3>
                  <h4 className='secondText'><strong>10</strong> Produk</h4>
                </div>
              </div>
              <div className="col-md-4 dataDashboard">
                <div className="justify-content-center mx-3 mt-4">
                  <img src={TransaksiDashboard} alt="User Dashboard" className="DataImage" />
                  <h3 className="DataText">Total Transaksi</h3>
                  <h4 className='secondText'><strong>2189</strong> Transaksi hari ini</h4>
                </div>
              </div>
            </div>
          </div>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
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
