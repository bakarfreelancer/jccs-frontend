import React from "react";

// npm packages
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
// custom imports
import { loginUrl } from "../api";
import { loggedIn } from "../features/user/userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.currentUser?.currentUser?.token);
  const login = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const response = await axios.post(loginUrl(), { email, password });

    if (response.status === 200) {
      dispatch(loggedIn(response.data));
      navigate("/");
    }
  };
  if (token) return <Navigate replace to="/" />;
  else
    return (
      <div className="row">
        <h1>Login</h1>
        <LoginForm className="col-3" onSubmit={login}>
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </LoginForm>
      </div>
    );
};

const LoginForm = styled(motion.form)``;
