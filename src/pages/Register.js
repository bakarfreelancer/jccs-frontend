import React from "react";
import { useState } from "react";

// npm packages
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";

// API
import { registerUrl } from "../api";
import { Link, Navigate } from "react-router-dom";
export const Register = () => {
  const token = useSelector((state) => state?.currentUser?.currentUser?.token);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getData = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(registerUrl(), {
        firstName,
        lastName,
        email,
        password,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfPassword("");
      if (response?.status === 201)
        setSuccess("Your account has been created successfully!");
    } catch (e) {
      // Email exist
      if (e?.response?.data?.keyPattern?.email)
        setError("Email already exists use another email.");
      else if (e?.response?.data?.errors?.password)
        setError("Password is too short, minimum 8 characters are allowed.");
      else setError("Opps! Server is unable to handle request try again.");
    }
  };

  if (token) return <Navigate replace to="/" />;
  return (
    <div className="card p-4 my-5 col-11 col-md-5 col-sm-10 mx-auto">
      <h1 className="text-primary">Register</h1>
      <hr />
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          {success} <Link to="/login">Login Here</Link>
        </div>
      )}
      <RegisterForm onSubmit={getData}>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="firstname" className="form-label">
              First name
            </label>
            <input
              className="form-control"
              type="text"
              name="firstname"
              placeholder="First name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="lastname" className="form-label">
              Last name
            </label>
            <input
              className="form-control"
              type="text"
              name="lastname"
              placeholder="Last name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="you@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength="8"
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="email" className="form-label">
              Confirm password
            </label>
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={confPassword}
              onChange={(event) => setConfPassword(event.target.value)}
              minLength="8"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className=" col text-end order-2">
            <button
              type="submit"
              className="btn btn-accent btn-primary text-light fs-5 text-end">
              Register
            </button>
          </div>
          <Link to="/login" className="col order-1">
            Have account? Login
          </Link>
        </div>
      </RegisterForm>
    </div>
  );
};

const RegisterForm = styled(motion.form)``;
