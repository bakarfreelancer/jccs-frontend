import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
};
const reducers = {
  loggedIn: (state, action) => {
    console.log(action.payload);
    state.user = action.payload.user;
    state.token = action.payload.token;
  },
  updateUser: (state, action) => {
    state.user = action.payload;
  },
  loggedOut: (state) => {
    state.user = {};
    state.token = "";
  },
};
const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers,
});

export const { loggedIn, loggedOut, updateUser } = userSlice.actions;

export default userSlice.reducer;
