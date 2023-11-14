/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../User/Navbar.jsx";
import Uplod from "./Uplod";
import FileUpload from "./FileUpload";
import AudioItem from "./AudioItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

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
  }, [navigate ,backendUrl]);

  if (!creatorData) {
    return null; // Return early if userData is not available
  }

  // const handleClick = () => {
  //   if (audio !== null) {
  //     const audioRef = ref(storage, `audio/${v4()}`);
  //     uploadBytes(audioRef, audio).then((value) => {
  //       console.log(value);
  //       getDownloadURL(value.ref).then((url) => {
  //         setAudioUrls((data) => [...data, url]);
  //       });
  //     });
  //   }
  // };
  return (
    <div>
      <Navbar user={creatorData} />
      <div>
        <h2>Welcome, {creatorData.username}!</h2>
        <p>Email: {creatorData.email}</p>
        <p>Role: {creatorData.role}</p>
      </div>
      <div className="flex">
      <Uplod />
      <FileUpload />
      </div>
      <AudioItem />
    </div>
  );
}

export default Creator;
