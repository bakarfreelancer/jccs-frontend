import React from "react";

// npm packages
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "universal-cookie";
// custom imports
import { loginUrl } from "../api";
import { loginUser } from "../actions/usersAction";

const cookies = new Cookies();
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const loginReq = async (credentials) => {
      const response = await axios.post(loginUrl(), credentials);

      if (response.status === 200) {
        dispatch(loginUser(response.data));
        cookies.set("currentUser", response.data);
        navigate("/");
      }
    };
    loginReq({ email, password });
  };
  if (cookies.get("currentUser")) return <Navigate replace to="/" />;
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
