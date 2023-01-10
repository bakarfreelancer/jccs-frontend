import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
};
const reducers = {
  loggedIn: (state, action) => {
    state.currentUser = action.payload;
  },
  loggedOut: (state) => {
    state.currentUser = {};
  },
};
const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers,
});

export const { loggedIn, loggedOut } = userSlice.actions;

export default userSlice.reducer;
