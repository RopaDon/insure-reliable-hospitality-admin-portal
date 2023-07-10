import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",

  initialState: {
    isLoading: false,
  },
  reducers: {
    toggleLoading(state) {
      const value = !state.isLoading  
      state.isLoading = value;
    },
  },
});
export const { toggleLoading } = loadingSlice.actions;
export default loadingSlice;
