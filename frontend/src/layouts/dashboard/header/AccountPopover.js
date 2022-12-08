import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../configs/axios/AxiosInstance";
import Cookies from "js-cookie";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
// mocks_
import account from "../../../_mock/account";
import { Auth } from "../../../utils/Auth";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentAdmins } from "../../../store/features/UserSlice";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentAdmins());
  }, [dispatch]);

  const navigate = useNavigate();

  const admin = useSelector((state) => state?.UserSlice?.admin);

  // console.log(admin)
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  // const navigate = useNavigate();
  // const handleLogout = () => {
  //   Auth.signOut();
  //   navigate("/admin/login");
  // };

  // const [token, setToken] = useState(Cookies.get("token"));
  // const [name, setName] = useState();
  // const [email, setEmail] = useState();

  // useEffect(() => {
  //   AxiosInstance.get("user/profile", {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   }).then((res) => {
  //     setName(res.data.data.name);
  //     setEmail(res.data.data.email);
  //   });
  // }, []);

  const handleLogOut = () => {
    Auth.signOut();
    navigate("/admin/login");
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {admin?.data?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {admin?.data?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogOut} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
