import axios from "axios";
import React, { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { feedbackUrl } from "../api";

export const Feedback = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendFeedback = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post(feedbackUrl(), {
        name,
        email,
        message,
      });
      setName("");
      setEmail("");
      setMessage("");

      if (response?.status === 201) setSuccess("Thanks for your feedback!");
    } catch (e) {
      setError("Unexpected error occur, please try again!");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };
  return (
    <div className="container">
      <div className="card p-4 my-5 col-lg-5 col-12 col-md-7 col-sm-12 mx-auto">
        <div className="row align-items-center">
          <div className="col-auto" role="button" onClick={() => navigate(-1)}>
            <ArrowLeft size={30} className="icon-primary" />
          </div>
          <h1 className="text-primary col-auto fs-2">Feedback</h1>
        </div>
        <hr />
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <FeedbackForm onSubmit={sendFeedback}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Your name
            </label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
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

          <div className="pb-3">
            <label className="form-label d-block" htmlFor="message">
              Feedback:
            </label>
            <textarea
              id="message"
              className="from-control w-100"
              rows="8"
              placeholder="Feedback"
              onChange={(event) => setMessage(event.target.value)}
              value={message}></textarea>
          </div>

          <div className=" col text-end order-2">
            <button
              type="submit"
              className="btn btn-accent btn-primary text-light fs-5 text-end">
              Submit
            </button>
          </div>
        </FeedbackForm>
      </div>
    </div>
  );
};

const FeedbackForm = styled.form``;
