import axios from "axios";
import { singlePostUrl } from "../api";

// Delete Post
export const deletePost = async (id, token) => {
  try {
    return await axios.delete(singlePostUrl(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    return e;
  }
};
