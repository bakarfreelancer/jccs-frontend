import axios from "axios";
import React, { useState } from "react";
import { EyeSlash } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { updatePassUrl } from "../api";

export const ChangePassword = () => {
  const currentUser = useSelector((state) => state?.currentUser);
  const token = currentUser?.token;

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const changePassowrd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    try {
      const response = await axios.patch(
        updatePassUrl(),
        { password, oldPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSuccess("Password updated successfuly.");
      }
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response.status === 401)
        setError("Please check you current password and try again.");
      else setError("Unable to change password, try again!");
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
  };

  return (
    <div>
      <div
        className="card p-3 text-center align-items-center text-warning"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#changePasswordModal">
        <EyeSlash size={40} />
        <div>Change Password</div>
      </div>
      {/* CHANGE PASSWORD MODAL */}
      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex="-1"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="changePasswordModalLabel">
                Change Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={changePassowrd}>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="oldPassword"
                    placeholder="Current password"
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
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
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      minLength="8"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal">
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
