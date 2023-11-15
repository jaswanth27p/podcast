/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ imgSrc, podcastUrl, playlists }) => {
  const audioFiles = playlists.map((playlist) => playlist.podcastUrl);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pausedTime, setPausedTime] = useState(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackImageUrl, setTrackImageUrl] = useState(imgSrc);

  const audioRef = useRef(null);

  const handlePlay = () => {
    if (pausedTime == null) {
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
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleNext = () => {
    setPausedTime(null); // Reset paused time
    setTrackIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  const handlePrev = () => {
    setPausedTime(null); // Reset paused time
    setTrackIndex((prevIndex) =>
      prevIndex === 0 ? audioFiles.length - 1 : prevIndex - 1
    );
  };

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

useEffect(() => {
  const handleAudioLoad = () => {
    // This event is triggered when the metadata has been loaded
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  audioRef.current.addEventListener("loadedmetadata", handleAudioLoad);

  // Set the track image URL and audio source
  if (trackImageUrl === null) {
    setTrackImageUrl(playlists[trackIndex]?.imageUrl);
    audioRef.current.src = audioFiles[trackIndex];
  } else {
    setTrackImageUrl(imgSrc);
    audioRef.current.src = podcastUrl;
  }

  return () => {
    audioRef.current.removeEventListener("loadedmetadata", handleAudioLoad);
  };
}, [audioFiles, imgSrc, isPlaying, playlists, podcastUrl, trackImageUrl, trackIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="player-card">
      <img src={trackImageUrl} alt="Cover Image" className="image" />

      <input
        type="range"
        min="0"
        max={duration || 0} // Ensure a valid number for max
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
