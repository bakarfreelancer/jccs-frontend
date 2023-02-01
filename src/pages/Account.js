import React from "react";
import {
  ChatLeftDots,
  JournalCheck,
  PencilSquare,
  People,
} from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { rootUrl } from "../api";
import { ChangePassword } from "../components/ChangePassword";
import { Login } from "../components/Login";
import { Logout } from "../components/Logout";
import userAvatar from "../images/user.png";

export const Account = () => {
  const currentUser = useSelector((state) => state?.currentUser);
  const user = currentUser?.user;
  const token = currentUser?.token;
  const navigate = useNavigate();

  return !token ? (
    <Login />
  ) : (
    <AccountWraper>
      <div className="container">
        {/* Profile Card */}
        <div className="card p-2 my-3 bg-light">
          <div className="row align-items-center">
            <div
              className="col-2 col-md-1 text-center"
              role="button"
              onClick={() => navigate("/update-profile")}>
              <img
                className="rounded-circle userImg"
                src={user?.image ? rootUrl() + user?.image : userAvatar}
                alt={user?.firstName}
              />
            </div>
            <div
              className="col-10  col-md-11"
              role="button"
              onClick={() => navigate("/update-profile")}>
              {user.firstName} {user.lastName}
              <small className="d-block text-warning">
                Click to edit your profile.
              </small>
            </div>
          </div>
        </div>
        {/* Profile Card End */}

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
            <ChangePassword />
          </div>
          <div className="col-6">
            <div
              className="card p-3 text-center align-items-center"
              role="button"
              onClick={() => navigate("/feedback")}>
              <ChatLeftDots size={40} />
              <div>FeedBack</div>
            </div>
          </div>
          <div className="col-6">
            <div
              className="card p-3 text-center align-items-center"
              role="button">
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </AccountWraper>
  );
};
const AccountWraper = styled.div`
  .userImg {
    width: 55px;
    height: 55px;
    object-fit: cover;
  }
`;
