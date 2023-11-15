/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../User/Navbar.jsx";
import Uplod from "./Uplod";
import FileUpload from "./FileUpload";
import AudioItem from "./AudioItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Creator() {
  const navigate = useNavigate();
  const [creatorData, setCreatorData] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    // Make an API request to get user data
    fetch(`${backendUrl}/auth/admin`, {
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
        setCreatorData(data.user);
      })
      .catch((error) => {
        navigate("/");
      });
  }, [navigate, backendUrl]);

  if (!creatorData) {
    return null; // Return early if userData is not available
  }

  return (
    <div className="mobile-container">
      <Navbar user={creatorData} />

      <div className="mx-4">
        <h2 className="mx-3">Welcome, {creatorData.username}!</h2>
        <div className="flex">
          <Uplod />
          <FileUpload />
        </div>
        <AudioItem />
      </div>
    </div>
  );
}

export default Creator;
