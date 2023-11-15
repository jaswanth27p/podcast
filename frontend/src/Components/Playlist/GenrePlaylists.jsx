import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Audio1 from "./Audio/Audio1.mp3";
import Audio2 from "./Audio/Audio2.mp3";
import Audio3 from "./Audio/Audio3.mp3";
import PlaylistModal from "./PlaylistModal";

const mockPlaylists = [
  {
    name: "Playlist one",
    description: "Description of Playlist one",
    podcastUrl: Audio1,
    imageUrl:
      "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-4.jpg",
  },
  {
    name: "Playlist two",
    description: "Description of Playlist two",
    podcastUrl: Audio2,
    imageUrl:
      "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-2.jpg",
  },
  {
    name: "Playlist three",
    description: "Description of Playlist three",
    podcastUrl: Audio3,
    imageUrl:
      "https://i.pinimg.com/736x/24/e1/1e/24e11e8df73186b41088e48f8342e994.jpg",
  },
  // Add more mock playlists here
];

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Function to get audio duration from the podcast URL
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
  const [playlists, setPlaylists] = useState(mockPlaylists);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [currentpodcastUrl, setcurrentPodcastUrl] = useState(0);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const handleLoveClick = (index) => {
    const updatedPlaylists = [...playlists];
    updatedPlaylists[index].loved = !updatedPlaylists[index].loved;
    setPlaylists(updatedPlaylists);
  };

  const handlePlaylistClick = (index) => {
    setCurrentPlaylistIndex(index);
    setcurrentPodcastUrl(index);
  };

  useEffect(() => {
    // Simulate fetching playlists based on the selected genre
    // Replace this with your actual API call to fetch playlists
    setPlaylists(mockPlaylists);

    // Fetch audio duration for each playlist
    const fetchAudioDurations = async () => {
      const updatedPlaylists = await Promise.all(
        playlists.map(async (playlist) => {
          const duration = await getAudioDuration(playlist.podcastUrl);
          return { ...playlist, duration };
        })
      );
      setPlaylists(updatedPlaylists);
    };

    fetchAudioDurations();
  }, [genre]);

  // Get the audio URLs, image URLs, and list of playlists
  const audioUrls = playlists.map((playlist) => playlist.podcastUrl);
  const imageUrls = playlists.map((playlist) => playlist.imageUrl);
  const playlistNames = playlists.map((playlist) => playlist.name);

  console.log("Audio URLs:", audioUrls);
  console.log("Image URLs:", imageUrls);
  console.log("Playlist Names:", playlistNames);

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
                    {playlist.name}
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
            imgSrc={playlists[currentPlaylistIndex]?.imageUrl}
            podcastUrl={playlists[currentpodcastUrl]?.podcastUrl}
            playlists={playlists}
          />
        </div>
      </div>
    </div>
  );
};

export default GenrePlaylists;
