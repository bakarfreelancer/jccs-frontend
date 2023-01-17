import axios from "axios";
import Purifier from "html-purify";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { rootUrl, singlePostUrl, singlePublicPostUrl } from "../api";
import { Loading } from "../components/Loading";
import { datetime } from "../utils/date-time";
import user from "../images/user.png";

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
    <Artilce className="container my-2 ">
      <div className="w-100 mx-auto">
        <div className="row justify-content-between align-items-center">
          <div className="col-1" role="button" onClick={() => navigate(-1)}>
            <ArrowLeft size={30} className="icon-primary" />
          </div>
          <h1 className="col-10 text-capitalize text-center">{post.title}</h1>
          <div className="col-1"></div>
        </div>
        <hr />
        {post.image && (
          <img
            className="featured w-100 d-block mx-auto"
            src={rootUrl() + post.image}
            alt={post.title}
          />
        )}
        <div className="p-2">
          <b>Posted: </b>
          <small>{datetime(post.date)}</small>
        </div>
        {post.content && (
          <div
            className="my-2"
            dangerouslySetInnerHTML={{ __html: purifier.purify(post.content) }}
          />
        )}
        <div
          className="card p-3 my-2"
          role="button"
          onClick={() => (token ? navigate(`/user/${post.author._id}`) : null)}>
          <h4>Author:</h4>
          <div className="row align-items-center">
            <div className="col-3">
              <img
                className="rounded-circle w-100"
                src={post.author.image ? rootUrl() + post.author.image : user}
                alt={post.author.firstName}
              />
            </div>
            <div className="col-9">
              <b className="text-primary">
                {post.author.firstName} {post.author.lastName}
              </b>
              <p>{post.author.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Artilce>
  );
};
const Artilce = styled.article`
  > div {
    max-width: 800px;
  }
  .featured {
    max-width: 620px;
  }
`;
