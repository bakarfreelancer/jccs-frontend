import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  allUsers: [],
};
const reducers = {
  userActReducer: (state, action) => {
    switch (action.type) {
      case "FETCH_CURRENT_USER":
        return {
          ...state,
          currentUser: action.payload.current,
        };
      case "FETCH_USERS":
        return { ...state };
      case "LOGOUT_USER":
        return {
          ...state,
          currentUser: {},
        };
      default:
        return {
          ...state,
        };
    }
  },
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers,
});

// const sliceInitial = {
//   user: {},
//   isLoggedIn: false,
// };
// const userSlice1 = createSlice({
//   name: "userSlice",
//   initialState: sliceInitial,
//   reducers: {
//     signIn: (state, action) => {
//       state.user = { ...state.user, ...action.payload };
//       state.isLoggedIn = true;
//     },
//   },
// });
// export const { signIn } = userSlice.actions;
// console.log(userSlice.reducer);
export const { userActReducer } = userSlice.actions;
export default userSlice.reducer;
// export default usersReducer;
