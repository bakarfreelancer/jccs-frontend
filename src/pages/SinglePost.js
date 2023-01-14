import axios from "axios";
import Purifier from "html-purify";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { rootUrl, singlePostUrl, singlePublicPostUrl } from "../api";
import { Loading } from "../components/Loading";

export const SinglePost = () => {
  const navigate = useNavigate();
  const purifier = new Purifier();
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state?.currentUser?.token);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = token
          ? await axios.get(singlePostUrl(id), {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await axios.get(singlePublicPostUrl(id), {});
        setPost(response.data);
        console.log(response.data);
      } catch (e) {
        e.response.status === 404
          ? setError("Post not found!")
          : setError("Internal server error occured, try again!");
      }
      setLoading(false);
    };
    fetchData();
  }, [id, token]);
  if (isLoading) return <Loading size={5} />;
  if (error)
    return (
      <div className="container my-3">
        <div className="alert alert-danger">
          <ArrowLeft
            size={30}
            onClick={() => navigate(-1)}
            className="icon-primary"
          />
          &nbsp; {error}
        </div>
      </div>
    );
  return (
    <article className="container my-2">
      <div className="row justify-content-between align-items-center">
        <h1 className="col-auto text-capitalize">{post.title}</h1>
        <div className="col-auto" onClick={() => navigate(-1)}>
          <ArrowLeft size={30} className="icon-primary" />
        </div>
      </div>
      {post.image && (
        <img className="w-100" src={rootUrl() + post.image} alt={post.title} />
      )}
      {post.content && (
        <div
          dangerouslySetInnerHTML={{ __html: purifier.purify(post.content) }}
        />
      )}
    </article>
  );
};
