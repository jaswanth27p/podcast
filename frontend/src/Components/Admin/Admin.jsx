/* eslint-disable no-unused-vars */
import {   useState } from "react";
import { storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [audio, setAudio] = useState(null);
  const [audioUrls, setAudioUrls] = useState([]);
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

        if (data.user.role !== "admin") {
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

  const handleClick = () => {
    if (audio !== null) {
      const audioRef = ref(storage, `audio/${v4()}`);
      uploadBytes(audioRef, audio).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setAudioUrls((data) => [...data, url]);
        });
      });
    }
  };

  return (
    <div className="App">
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudio(e.target.files[0])}
      />
      <button onClick={handleClick}>Upload Audio</button>
      <br />
      {audioUrls.map((audioUrl, index) => (
        <div key={index}>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <br />
        </div>
      ))}
    </div>
  );
}
export default Admin;
