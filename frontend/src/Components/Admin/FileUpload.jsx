import React from "react";
import { useState } from "react";

function FileUpload({ setPopupVisible, isPopupVisible }) {
  const [podCastName, setpodCastName] = useState("");
  const [genre, setGenre] = useState("");
  const [audio, setAudio] = useState("");
  const [error, setError] = useState("");

  const onClose = () => {
    setPopupVisible(false);
    setpodCastName("");
    setGenre("");
    setAudio("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleToggleForm = async (e) => {
    e.preventDefault();
  };
  return (
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Genre
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Audio
            </label>
            <input
              type="file"
              accept="audio/*"
              className="w-full p-2 border rounded-lg"
              value={audio}
              onChange={(e) => setAudio(e.target.value)}
              required
            />
          </div>
        </form>
        <div className="flex justify-around">
          <button
            onClick={handleToggleForm}
            className="bg-green-500 hover-bg-gray-400 rounded p-2 mr-2 text-white w-1/2"
          >
            Uplod
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
  );
}

export default FileUpload;
