import React from "react";
import { useState } from "react";

// npm packages
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";

// API
import { registerUrl } from "../api";
import { Navigate } from "react-router-dom";

const cookies = new Cookies();
export const Register = () => {
  const {
    currentUser: { token },
  } = useSelector((state) => state.users);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getData = (event) => {
    event.preventDefault();
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) return;
    const register = async (userInfo) => {
      const registerResponse = await axios.post(registerUrl(), userInfo);

      console.log(registerResponse.data);
    };
    register({
      firstName,
      lastName,
      email,
      password,
    });
  };
  if (cookies.get("token")) return <Navigate replace to="/" />;

  return (
    <RegisterForm onSubmit={getData}>
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        onChange={(event) => setFirstName(event.target.value)}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        onChange={(event) => setLastName(event.target.value)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <button type="submit">Register</button>
    </RegisterForm>
  );
};

const RegisterForm = styled(motion.form)`
  max-width: 80%;
  input,
  button {
    display: block;
    margin: 0.8rem;
    width: 100%;
  }
`;
