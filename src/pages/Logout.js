import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import { useSelector } from "react-redux";
import { logoutUrl } from "../api";

const cookies = new Cookies();
export const Logout = () => {
  const {
    currentUser: { token },
  } = useSelector((state) => state.users);
  const logout = async (token) => {
    cookies.remove("currentUser");
    const res = await axios.post(
      logoutUrl(),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
  };
  logout(token);
  return <div>Logout</div>;
};
