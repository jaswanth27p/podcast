/* eslint-disable no-unused-vars */
import Favourite from "./Favourite";
import Navbar from "./Navbar";
import Genres from "./genres";
import Popular from "./Popular";
import Latest from "./Latest";
import Fotter from "../Home/Fotter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    // Make an API request to get user data
    fetch(`${backendUrl}/auth/user`, {
      method: "GET",
      credentials: "include",
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
      })
      .catch((error) => {
        navigate("/");
      });
  }, [navigate ,backendUrl]);

  if (!userData) {
    return null; // Return early if userData is not available
  }
  return (
    <>
      <Navbar />
      <div>
        <h2>Welcome, {userData.username}!</h2>
        <p>Email: {userData.email}</p>
        <p>Role: {userData.role}</p>
      </div>
      <Popular />
      <Favourite />
      <Latest />
      <Genres />
      <Fotter />
    </>
  );
};

export default User;
