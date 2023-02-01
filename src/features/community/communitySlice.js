import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  community: [],
  page: -1,
  lastPage: false,
};

const reducers = {
  setCommunity: (state, action) => {
    state.community = [...state.community, ...action.payload];
  },
  updatePage: (state) => {
    state.page += 1;
  },
  setLastPage: (state, action) => {
    state.lastPage = action.payload;
  },
  resetCommunityState: (state) => {
    state.community = [];
    state.page = -1;
    state.lastPage = false;
  },
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers,
});

export const { setCommunity, updatePage, setLastPage, resetCommunityState } =
  communitySlice.actions;
export default communitySlice.reducer;
