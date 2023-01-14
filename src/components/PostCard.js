import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { rootUrl } from "../api";
import user from "../images/user.png";

export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const navigateToSinglePost = (postID) => {
    navigate(`/post/${postID}`);
  };

  // Time format
  const now = new Date();
  const postDate = new Date(post.date);
  const difference = now - postDate;
  const hours = Math.floor(difference / 3600000);
  const minutes = Math.floor(difference / 60000);
  const days = Math.floor(difference / 86400000);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date =
    minutes < 6
      ? `${minutes} m.`
      : hours < 24
      ? `${hours} h.`
      : days < 30
      ? `${days} d.`
      : postDate.toLocaleDateString("en-GB", options) + ".";

  console.log(post.author);
  return (
    <Card
      role="button"
      onClick={() => navigateToSinglePost(post._id)}
      className="card m-2 p-3">
      <div className="d-flex align-items-center author">
        <div className="pe-2">
          <img
            src={post.author.image ? rootUrl() + post.author.image : user}
            alt="Author"
            className="rounded-circle"
          />
        </div>
        <div>
          <p className="m-0">
            {post.author.firstName + " " + post.author.lastName}
          </p>
          <small className="m-0">{date}</small>
        </div>
      </div>

      <h3 className="fs-5 pt-2 ps-1">{post.title}</h3>

      {post.image && (
        <img className="w-100" src={rootUrl() + post.image} alt={post.title} />
      )}
    </Card>
  );
};
const Card = styled.div`
  .author {
    img {
      max-width: 40px;
    }
  }
`;
