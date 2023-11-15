/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {
  useFetchCategory,
  useCategoriesSelector,
} from "../../redux/reducers/categories";

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const GenrePlaylists = () => {
  const { genre } = useParams();
  const dispatchFetchCategory = useFetchCategory(genre);
  const categories = useCategoriesSelector();
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  useEffect(() => {
    // Fetch the category data when the genre changes
    dispatchFetchCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ]);

  const playlists = categories[genre]?.data || [];
  const handleLoveClick = (index) => {
    // Dispatch action to update loved status in the Redux store
    // Example: dispatch(updateLovedStatus(playlists[index]._id));
  };
  const handleNext = () => {
    setCurrentPlaylistIndex((prevIndex) => (prevIndex + 1) % playlists.length);
  };

  const handlePrev = () => {
    setCurrentPlaylistIndex((prevIndex) =>
      prevIndex === 0 ? playlists.length - 1 : prevIndex - 1
    );
  };
  const handlePlaylistClick = (index) => {
    setCurrentPlaylistIndex(index);
  };

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
              </div>
            </div>
          ))}
        </div>

        <div className="w-1/3 mt-2 relative z-10">
          <AudioPlayer
            imgSrc={playlists[currentPlaylistIndex]?.image_url}
            podcastUrl={playlists[currentPlaylistIndex]?.audio_url}
            duration={playlists[currentPlaylistIndex]?.duration}
            playlists={playlists}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
      </div>
    </div>
  );
};
export default GenrePlaylists;
