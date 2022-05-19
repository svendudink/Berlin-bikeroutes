import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { NavBarContext } from "../ContextProvider/NavBarContext";
import { UserInfoContext } from "../ContextProvider/UserInfoContext";
import { NavBarContextProvider } from "../ContextProvider/NavBarContext";
import { UserInfoContextProvider } from "../ContextProvider/UserInfoContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/getToken.js";

const pages = ["Main page", "routes", "Faq", "tours"];

const NavBar = (props) => {
  const { user, setUser } = useContext(UserInfoContext);

  let settings = user
    ? ["Profile", "Account", "Dashboard", "Logout"]
    : ["New User", "Login"];

  const checkIfUserIsLoggedIn = () => {
    const token = getToken();
    if (token) {
      console.log("logged in");
      setUser(true);
    } else {
      console.log("not logged");
      setUser(false);
    }
  };
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, [user]);

  const { setMenuClickedItemContext } = useContext(NavBarContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    checkIfUserIsLoggedIn();
    setAnchorElUser(event.currentTarget);
    console.log();
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
    setMenuClickedItemContext(event.target.textContent);
    myRouter(event.target.textContent);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    myRouter(event.target.textContent);
    console.log("closeorboth");
  };

  // should go to router page

  // Menu items
  const myRouter = (event) => {
    console.log(event);
    if (event === "Main page") {
      navigate("/");
    }
    if (event === "routes") {
      navigate("/routes");
    }
    if (event === "faq") {
      navigate("/faq");
    }
    // if (event === "") {
    //   navigate("/tours");
    // }
    //nav menu if statements
    if (event === "New User") {
      navigate("/signup");
    }
    if (event === "profile") {
      navigate("/profile");
    }
    if (event === "Account") {
      navigate("/account");
    }
    if (event === "Dashboard") {
      navigate("/dashboard");
    }
    if (event === "Logout") {
      alert("You have succesfully logged out");
      setUser(false);
      localStorage.removeItem("token");
    }
    if (event === "Login") {
      navigate("/login");
    }
  };

  return (
    <NavBarContextProvider>
      <UserInfoContextProvider>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                DESKTOP
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                MOBILE
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page, i) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </UserInfoContextProvider>
    </NavBarContextProvider>
  );
};
export default NavBar;
