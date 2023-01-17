import React from "react";
import {
  BoxArrowRight,
  ChatLeftDots,
  EyeSlash,
  JournalCheck,
  PencilSquare,
  People,
} from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rootUrl } from "../api";
import { Login } from "../components/Login";
import userAvatar from "../images/user.png";

export const Account = () => {
  const currentUser = useSelector((state) => state?.currentUser);
  const user = currentUser?.user;
  const token = currentUser?.token;
  const navigate = useNavigate();

  return !token ? (
    <Login />
  ) : (
    <div className="container">
      {/* Profile and Logout Start */}

      <div className="card p-2 my-3 bg-light">
        <div className="row align-items-center">
          <div
            className="col-2 col-md-1"
            role="button"
            onClick={() => navigate("/update-profile")}>
            <img
              className="w-100 rounded-circle"
              src={user?.image ? rootUrl() + user?.image : userAvatar}
              alt={user?.firstName}
            />
          </div>
          <div
            className="col-7 col-md-9"
            role="button"
            onClick={() => navigate("/update-profile")}>
            {user.firstName} {user.lastName}
            <small className="d-block text-warning">
              Click to edit your profile.
            </small>
          </div>
          <div
            className="col-3 col-md-2"
            role="button"
            onClick={() => navigate("/logout")}>
            <div className="text-center">
              <BoxArrowRight size={24} className="me-2 text-danger" />
              <small className="d-block text-danger">Logout</small>
            </div>
          </div>
        </div>
      </div>
      {/* Profile and Logout End */}
      <div className="row g-4">
        <div className="col-6">
          <div
            className="card p-3 text-center align-items-center text-primary"
            role="button"
            onClick={() => navigate("/my-posts")}>
            <JournalCheck size={40} />
            <div>Published</div>
          </div>
        </div>
        <div className="col-6">
          <div
            className="card p-3 text-center align-items-center text-secondary"
            role="button"
            onClick={() => navigate("/my-drafts")}>
            <PencilSquare size={40} />
            <div>Drafts</div>
          </div>
        </div>
        <div className="col-6">
          <div
            className="card p-3 text-center align-items-center text-success"
            role="button"
            onClick={() => navigate("/community")}>
            <People size={40} />
            <div>Community</div>
          </div>
        </div>
        <div className="col-6">
          <div
            className="card p-3 text-center align-items-center text-warning"
            role="button"
            onClick={() => navigate("/my-drafts")}>
            <EyeSlash size={40} />
            <div>Change Password</div>
          </div>
        </div>
        <div className="col-6">
          <div
            className="card p-3 text-center align-items-center"
            role="button"
            onClick={() => navigate("/my-drafts")}>
            <ChatLeftDots size={40} />
            <div>FeedBack</div>
          </div>
        </div>
      </div>
    </div>
  );
};
