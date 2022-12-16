// component
import SvgColor from "../../../components/Admin-Component/svg-color/SvgColor";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.png`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: icon("ic_analytics"),
  },
  {
    title: "Pengguna",
    path: "/admin/user",
    icon: icon("ic_user"),
  },
  {
    title: "Produk",
    // path: "/admin/products",
    icon: icon("ic_produk"),
    isAccordion: true,
    paths: [
      {
        title: "Daily",
        path: "/admin/products/daily",
        icon: icon("ic_daily"),
      },
      {
        title: "Bills",
        path: "/admin/products/bills",
        icon: icon("ic_bills"),
      },
      {
        title: "Entertainment",
        path: "/admin/products/entertainment",
        icon: icon("ic_entertainment"),
      },
    ],
  },
  {
    title: "Transaksi",
    path: "/admin/transaksi",
    icon: icon("ic_transaksi"),
  },
  // {
  //   title: "Not found",
  //   path: "/admin/404",
  //   icon: icon("ic_disabled"),
  // },
];

export default navConfig;
