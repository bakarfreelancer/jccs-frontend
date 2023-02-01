import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { privatePostsUrl, publicPostsUrl } from "../api";
import { PostCard } from "./PostCard";
import {
  getPosts,
  updatePage,
  setLastList,
  resetState,
  setPostsRef,
} from "../features/post/postSlice";
import styled from "styled-components";
import { Loading } from "./Loading";
import PullToRefresh from "react-simple-pull-to-refresh";

export const Posts = () => {
  const postsRef = useRef();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.currentUser?.token);
  const posts = useSelector((state) => state?.posts.posts);
  const page = useSelector((state) => state?.posts?.page);
  const lastList = useSelector((state) => state?.posts?.lastList);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(null);

  // Store Postsref in Redux state
  useEffect(() => {
    dispatch(setPostsRef(postsRef.current));
  }, [postsRef, dispatch]);

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
        scrollTop + clientHeight > scrollHeight - 200 &&
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
    setError("");
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
      setError("Internal server error occured, try again!");
    }
    setLoading(false);
  };

  // Pull to refresh handler
  const handleRefresh = async () => {
    dispatch(resetState());
  };

  useEffect(() => {
    if (page === -1) {
      fetchData();
      dispatch(updatePage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  console.log(isLoading);
  if (error)
    return (
      <div className="alert alert-danger my-2" ref={postsRef}>
        {error}
      </div>
    );
  if (isLoading && page === -1) return <Loading size={5} />;
  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PostsWraper onScroll={postsScroll} ref={postsRef}>
        {posts.map((post, i) => {
          return <PostCard post={post} key={i} />;
        })}
        {isLoading && (
          <>
            <Loading size={2} />
          </>
        )}
        {lastList && (
          <h4 className="text-center text-primary">No more posts</h4>
        )}
      </PostsWraper>
    </PullToRefresh>
  );
};

const PostsWraper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 103px);
`;
