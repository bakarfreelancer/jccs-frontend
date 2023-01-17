import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import styled from "styled-components";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { EditorState } from "draft-js";
import { useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { addPostUrl, rootUrl, singlePostEditUrl, singlePostUrl } from "../api";

import featured from "../images/featured.png";
import { stateFromHTML } from "draft-js-import-html";
import { ArrowLeft } from "react-bootstrap-icons";

export const AddPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const currentUser = useSelector((state) => state?.currentUser);
  const token = currentUser.token;

  const [pageTitle, setPageTitle] = useState("New post");
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [image, setImage] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [status, setStatus] = useState("published");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [oldPost, setOldPost] = useState({});

  useState(() => {
    if (location.pathname !== "addpost" && id) {
      const getPost = async () => {
        setError("");
        try {
          const response = await axios.get(singlePostEditUrl(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response?.data?.title) {
            setOldPost(response.data);
            setPageTitle("Edit post");
            setTitle(response.data.title);
            setEditorState(
              EditorState.createWithContent(
                stateFromHTML(response.data.content)
              )
            );
            setImage(response.data.image);
            setVisibility(response.data.visibility);
            setStatus(response.data.status);
          }
        } catch (e) {
          setError("Post not found!");
        }
      };
      getPost();
    }
  }, []);

  const handleFormAdd = async (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    event.preventDefault();
    setError("");
    setSuccess("");
    const content = stateToHTML(editorState.getCurrentContent());
    if (image && image?.size / (1024 * 1024) > 5) {
      setError("Image size must be less that 5Mb.");
      return;
    } else if (image && !image.type.startsWith("image/")) {
      setError("Only image type file is allowed");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("visibility", visibility);
      formData.append("status", status);
      formData.append("image", image);
      const response = await axios.post(addPostUrl(), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setSuccess("Post is updated successfully.");
      }
      setTitle("");
      setImage("");
      setEditorState(() => EditorState.createEmpty());
      setVisibility("private");
      setStatus("published");
    } catch (e) {
      setError("Opps! Sorry we can't save your post due to unexpected error.");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };

  const handleFormUpdate = async (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    event.preventDefault();
    setError("");
    setSuccess("");
    const content = stateToHTML(editorState.getCurrentContent());
    if (image && typeof image !== "string" && image?.size / (1024 * 1024) > 5) {
      setError("Image size must be less that 5Mb.");
      return;
    } else if (
      image &&
      typeof image !== "string" &&
      !image.type.startsWith("image/")
    ) {
      setError("Only image type file is allowed");
      return;
    }
    try {
      const formData = new FormData();
      title !== oldPost.title && formData.append("title", title);
      content !== oldPost.content && formData.append("content", content);
      visibility !== oldPost.visibility &&
        formData.append("visibility", visibility);
      status !== oldPost.status && formData.append("status", status);
      image !== oldPost.image && formData.append("image", image);

      const response = await axios.patch(
        singlePostUrl(id) + "/" + oldPost.author._id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSuccess("Post is updated successfully.");
      }
    } catch (e) {
      setError("Opps! Sorry we can't save your post due to unexpected error.");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };
  if (!token) return <Navigate replace to="/" />;
  return (
    <div className="container">
      <PostFormWraper className="mx-auto pb-3 px-3">
        <div className="row align-items-center text-primary">
          <div className="col-1" role="button" onClick={() => navigate(-1)}>
            <ArrowLeft className="" size={30} />
          </div>
          <h1 className="pt-2 col-10">{pageTitle}</h1>
          <div className="col-1"></div>
        </div>
        <hr />
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form
          className="col-12"
          onSubmit={
            pageTitle === "Edit post" ? handleFormUpdate : handleFormAdd
          }>
          <input
            className="form-control my-2"
            type="text"
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            required
          />
          <Editor
            dsf
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            editorState={editorState}
            onEditorStateChange={setEditorState}
            placeholder="Enter your content here..."
            toolbar={{
              options: [
                "inline",
                "blockType",
                "list",
                "link",
                "emoji",
                "image",
                "remove",
                "history",
              ],
            }}
          />
          <div className="pb-3">
            {pageTitle === "Edit post" && image ? (
              <img
                className="d-block w-25"
                alt="Featured"
                src={
                  typeof image === "string"
                    ? rootUrl() + image
                    : URL.createObjectURL(image)
                }
              />
            ) : (
              <img
                className="d-block w-25"
                src={image ? URL.createObjectURL(image) : featured}
                alt="Featured"
              />
            )}
            <label htmlFor="image" className="form-label">
              Featured Image:
            </label>
            <input
              className="form-control"
              type="file"
              id="image"
              accept="image/png, image/jpg, image/jpeg"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>
          <div className="row align-items-end">
            <div className="col-6 col-sm-4 pb-3">
              <label className="form-label" htmlFor="visibility">
                Visibility:
              </label>
              <select
                className="form-select"
                id="visibility"
                onChange={(event) => setVisibility(event.target.value)}
                value={visibility}>
                <option value="private">Logged in users</option>
                <option value="public">Public</option>
              </select>
            </div>
            <div className="col-6 col-sm-4 pb-3">
              <label className="form-label" htmlFor="status">
                Status:
              </label>
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}>
                <option value="published">Publish now</option>
                <option value="draft">Save draft</option>
              </select>
            </div>
            <div className="col-12 col-sm-4 pb-3">
              <button type="submit" className="btn btn-primary w-100">
                Update
              </button>
            </div>
          </div>
        </form>
      </PostFormWraper>
    </div>
  );
};

const PostFormWraper = styled.div`
  max-width: fit-content;
`;
