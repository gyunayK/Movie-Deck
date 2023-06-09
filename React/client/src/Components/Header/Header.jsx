import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userNames, setUserNames] = useState("");

  useEffect(() => {
    const checkIfLoggedIn = () => {
      const storedUserNames = JSON.parse(localStorage.getItem("userName"));

      if (storedUserNames) {
        setUserNames(storedUserNames);
        toast.success(`Welcome back ${storedUserNames.firstName}!`);
      }
    };
    checkIfLoggedIn();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    const port = import.meta.env.VITE_PORT;
    const url = `http://localhost:${port}/user/logout`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // check if HTTP response status code is not successful
      const data = await response.json(); // parse the response to JSON
      toast.error(data.message);
      return;
    }

    toast.success("Logged out successfully");
    localStorage.removeItem("userName");
    localStorage.removeItem("user");
    setUserNames("");
    
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {userNames && (
              <MenuItem onClick={handleClose} component={Link} to="/">
                {userNames.firstName} {userNames.lastName}
              </MenuItem>
            )}
            <MenuItem onClick={handleClose} component={Link} to="/">
              Search For a Movie
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={userNames ? "/favorites" : "/login"}
            >
              View Favorites List
            </MenuItem>

            <MenuItem onClick={handleClose} component={Link} to="/about">
              About
            </MenuItem>
          </Menu>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MovieDeck
          </Typography>
          {userNames ? (
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{ fontSize: 16 }}
            >
              Logout
            </Button>
          ) : (
            <Button href="/login" sx={{ fontSize: 16 }} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
