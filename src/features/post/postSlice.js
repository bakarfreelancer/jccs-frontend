import { createSlice } from "@reduxjs/toolkit";

const initialState = { posts: [] };

const reducers = {
  getPosts: (state, action) => {
    // console.log("payload", action.payload);
    state.posts = [...state.posts, ...action.payload];
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers,
});

export const { getPosts, publicPosts } = postSlice.actions;

export default postSlice.reducer;
