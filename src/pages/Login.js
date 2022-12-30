import React from "react";

// npm packages
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "universal-cookie";

// custom imports
import { loginUrl } from "../api";
import { loginUser } from "../actions/usersAction";
import { useEffect } from "react";

const cookies = new Cookies();
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    currentUser: { token },
  } = useSelector((state) => state.users);

  const login = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const loginReq = async (credentials) => {
      const response = await axios.post(loginUrl(), credentials);

      if (response.status === 200) {
        dispatch(loginUser(response.data));
        cookies.set("token", response.data.token);
        navigate("/");
      }
    };
    loginReq({ email, password });
  };
  if (cookies.get("token")) return <Navigate replace to="/" />;
  else
    return (
      <>
        <h1>Login</h1>
        <LoginForm onSubmit={login}>
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit    ">Login</button>
        </LoginForm>
      </>
    );
};

const LoginForm = styled(motion.form)``;
