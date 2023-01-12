import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Login } from "../components/Login";

export const Account = () => {
  const token = useSelector((state) => state?.currentUser?.token);
  return !token ? (
    <Login />
  ) : (
    <div>
      <h1>Account</h1>
      <Link to="/logout">Logout</Link>
      <br />
      <Link to="/update-profile">Update profile</Link>
    </div>
  );
};
