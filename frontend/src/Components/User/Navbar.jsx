import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function ButtonAppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutBtn, setLogoutBtn] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="bg-gray-50">
            <Typography
              className="text-black"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Link to="/">
                PodCast
              </Link>
            </Typography>

            <Search className="hidden md:block border    mr-4 text-black">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <button
              onClick={() => setLogoutBtn(!logoutBtn)}
              className="hidden md:block px-4 py-2 text-lg text-gray-800 hover:bg-gray-100"
            >
              Username
            </button>

            <div className="md:hidden">
              {!isMenuOpen && (
                <IconButton
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      {logoutBtn && (
        <div className="hidden md:block absolute top-15 right-10   ">
          <button className="bg-red-600  rounded block px-4 py-2 text-lg text-gray-100 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-top justify-end z-50 bg-white bg-opacity-70">
          <div className="bg-white pt-10 p-4 rounded-md shadow-md">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
            <Search className="  mr-4 text-black">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <button className="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-100">
              Username
            </button>

            <button className="block px-4 py-2 text-lg text-red-400 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
