import React from "react";
import { useNavigate } from "react-router-dom";
import { rootUrl } from "../api";

export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const navigateToSinglePost = (postID) => {
    navigate(`/post/${postID}`);
  };

  return (
    <div
      role="button"
      onClick={() => navigateToSinglePost(post._id)}
      className="card m-2 p-5">
      <i>{post.author.firstName + " " + post.author.lastName}</i>
      <h3 className="p-5">{post.title}</h3>

      {post.image && (
        <img className="w-100" src={rootUrl() + post.image} alt={post.title} />
      )}
      <div>{post.date}</div>
    </div>
  );
};
