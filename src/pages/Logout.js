import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { logoutUrl } from "../api";

export const Logout = () => {
  const {
    currentUser: { token },
  } = useSelector((state) => state.users);
  const logout = async (token) => {
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
