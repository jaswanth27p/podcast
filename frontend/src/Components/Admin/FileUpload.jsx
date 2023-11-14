/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase.js";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function FileUpload({ setPopupVisible, isPopupVisible }) {
  const [podCastName, setpodCastName] = useState("");
  const [Discription, setDiscription] = useState("");
  const [audio, setAudio] = useState("");
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onClose = () => {
    setPopupVisible(false);
    setpodCastName("");
    setDiscription("");
    setAudio("");
    setError("");
  };

  const handleUpload = async () => {
    // Validate inputs
    if (!podCastName || !Discription|| !audio) {
      setError("Please fill in all fields.");
      return;
    }

    // Your upload logic here
    try {
      setLoading(true);
      const storageRef = ref(storage, `podcasts/${uuidv4()}`);
      const snapshot = await uploadBytes(storageRef, audio);
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      // Get the download URL
      const audioUrl = await getDownloadURL(snapshot.ref);

      // Send data to backend
      const response = await fetch(`${backendUrl}/podcasts`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: podCastName,
          description: Discription,
          audio_url: audioUrl,
        }),
      });

      if (response.ok) {
        onClose();
        // Handle success, e.g., navigate to another page
        window.location.reload();
      } else {
        // Handle error from backend
        const data = await response.json();
        setError(data.message || "An error occurred during upload.");
      }
      setLoading(false);
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred during upload. Please try again.");
    }
  };

  return (
    <>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={Loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      <div
        className={`fixed bg-gray-300 bg-opacity-70 inset-0 flex items-center justify-center z-50 ${
          isPopupVisible ? "" : "hidden"
        }`}
      >
        <div className="bg-white p-4 rounded-lg w-1/3">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Fill the below details to upload
          </h2>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Podcast Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={podCastName}
              onChange={(e) => setpodCastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Discription
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={Discription}
              onChange={(e) => setDiscription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Audio
            </label>
            <input
              type="file"
              accept="audio/*"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setAudio(e.target.files[0])}
              required
            />
          </div>
          <div className="flex justify-around mt-4">
            <button
              onClick={handleUpload}
              className="bg-green-500 hover-bg-gray-400 rounded p-2 text-white w-1/2"
            >
              Upload
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 hover-bg-gray-400 rounded p-2 w-1/2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FileUpload;
