import React from "react";
import { myPostsUrl } from "../api";
import { UserPostArchive } from "../components/UserPostsArchive";

export const UserPosts = () => {
  return (
    <UserPostArchive pageTitle="My Published Posts" queryUrl={myPostsUrl()} />
  );
};
