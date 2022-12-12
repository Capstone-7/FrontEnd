import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} sx={{ marginTop: 5 }} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, isAccordion, info, paths } = item;
  if (isAccordion) {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelia-content"
          id="panelia-header"
          sx={{ padding: 0 }}
        >
          <StyledNavItem
            component={RouterLink}
            to={path}
            sx={{
              "&:hover": {
                color: "text.primary",
              },
              // "&.active": {
              //   color: "text.primary",
              //   bgcolor: "action.selected",
              //   fontWeight: "fontWeightBold",
              // },
            }}
          >
            <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
            <ListItemText disableTypography primary={title} />
          </StyledNavItem>
        </AccordionSummary>
        <AccordionDetails>
          {paths.map((item) => {
            const { title, path, icon, info } = item;
            return (
              <StyledNavItem
                component={RouterLink}
                to={path}
                sx={{
                  "&:hover": {
                    color: "text.primary",
                  },
                  "&.active": {
                    color: "text.primary",
                    bgcolor: "action.selected",
                    fontWeight: "fontWeightBold",
                  },
                }}
              >
                <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

                <ListItemText disableTypography primary={title} />

                {info && info}
              </StyledNavItem>
            );
          })}
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&:hover": {
          color: "text.primary",
        },
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
