import React from "react";

const PodcastItem = ({
  slNo,
  img,
  title,
  description,
  audioUrl,
  podcastId,
  handleDelete,
}) => {
  return (
    <div
      key={podcastId}
      className="flex flex-col items-center mb-2 border-gray-300 border mx-3 rounded-lg hover:bg-gray-200 px-1 py-2 md:flex-row"
    >
      <div className="text-sm mb-2 md:mb-0 md:ml-2">{slNo}</div>
      <div className="ml-2 md:ml-3">
        <img src={img} alt="image" className="h-11 w-11 rounded" />
      </div>
      <div className="mt-2 md:mt-0 md:ml-3">
        <div className="font-semibold text-md">{title}</div>
        <div className="text-gray-500 text-sm">{description}</div>
      </div>
      <div className="mt-2 md:mt-0 md:ml-auto md:flex items-center">
        <audio controls src={audioUrl} className="h-11"></audio>
        <button
          onClick={() => handleDelete(podcastId, audioUrl)}
          className="block text-white bg-gray-600 hover:bg-red-500 rounded-lg text-sm px-3 py-3 ml-2 focus:outline-none"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PodcastItem;
