import axios from "axios";
// import { loginUrl } from "../api";

export const loginUser = (data) => (dispatch) => {
  // const loginAttempt = await axios.post(loginUrl(), credentials);
  dispatch({
    type: "FETCH_CURRENT_USER",
    payload: {
      current: data,
    },
  });
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: "LOGOUT_USER",
  });
};
