import React, { useState } from "react";

// npm packages
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
// custom imports
import { loginUrl } from "../api";
import { loggedIn } from "../features/user/userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const token = useSelector((state) => state?.currentUser?.currentUser?.token);
  const login = async (event) => {
    event.preventDefault();
    setError("");
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post(loginUrl(), { email, password });

      if (response.status === 200) {
        dispatch(loggedIn(response.data));
        navigate("/");
      }
    } catch (e) {
      if (e?.response?.status === 400) setError("Email or password is wrong.");
      else setError("Internal error occured, please try again.");
    }
  };
  if (token) return <Navigate replace to="/" />;
  else
    return (
      <div className="card p-4 my-5 col-11 col-md-5 col-sm-10 mx-auto">
        <h1 className="text-primary">Register</h1>
        <hr />
        {error && <div className="alert alert-danger">{error}</div>}

        <LoginForm onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="email"
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <div className="row">
            <div className=" col text-end order-2">
              <button
                className="btn btn-accent btn-primary text-light fs-5 text-end"
                type="submit">
                Login
              </button>
            </div>
            <Link to="/register" className="col order-1">
              Don't have account? Register
            </Link>
          </div>
        </LoginForm>
      </div>
    );
};

const LoginForm = styled(motion.form)``;
