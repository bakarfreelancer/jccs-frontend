import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { rootUrl, singleUserUrl } from "../api";
import { Loading } from "../components/Loading";
import userImg from "../images/user.png";
import { datetime } from "../utils/date-time";

export const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state?.currentUser?.token);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(singleUserUrl(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.user?.firstName) {
          setUser(response.data.user);
          setPosts(response.data.posts);
        } else {
          setError("User not found");
        }
      } catch (e) {
        setError(
          "Unauthorized! Please login to your account to see user profile."
        );
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <MemberInfo className="container my-3">
      <div className="row justify-content-left align-items-center">
        <div className="col-auto" role="button">
          <ArrowLeft
            size={30}
            onClick={() => navigate(-1)}
            className="icon-primary"
          />
        </div>
        <h3 className="text-primary py-2 col-auto">General</h3>
        <hr />
      </div>
      <div className="row align-items-start">
        <div className="col-12 col-md-3 text-center">
          <img
            className="rounded-circle userImg"
            src={user.image ? rootUrl() + user.image : userImg}
            alt={user.firstName}
          />
        </div>
        <div className="col-12 col-md-9">
          <b className="text-primary">
            {user.firstName} {user.lastName}
          </b>
          <p>{user.description}</p>
        </div>
      </div>
      <hr />
      <div>
        <h3 className="text-primary py-2">Qualification</h3>
      </div>
      <hr />
      <div>
        <h3 className="text-primary py-2">Recent Posts</h3>
        <div className="row g-2">
          {posts.map((post, i) => {
            return (
              <div
                role="button"
                className="col-12 col-sm-6"
                key={i}
                onClick={() => navigate(`/post/${post._id}`)}>
                <div className="border-bottom p-2">
                  <h3 className="text-primary">{post.title}</h3>
                  <div>
                    <span>Published: </span>
                    <small>{datetime(post.date)}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MemberInfo>
  );
};
const MemberInfo = styled.div`
  .userImg {
    width: 130px;
    height: 130px;
    object-fit: cover;
  }
`;
