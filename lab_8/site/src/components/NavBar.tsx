import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: "1px solid",
  borderColor: theme.palette.divider,
  padding: "8px 12px",
}));

interface ComponentProps {
  active: string;
}

function NavBar({ active }: ComponentProps) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Function to determine button variant based on active prop
  const getButtonVariant = (buttonNumber: string) => {
    return active === buttonNumber ? "contained" : "text";
  };

  // Function to determine menu item style based on active prop
  const getMenuItemStyle = (buttonNumber: string) => ({
    backgroundColor:
      active === buttonNumber ? "rgba(93, 138, 168, 0.1)" : "inherit",
    "&:hover": {
      backgroundColor: "rgba(93, 138, 168, 0.2)",
    },
  });

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        mt: "28px",
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar>
          <Typography
            variant="h6"
            sx={{ color: "#5d8aa8", fontSize: 25, fontWeight: "bold" }}
          >
            Дистрибутивы Linux 🐧
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/">
              <Button
                variant={getButtonVariant("1")}
                color="info"
                size="medium"
              >
                Главная
              </Button>
            </Link>
            <Link to="/list">
              <Button
                variant={getButtonVariant("2")}
                color="info"
                size="medium"
              >
                Список дистрибутивов
              </Button>
            </Link>

            <Link to="/chart">
              <Button
                variant={getButtonVariant("3")}
                color="info"
                size="medium"
              >
                Диаграммы
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Link to="/">
                  <MenuItem sx={getMenuItemStyle("1")}>Главная</MenuItem>
                </Link>

                <Link to="/list">
                  <MenuItem sx={getMenuItemStyle("2")}>Список зданий</MenuItem>
                </Link>
                <MenuItem sx={getMenuItemStyle("3")}>Диаграммы</MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
