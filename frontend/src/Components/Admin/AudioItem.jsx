import { useState, useEffect } from "react";
import { storage } from "../../firebase.js";
import { ref, deleteObject} from "firebase/storage";

function AudioItem() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${backendUrl}/podcasts`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, []);

  const handleDelete = async (podcastId, audioUrl) => {
    try {
      // Delete the file from Firebase Storage
      const storageRef = ref(storage, audioUrl);
      await deleteObject(storageRef);

      // Send a request to delete the podcast by ID
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/podcasts/${podcastId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Remove the deleted podcast from the state
        setPodcasts((prevPodcasts) =>
          prevPodcasts.filter((podcast) => podcast._id !== podcastId)
        );
      } else {
        console.error("Failed to delete podcast");
      }
    } catch (error) {
      console.error("Error deleting podcast:", error);
    }
  };

  return (
    <div>
      {podcasts.map((podcast) => (
        <div key={podcast._id} className="flex items-center mb-4">
          <audio controls src={podcast.audio_url}></audio>
          <button
            onClick={() => handleDelete(podcast._id, podcast.audio_url)}
            className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 m-2"
            type="button"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AudioItem;
