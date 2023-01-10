import React from "react";
import { useNavigate } from "react-router-dom";

export const PostCard = ({ post, scrollPosition }) => {
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
        <img className="w-100" src={post.image} alt={post.title} />
      )}
      <div>{post.date}</div>
    </div>
  );
};
