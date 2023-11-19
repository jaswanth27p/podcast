/* eslint-disable react/prop-types */
// PlaylistModal.js
import { usePlaylistsSelector } from "../../redux/reducers/playlists";

const PlaylistModal = ({ podcastId, onClose }) => {
  const playlists = usePlaylistsSelector();

  // Check if playlists is an array before using map
  if (!Array.isArray(playlists)) {
    return null; // or handle the case when playlists is not an array
  }

  const handleAddToPlaylist = async (playlistId) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/playlists/${playlistId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ podcastId: podcastId   }),
      });

      if (response.ok) {
        // Handle success, e.g., close the modal
        onClose();
        alert("Added")
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error adding to playlist:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-10 text-black">
      <div className="bg-white p-4 rounded-lg w-1/3">
        {playlists.map((playlist) => (
          <div
            key={playlist._id}
            className="flex items-center justify-between mb-2"
          >
            <p>{playlist.name}</p>
            <button
              className="text-center bg-green-500 text-white px-2 py-1 rounded ml-1"
              onClick={() => handleAddToPlaylist(playlist._id)}
            >
              Add
            </button>
          </div>
        ))}
        <button
          className="text-center bg-red-500 text-white px-2 py-1 rounded mt-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PlaylistModal;
