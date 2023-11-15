/* eslint-disable react/prop-types */
// PlaylistModal.js

const PlaylistModal = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 text-black">
      <div className="bg-white p-4 rounded-lg w-1/3">
        <div className="flex items-center justify-between mb-2">
          <p>Playlist 1</p>
          <button className="text-center bg-green-500 text-white px-2 py-1 rounded ml-1">Add</button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p>Playlist 2</p>
          <button className="text-center bg-green-500 text-white px-2 py-1 rounded ml-1">Add</button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p>Playlist 3</p>
          <button className="text-center bg-green-500 text-white px-2 py-1 rounded ml-1">Add</button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p>Playlist 4</p>
          <button className="text-center bg-green-500 text-white px-2 py-1 rounded ml-1">Add</button>
        </div>
        <button className="text-center bg-red-500 text-white px-2 py-1 rounded mt-2" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PlaylistModal;
