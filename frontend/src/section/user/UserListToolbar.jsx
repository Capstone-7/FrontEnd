import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  MenuItem,
} from "@mui/material";
// component
import Iconify from "../../components/Admin-Component/iconify/Iconify";

import React, { useState, useEffect } from "react";
import AxiosInstance from "../../configs/axios/AxiosInstance";
import Cookies from "js-cookie";
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({
  id,
  user,
  setUser,
  numSelected,
  filterName,
  onFilterName,
  setSelected,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!true);
  const [token, setToken] = useState(Cookies.get("token"));
  const [currentID, setCurrentID] = useState("");

  const handleDelete = (e) => {
    AxiosInstance.delete(`user/${id}`, {
      headers: { Authorization: `Bearer ` + token },
    }).then((res) => console.log(res));
    const userIndex = user.findIndex((usr) => usr._id === id);
    console.log(userIndex);
    const updateUser = [
      ...user.slice(0, userIndex),
      ...user.slice(userIndex + 1),
    ];
    setUser(updateUser);
    setSelected([])
    // numSelected === 0;
    // setOpen(false);
  };

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Cari Nama..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete" style={{ marginInline: "auto" }}>
          <IconButton onClick={(e) => handleDelete(e, id)}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list" style={{ marginInline: "auto" }}>
          <IconButton>
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
}
