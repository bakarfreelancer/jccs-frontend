import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Trash3 } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { deletePost } from "../utils/posts-request";

export const UserPostArchive = ({ pageTitle, queryUrl }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.currentUser);
  const token = currentUser?.token;
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [del, setDel] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [lastPage, setLastPage] = useState(false);

  const getPosts = async (page) => {
    setError("");
    try {
      const response = await axios.get(`${queryUrl}/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data.length) setLastPage(true);
      setPosts([...posts, ...response.data]);
    } catch (e) {
      setError("Unable to get posts.");
      setTimeout(() => setError(""), 3000);
    }
  };
  useEffect(() => {
    getPosts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, queryUrl]);

  const handleDelete = async () => {
    const response = await deletePost(del?.id, token);
    response.status === 200
      ? setSuccess("Post deleted successfully!")
      : setError("Error occured while deleting post");

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };

  // Load more posts
  const loadMore = () => {
    getPosts(page + 1);
    setPage(page + 1);
    console.log(page);
  };

  if (!token) return <Navigate to="/" />;
  return (
    <div className="container my-2">
      <div className="row align-items-center text-primary">
        <div className="col-1" role="button" onClick={() => navigate(-1)}>
          <ArrowLeft size={30} />
        </div>
        <h2 className="col-10 text-capitalize">{pageTitle}</h2>
        <div className="col-1"></div>
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <hr />
      {posts.map((post, i) => {
        return (
          <div className="border-bottom p-1 m-1 row " key={i} role="button">
            <h4
              className="col-11 text-capitalize"
              role="button"
              onClick={() => navigate(`/edit/${post._id}`)}>
              {post.title}
            </h4>
            <div className="col-1">
              {/* Button trigger modal */}
              <Trash3
                size={20}
                type="button"
                className="text-danger"
                data-bs-toggle="modal"
                data-bs-target="#deletePostModal"
                onClick={() => setDel({ title: post.title, id: post._id })}
              />
            </div>
          </div>
        );
      })}

      <div className="text-center p-2">
        {lastPage ? (
          <div className="fs-4">No more posts</div>
        ) : (
          <button
            onClick={() => loadMore()}
            className="btn btn-primary btn-accent">
            Load more...
          </button>
        )}
      </div>

      {/* Modal  */}
      <div
        className="modal fade"
        id="deletePostModal"
        tabIndex="-1"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deletePostModalLabel">
                Confirm Delete?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>Are you sure to delete this post?</div>
              <div className="text-capitalize">
                <b>Title: </b>
                {del?.title}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal">
                Go Back
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                data-bs-dismiss="modal">
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
