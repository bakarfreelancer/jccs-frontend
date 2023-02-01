import { createSlice } from "@reduxjs/toolkit";

const initialState = { posts: [], page: -1, lastList: false, postsRef: null };

const reducers = {
  getPosts: (state, action) => {
    state.posts = [...state.posts, ...action.payload];
  },
  updatePage: (state) => {
    state.page += 1;
  },
  setLastList: (state, action) => {
    state.lastList = action.payload;
  },
  resetState: (state) => {
    state.posts = [];
    state.page = -1;
    state.lastList = false;
  },
  setPostsRef: (state, action) => {
    state.postsRef = action.payload;
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers,
});

export const { getPosts, updatePage, setLastList, resetState, setPostsRef } =
  postSlice.actions;

export default postSlice.reducer;
