import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies
import "./AppBarStyles.css"; // Import your CSS file

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate(); // For navigating to other routes

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Opens the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Closes the menu
  };

  const handleLogout = () => {
    // Clear the token from localStorage and cookies
    localStorage.removeItem("token"); // Remove token from local storage
    Cookies.remove("token"); // Remove token from cookies

    // Redirect to login page
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="custom-appbar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick} // Open the menu when clicked
            className="menu-icon-button"
          >
            <MenuIcon />
          </IconButton>

          {/* Menu component with multiple menu items */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className="menu-component"
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/">
              Read
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/create">
              Create
            </MenuItem>
            <MenuItem onClick={handleLogout}> {/* Logout functionality */}
              Logout
            </MenuItem>
          </Menu>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="appbar-title"
          >
            CRUD
          </Typography>

          <Link to="/login" className="login-link">
            Login
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
