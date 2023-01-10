import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { House, PencilSquare, Person } from "react-bootstrap-icons";
import styled from "styled-components";

const Nav = () => {
  const pathname = useLocation().pathname;
  const token = useSelector((state) => state?.currentUser?.currentUser?.token);
  return (
    <Navigation className=" navbar fixed-bottom navbar-expand-lg bg-body-tertiary bg-light">
      <ul className="container col-12 col-md-6 list-unstyled d-flex justify-content-between my-0">
        <li className="nav-item px-2">
          <Link
            className={
              pathname === "/"
                ? "nav-link text-center current"
                : "nav-link text-center"
            }
            to="/">
            <House size={25} />
            <p>Home</p>
          </Link>
        </li>
        {token && (
          <li className="nav-item">
            <Link
              className={
                pathname.startsWith("/addpost")
                  ? "text-center current nav-link"
                  : "nav-link text-center"
              }
              to="/addpost">
              <PencilSquare size={25} />
              <p>Add Post</p>
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link
            className={
              pathname.startsWith("/account")
                ? "text-center current nav-link"
                : "nav-link text-center"
            }
            to="account">
            <Person size={25} />
            <p>Account</p>
          </Link>
        </li>
      </ul>
    </Navigation>
  );
};

export default Nav;

const Navigation = styled.nav`
  a > p {
    font-size: 0.8rem;
    margin-bottom: 0;
  }
`;
