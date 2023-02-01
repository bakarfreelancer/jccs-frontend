import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { rootUrl } from "../api";
import user from "../images/user.png";
import { datetime } from "../utils/date-time";

export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const navigateToSinglePost = (postID) => {
    navigate(`/post/${postID}`);
  };
  const date = datetime(post.date);
  return (
    <Card
      role="button"
      onClick={() => navigateToSinglePost(post._id)}
      className="card m-2 p-3">
      <div className="d-flex align-items-center author">
        <img
          src={post.author.image ? rootUrl() + post.author.image : user}
          alt="Author"
          className="rounded-circle me-2"
        />

        <div>
          <p className="m-0">
            {post.author.firstName + " " + post.author.lastName}
          </p>
          <small className="m-0">{date}</small>
        </div>
      </div>

      <h3 className="fs-5 pt-2 ps-1">{post.title}</h3>

      {post.image && (
        <img
          className="w-100 post-thumbnail"
          src={rootUrl() + post.image}
          alt={post.title}
        />
      )}
    </Card>
  );
};
const Card = styled.div`
  .author {
    img {
      object-fit: cover;
      width: 50px;
      height: 50px;
    }
  }
  .post-thumbnail {
    aspect-ratio: 4/3;
    object-fit: contain;
  }
`;
