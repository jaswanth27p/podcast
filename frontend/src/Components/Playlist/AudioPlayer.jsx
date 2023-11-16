/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({
  imgSrc,
  podcastUrl,
  duration,
  handleNext,
  handlePrev,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    // Function to update current time 
    const updateCurrentTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.src = podcastUrl; // Set the new source
      handlePlay(); // Play the new audio
    } else {
      audioRef.current.src = podcastUrl; // Set the new source
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ podcastUrl]);

  return (
    <div className="player-card">
      <img src={imgSrc} alt="Cover Image" className="image" />

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => handleSeek(e.target.value)}
        className="range"
      />

      <audio ref={audioRef} />

      <div className="track-duration">
        <p>{formatDuration(currentTime)}</p>
        <p>{formatDuration(duration)}</p>
      </div>

      <div className="controls">
        <button
          onClick={handlePrev}
          className="control-button"
        >
          <span className="material-icons">skip_previous</span>
        </button>

        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className="playbutton"
        >
          <span className="material-icons">
            {isPlaying ? "pause" : "play_arrow"}
          </span>
        </button>

        <button
          onClick={handleNext}
          className="control-button"
        >
          <span className="material-icons">skip_next</span>
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;

function formatDuration(durationSeconds) {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60);
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
}
