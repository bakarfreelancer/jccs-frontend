import React, { useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { logoutUrl } from "../api";
import { loggedOut } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.currentUser?.currentUser?.token);
  useEffect(() => {
    const logout = async () => {
      dispatch(loggedOut());
      await axios.post(
        logoutUrl(),
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };
    navigate("/");
    if (token) logout();
  }, [dispatch, navigate, token]);

  return <div>Logout</div>;
};
