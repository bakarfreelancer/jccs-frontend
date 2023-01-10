import axios from "axios";
import Purifier from "html-purify";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { singlePostUrl, singlePublicPostUrl } from "../api";

export const SinglePost = () => {
  const navigate = useNavigate();
  const purifier = new Purifier();
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state?.currentUser?.currentUser?.token);

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
        console.log(e.response.status);
        e.response.status === 404
          ? setError("Post not found!")
          : setError("Internal server error occured, try again!");
        // if(e)
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(singlePublicPostUrl(id));
  console.log(post);
  if (isLoading) return <div>Loading...</div>;
  else
    return error ? (
      <div className="alert alert-danger">{error}</div>
    ) : (
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <h1>{post.title}</h1>

        {post.image && (
          <img className="w-100" src={post.image} alt={post.title} />
        )}
        {post.content && (
          <div
            dangerouslySetInnerHTML={{ __html: purifier.purify(post.content) }}
          />
        )}
      </div>
    );
};
