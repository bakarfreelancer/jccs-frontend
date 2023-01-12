import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { privatePostsUrl, publicPostsUrl } from "../api";
import { PostCard } from "./PostCard";
import { getPosts, updatePage, setLastList } from "../features/post/postSlice";

export const Posts = () => {
  const postsRef = useRef();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.currentUser?.token);
  const posts = useSelector((state) => state?.posts.posts);
  const page = useSelector((state) => state?.posts?.page);
  const lastList = useSelector((state) => state?.posts?.lastList);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(null);

  useEffect(() => {
    const scrollPosition = localStorage.getItem("scrollPosition");
    postsRef.current.scrollTop = scrollPosition;
  }, []);

  // Scroll Pagination Listner
  const postsScroll = () => {
    if (postsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = postsRef.current;
      localStorage.setItem("scrollPosition", scrollTop);
      if (
        scrollTop + clientHeight === scrollHeight &&
        !isLoading &&
        !lastList
      ) {
        dispatch(updatePage());
        fetchData();
      }
    }
  };

  // API Call
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = token
        ? await axios.post(
            privatePostsUrl(),
            { page: page + 1 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        : await axios.post(publicPostsUrl(), { page: page + 1 });
      dispatch(getPosts(response.data));
      !response?.data?.length && dispatch(setLastList(true));
    } catch (error) {
      // setError("Internal server error occured, try again!");
      setError(JSON.stringify(error));
    }
    setLoading(false);
  };
  useEffect(() => {
    if (page === -1) {
      fetchData();
      dispatch(updatePage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return error ? (
    <div>{error}</div>
  ) : (
    <div
      onScroll={postsScroll}
      style={{ height: "100vh", overflowY: "auto" }}
      ref={postsRef}>
      {posts.map((post, i) => {
        return <PostCard post={post} key={i} />;
      })}
      {isLoading && <h4>Loading...</h4>}
      {lastList && <h4>No more posts</h4>}
    </div>
  );
};
