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
  const [pausedTime, setPausedTime] = useState(null);

  const audioRef = useRef(null);

  const handlePlay = () => {
    console.log(pausedTime)
    if (pausedTime ==null) {
      audioRef.current.play();
    } else {
      audioRef.current.currentTime = pausedTime;
      setPausedTime(null);  
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    setPausedTime(audioRef.current.currentTime);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
    setPausedTime(e.target.value);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const handleAudioLoad = () => {
      if (isPlaying) {
        audioRef.current.play();
      }
    };
    audioRef.current.addEventListener("loadedmetadata", handleAudioLoad);
    audioRef.current.src = podcastUrl;
    return () => {
      audioRef.current.removeEventListener("loadedmetadata", handleAudioLoad);
    };
  }, [podcastUrl, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const updateCurrentTime = () => {
      if (isPlaying) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className="player-card">
      <img src={imgSrc} alt="Cover Image" className="image" />

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        className="range"
      />

      <audio ref={audioRef} />

      <div className="track-duration">
        <p>{formatDuration(currentTime)}</p>
        <p>{formatDuration(duration)}</p>
      </div>

      <div className="controls">
        <button onClick={handlePrev} className="control-button">
          <span className="material-icons">skip_previous</span>
        </button>

        <button onClick={handlePlayPause} className="playbutton">
          <span className="material-icons">
            {isPlaying ? "pause" : "play_arrow"}
          </span>
        </button>

        <button onClick={handleNext} className="control-button">
          <span className="material-icons">skip_next</span>
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
