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
        setUserData(data.user);
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
      <div>
        <h2>Welcome, {userData.username}!</h2>
        <p>Email: {userData.email}</p>
        <p>Role: {userData.role}</p>
      </div>
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
