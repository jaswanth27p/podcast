/* eslint-disable no-unused-vars */
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import PlaylistModal from "./PlaylistModal";
import {
  useFetchCategory,
  useCategoriesSelector,
} from "../../redux/reducers/categories";

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const getAudioDuration = async (podcastUrl) => {
  return new Promise((resolve) => {
    const audio = new Audio(podcastUrl);
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
    });
  });
};

const GenrePlaylists = () => {
  const { genre } = useParams();
  const dispatchFetchCategory = useFetchCategory(genre);
  const categories = useCategoriesSelector();
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    // Fetch the category data when the genre changes
    dispatchFetchCategory();
  }, [genre, dispatchFetchCategory]);

  const playlists = useMemo(
    () => categories[genre]?.data || [],
    [categories, genre]
  );

  const handleLoveClick = (index) => {
    // Dispatch action to update loved status in the Redux store
    // Example: dispatch(updateLovedStatus(playlists[index]._id));
  };

  const handlePlaylistClick = (index) => {
    setCurrentPlaylistIndex(index);
  };

  // Fetch audio duration for each playlist
  useEffect(() => {
    const fetchAudioDurations = async () => {
      const updatedPlaylists = await Promise.all(
        playlists.map(async (playlist) => {
          // Check if the duration is already available
          if (!playlist.duration) {
            const duration = await getAudioDuration(playlist.audio_url);
            return { ...playlist, duration };
          }
          return playlist;
        })
      );

      // Dispatch action to update the Redux store with durations
      // Example: dispatch(updatePlaylistDurations(updatedPlaylists));
    };

    fetchAudioDurations();
  }, [genre, playlists]);

  return (
    <div className="container mx-auto p-3">
      <h2 className="text-2xl font-semibold mb-2">{genre} Podcasts</h2>
      <div className="flex">
        <div className="w-2/3 m-2">
          {playlists.map((playlist, index) => (
            <div
              key={index}
              className={`playlist-item border p-2 mb-2 rounded-lg bg-white transition duration-300 ease-in-out hover:bg-gray-200 flex items-center justify-between`}
              onClick={() => handlePlaylistClick(index)}
            >
              <div className="flex flex-col items-start">
                <div className="">
                  <h6 className="font-semibold text-sm">
                    <span className="mr-2">{index + 1}</span>
                    {playlist.title}
                  </h6>
                </div>
                <p className="text-xs text-gray-600">{playlist.description}</p>
              </div>
              <div className="flex items-center relative">
                <button
                  onClick={() => handleLoveClick(index)}
                  className={`text-gray-500 focus:outline-none ${
                    playlist.loved ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`h-4 w-4 ${
                      playlist.loved ? "text-blue-500" : "text-gray-500"
                    }`}
                  />
                </button>
                <span className="mx-2 text-gray-500 text-xs">
                  {formatDuration(playlist.duration)}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(showDropdown === index ? null : index);
                  }}
                  className={`ml-2 text-gray-500 focus:outline-none ${
                    showDropdown === index ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faEllipsisH} className="h-4 w-4" />
                </button>

                {showDropdown === index && (
                  <div className="absolute top-full left-0 mt-1 z-20">
                    <div
                      id="dropdownDotsHorizontal"
                      className="z-20 bg-white rounded-lg shadow w-32 text-xs"
                    >
                      <button
                        className="block py-2 hover:bg-gray-100 text-center w-32 rounded-lg bg-blue-500 text-white hover:text-black"
                        onClick={() => setShowPlaylist(!showPlaylist)}
                      >
                        Playlist +=
                      </button>
                      {showPlaylist && (
                        <PlaylistModal onClose={() => setShowPlaylist(false)} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-1/3 mt-2 relative z-10">
          <AudioPlayer
            imgSrc={playlists[currentPlaylistIndex]?.image_url}
            podcastUrl={playlists[currentPlaylistIndex]?.audio_url}
            playlists={playlists}
          />
        </div>
      </div>
    </div>
  );
};

export default GenrePlaylists;
