import React, { useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { logoutUrl } from "../api";
import { loggedOut } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { resetState } from "../features/post/postSlice";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.currentUser?.token);
  useEffect(() => {
    const logout = async () => {
      dispatch(loggedOut());
      dispatch(resetState());
      try {
        await axios.post(
          logoutUrl(),
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (e) {}
    };
    navigate("/account");
    if (token) logout();
  }, [dispatch, navigate, token]);

  return <div>Logout</div>;
};
