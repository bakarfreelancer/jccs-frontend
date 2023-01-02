import React, { useState } from "react";
import styled from "styled-components";

export const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [visibility, setVisibility] = useState("");
  const [status, setStatus] = useState("");
  const handleForm = async (event) => {
    event.preventDefault();

    console.log(title, body, image, visibility, status);
  };

  return (
    <>
      <h1>New Post</h1>
      <PostForm className="col-6" onSubmit={handleForm}>
        <input
          className="form-control"
          type="text"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          className="form-control"
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(event) => setBody(event.target.value)}></textarea>
        <input type="file" onChange={(event) => setImage(event.target.value)} />
        <select onChange={(event) => setVisibility(event.target.value)}>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <select onChange={(event) => setStatus(event.target.value)}>
          <option value="published">Private</option>
          <option value="public">Public</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </PostForm>
    </>
  );
};

const PostForm = styled.form``;
