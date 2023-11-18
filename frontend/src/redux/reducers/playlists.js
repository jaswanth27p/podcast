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

// Custom hooks
export const useUserPlaylistsSelector = () => useSelector(selectUserPlaylists);

export const useSetPlaylists = (playlist) => {
  const dispatch = useDispatch();
  return () => dispatch(setUserPlaylists(playlist));
};

export const useClearUserPlaylists = () => {
  const dispatch = useDispatch();
  return () => dispatch(clearUserPlaylists());
};

export default playlistSlice.reducer;