// categoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    trending: [],
    latest: [],
    // Add other category initial states as needed
  },
  reducers: {
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    setLatest: (state, action) => {
      state.latest = action.payload;
    },
    addCategory: (state, action) => {
      // Assuming action.payload is an object representing a new category
      state[action.payload.key] = action.payload.value;
    },
    // Add other category reducers as needed
  },
});

export const { setTrending, setLatest, addCategory } = categoriesSlice.actions;

// Selectors
export const selectCategories = (state) => state.categories;

// Thunk actions
export const fetchTrendingAndLatestAsync = () => async (dispatch) => {
  try {
    // Simulating an API call for trending and latest data
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const trending = await fetch(`${backendUrl}/categories/trending`, {
      method: "GET",
      credentials: "include",
    });
    const latest = await fetch(`${backendUrl}/categories/latest`, {
      method: "GET",
      credentials: "include",
    });
    const Tdata = await trending.json();
    const Ldata = await latest.json();
    dispatch(setTrending( Tdata));
    dispatch(setLatest(Ldata));
  } catch (error) {
    console.error("Error fetching trending and latest data:", error);
  }
};

export const fetchCategoryAsync = (categoryKey) => async (dispatch) => {
  try {
    // Simulating an API call for a specific category
    const backendUrl = import.meta.env.VITE_BACKEND_URL; 
    const response = await fetch(`${backendUrl}/categories/${categoryKey}`, {
      method: "GET",
      credentials: "include",
    });
    const categoryData = await response.json();

    dispatch(addCategory({ key: categoryKey, value: categoryData }));
  } catch (error) {
    console.error(`Error fetching ${categoryKey} category data:`, error);
  }
};

// Action creators
export const useFetchTrendingAndLatest = () => {
  const dispatch = useDispatch();
  return () => dispatch(fetchTrendingAndLatestAsync());
};

export const useFetchCategory = (categoryKey) => {
  const dispatch = useDispatch();
  return () => dispatch(fetchCategoryAsync(categoryKey));
};

export const useCategoriesSelector = () => useSelector(selectCategories);

export default categoriesSlice.reducer;
