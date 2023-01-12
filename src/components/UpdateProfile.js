import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { rootUrl, singleUserUrl } from "../api";
import { updateUser } from "../features/user/userSlice";

export const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.currentUser);
  const { user } = currentUser;
  const token = currentUser?.token;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState(user.description);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getData = async (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setError("");

    if (image && image?.size / (1024 * 1024) > 5) {
      setError("Image size must be less that 5Mb.");
      return;
    } else if (image && !image.type.startsWith("image/")) {
      setError("Only image type file is allowed");
      return;
    }
    const formData = new FormData();
    firstName !== user.firstName && formData.append("firstName", firstName);
    lastName !== user.lastName && formData.append("lastName", lastName);
    email !== user.email && formData.append("email", email);
    description !== user.description &&
      formData.append("description", description);
    image &&
      !user.image.endsWith(image.name.toLowerCase().split(" ").join("-")) &&
      formData.append("image", image);

    try {
      const response = await axios.patch(singleUserUrl(user._id), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateUser(response.data));

      if (response?.status === 200) setSuccess("Account updated successfully!");
    } catch (e) {
      console.log(e);
      if (e?.response?.data?.keyPattern?.email)
        setError("Email already exists use another email.");
      else if (e?.response?.data?.errors?.password)
        setError("Password is too short, minimum 8 characters are allowed.");
      else setError("Opps! Server is unable to handle request try again.");
    }
  };

  if (!token) return <Navigate replace to="/" />;
  return (
    <div className="container">
      <div className="card p-4 my-5 col-lg-5 col-12 col-md-7 col-sm-12 mx-auto">
        <button onClick={() => navigate(-1)}>Back</button>
        <h1 className="text-primary">Update Profile</h1>
        <hr />
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <UserUpdateForm onSubmit={getData}>
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
          <div className="row align-items-center">
            <div className="col">
              <label htmlFor="image" className="form-label">
                Profile:
              </label>
              <input
                className="form-control"
                type="file"
                id="image"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </div>
            <div className="pb-3 col">
              <img
                className="d-block w-100"
                alt="Profile-img"
                src={
                  typeof image !== "string"
                    ? URL.createObjectURL(image)
                    : rootUrl() + user.image
                }
              />
            </div>
          </div>
          <div className="pb-3">
            <label className="form-label d-block" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              className="from-control w-100"
              rows="8"
              placeholder="Description"
              onChange={(event) => setDescription(event.target.value)}
              value={description}></textarea>
          </div>
          <div className=" col text-end">
            <button
              type="submit"
              className="btn btn-primary text-light fs-5 text-end">
              Update
            </button>
          </div>
        </UserUpdateForm>
      </div>
    </div>
  );
};

const UserUpdateForm = styled(motion.form)``;
