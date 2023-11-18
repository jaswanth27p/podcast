/* eslint-disable no-unused-vars */
// playlistSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const playlistSlice = createSlice({
  name: "playlists",
  initialState: {},
  reducers: {
    setUserPlaylists: (state, action) => {
      state = action.payload;
    },
    clearUserPlaylists: (state) => {
      state = {};
    },
  },
});

export const { setUserPlaylists, clearUserPlaylists } = playlistSlice.actions;

// Selectors
export const selectUserPlaylists = (state) => state.playlists;

// Thunk actions
export const fetchUserPlaylistsAsync = () => async (dispatch) => {
  try {
    // Simulating an API call to fetch user playlists
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(
      `${backendUrl}/playlists/`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const playlistsData = await response.json();

    dispatch(setUserPlaylists(playlistsData));
  } catch (error) {
    console.error("Error fetching user playlists:", error);
  }
};

// Custom hooks
export const useUserPlaylistsSelector = () => useSelector(selectUserPlaylists);

export const useFetchUserPlaylists = () => {
  const dispatch = useDispatch();
  return () => dispatch(fetchUserPlaylistsAsync());
};

export const useClearUserPlaylists = () => {
  const dispatch = useDispatch();
  return () => dispatch(clearUserPlaylists());
};

export default playlistSlice.reducer;