import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Nav = () => {
  const token = useSelector((state) => state?.currentUser?.currentUser?.token);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <h1>
          <Link className="navbar-brand" to="/">
            JC CS
          </Link>
        </h1>
        {/**********
         *  MENU
         * *******/}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {!token && (
                <Link className="nav-link" to="register">
                  Register
                </Link>
              )}
            </li>
            <li className="nav-item">
              {!token && (
                <Link className="nav-link" to="login">
                  Login
                </Link>
              )}
            </li>
            <li className="nav-item">
              {token && (
                <Link className="nav-link" to="logout">
                  Logout
                </Link>
              )}
            </li>
            <li className="nav-item">
              {token && (
                <Link className="nav-link" to="addpost">
                  Add Post
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
