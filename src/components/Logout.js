import React from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { logoutUrl } from "../api";
import { loggedOut } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { resetState } from "../features/post/postSlice";
import { BoxArrowRight } from "react-bootstrap-icons";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.currentUser?.token);

  function logoutUser() {
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
  }

  return (
    <div type="button" data-bs-toggle="modal" data-bs-target="#logoutModal">
      <div className="text-center text-danger">
        <BoxArrowRight size={40} />
        <div>Logout</div>
      </div>

      {/* Logout Modal */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="logoutModalLabel">
                Logout?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">Do you really want to logout?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-accent"
                onClick={logoutUser}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
