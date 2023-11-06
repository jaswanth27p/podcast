/* eslint-disable no-unused-vars */
import Favourite from "./Favourite";
import Navbar from "./Navbar";
import Genres from "./genres";
import Popular from "./Popular";
import Latest from "./Latest";
import Fotter from "../Home/Fotter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';

const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // const token = Cookies.get('token');
    // console.log(token)
    const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage
    if (!token) {
      navigate("/");
      return; // Return early to avoid making unnecessary requests
    }
    // Make an API request to get user data
    fetch("http://localhost:3000/api/user-data", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          navigate("/");
          return null; // Return early to avoid further processing
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.user);

        if (data.user.role !== "user") {
          navigate("/");
        }
      })
      .catch((error) => {
        navigate("/");
      });
  }, [navigate]);

  if (!userData) {
    return null; // Return early if userData is not available
  }
  return (
    <>
      <Navbar />
      <Popular />
      <Favourite />
      <Latest />
      <Genres />
      <Fotter />
    </>
  );
};

export default User;
