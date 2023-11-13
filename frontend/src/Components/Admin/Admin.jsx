import React from "react";
import Navbar from "./Navbar";
import Uplod from "./Uplod";
import FileUpload from "./FileUpload";
import Genre from "./Genre";
import AudioItem from "./AudioItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Creator() {
  const navigate = useNavigate();
  const [creatorData, setCreatorData] = useState(null);

  useEffect(() => {
    // Make an API request to get user data
    fetch("https://podcast-3cku.onrender.com/auth/admin", {
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
  }, [navigate]);

  if (!creatorData) {
    return null; // Return early if userData is not available
  }
  return (
    <div>
      <Navbar />
      <div>
        <h2>Welcome, {creatorData.username}!</h2>
        <p>Email: {creatorData.email}</p>
        <p>Role: {creatorData.role}</p>
      </div>

      <div className="flex">
      <Uplod />
      <FileUpload />
      <Genre />
      </div>

      <AudioItem />
    </div>
  );
}

export default Creator;
