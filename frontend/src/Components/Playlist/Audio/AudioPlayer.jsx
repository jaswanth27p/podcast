/* eslint-disable react/prop-types */
import   { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ imgSrc, podcastUrl, playlists }) => {
  // Create an array of audio files
  const audioFiles = playlists.map((playlist) => playlist.podcastUrl);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pausedTime, setPausedTime] = useState(null);
  //Add trackIndex state to keep track of the current track
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

  // Add handleNext and handlePrev functions
  const handleNext = () => {
    setTrackIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
    setTrackImageUrl(null);
    audioRef.current.src = audioFiles[trackIndex]; // Use trackIndex directly
  };

  const handlePrev = () => {
    setTrackIndex((prevIndex) =>
      prevIndex === 0 ? audioFiles.length - 1 : prevIndex - 1
    );
    setTrackImageUrl(null);
    audioRef.current.src = audioFiles[trackIndex]; // Use trackIndex directly
  };

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    if(trackImageUrl === null)
    {
      setTrackImageUrl(playlists[trackIndex]?.imageUrl); // Use trackIndex directly
      audioRef.current.src = audioFiles[trackIndex];
    }else{
      setTrackImageUrl(imgSrc);
      audioRef.current.src = podcastUrl;
    }

    if (isPlaying) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [trackIndex, isPlaying, podcastUrl, imgSrc]);

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
        max={duration}
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
