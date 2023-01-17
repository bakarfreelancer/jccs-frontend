import React from "react";
import { myDraftsUrl } from "../api";
import { UserPostArchive } from "../components/UserPostsArchive";

export const UserDrafts = () => {
  return <UserPostArchive pageTitle="My Drafts" queryUrl={myDraftsUrl()} />;
};
