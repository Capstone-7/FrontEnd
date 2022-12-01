// component
import SvgColor from "../../../components/Admin-Component/svg-color/SvgColor";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/admin",
    icon: icon("ic_analytics"),
  },
  {
    title: "Manage User",
    path: "/admin/user",
    icon: icon("ic_user"),
  },
  {
    title: "Manage Product",
    path: "/admin/products",
    icon: icon("ic_cart"),
  },
  {
    title: "Manage Transaksi",
    path: "/admin/transaksi",
    icon: icon("ic_cart"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: icon("ic_disabled"),
  },
];

export default navConfig;
