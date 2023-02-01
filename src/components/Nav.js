import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { House, PencilSquare, People, Person } from "react-bootstrap-icons";
import styled from "styled-components";

const Nav = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const token = useSelector((state) => state?.currentUser?.token);
  const postsRef = useSelector((state) => state.posts.postsRef);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  // *Run this function when navigation icons are clicked
  const handleClick = (path) => {
    // *IF true then naviaget to selected page
    // *Else scroll to top of page
    if (path !== pathname) navigate(path);
    else {
      // * IF true then scroll is for home page posts components
      // * Else scroll for entire window
      if (path === "/") {
        postsRef.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  //* To show community component is side bar on large screen and hide on mobile
  window.addEventListener("resize", () => setScreenSize(window.innerWidth));
  return (
    <Navigation className="navbar fixed-bottom navbar-expand-lg bg-body-tertiary bg-light p-1 border-top">
      <ul className="container col-12 col-md-6 list-unstyled d-flex justify-content-between my-0">
        <li className="nav-item px-2">
          <div
            onClick={() => handleClick("/")}
            className={
              pathname === "/"
                ? "nav-link text-center current"
                : "nav-link text-center"
            }>
            <House size={22} />
            <p>Home</p>
          </div>
        </li>
        {token && screenSize < 768 && (
          <li className="nav-item">
            <div
              onClick={() => handleClick("/community")}
              className={
                pathname.startsWith("/community")
                  ? "text-center current nav-link"
                  : "nav-link text-center"
              }>
              <People size={22} />
              <p>Community</p>
            </div>
          </li>
        )}
        {token && (
          <li className="nav-item">
            <div
              onClick={() => handleClick("/addpost")}
              className={
                pathname.startsWith("/addpost")
                  ? "text-center current nav-link"
                  : "nav-link text-center"
              }>
              <PencilSquare size={22} />
              <p>Add Post</p>
            </div>
          </li>
        )}

        <li className="nav-item">
          <div
            onClick={() => handleClick("/account")}
            className={
              pathname.startsWith("/account")
                ? "text-center current nav-link"
                : "nav-link text-center"
            }>
            <Person size={22} />
            <p>Account</p>
          </div>
        </li>
      </ul>
    </Navigation>
  );
};

export default Nav;

const Navigation = styled.nav`
  .nav-item {
    cursor: pointer;
    p {
      font-size: 0.7rem;
      margin-bottom: 0;
    }
  }
`;
