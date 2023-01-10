import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { privatePostsUrl, publicPostsUrl } from "../api";
import { PostCard } from "./PostCard";
import { getPosts } from "../features/post/postSlice";

export const Posts = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.currentUser?.currentUser?.token);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [lastList, setLastList] = useState(false);
  const [isLoading, setLoading] = useState(null);
  const postsRef = useRef();

  const postsScroll = () => {
    if (postsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = postsRef.current;
      if (
        scrollTop + clientHeight === scrollHeight &&
        !isLoading &&
        !lastList
      ) {
        setPage(page + 1);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await setLoading(true);
      try {
        const response = token
          ? await axios.post(
              privatePostsUrl(),
              { page },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          : await axios.post(publicPostsUrl(), { page });
        setPosts([...posts, ...response.data]);
        dispatch(getPosts(response.data));
        !response?.data?.length && setLastList(true);
      } catch (error) {
        setError("Internal server error occured, try again!");
      }
      await setLoading(false);
    };
    fetchData();
  }, [page]);

  const statePosts = useSelector((state) => state?.posts);
  console.log(statePosts);

  return error ? (
    <div>Unexpected Error Occur</div>
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
