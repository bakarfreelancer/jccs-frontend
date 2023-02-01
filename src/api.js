const baseUrl = "http://192.168.1.5:3303";
// const baseUrl = "http://localhost:3303";

export const rootUrl = () => baseUrl;
// user
export const loginUrl = () => `${baseUrl}/login`;
export const registerUrl = () => `${baseUrl}/register`;
export const logoutUrl = () => `${baseUrl}/logout`;
export const singleUserUrl = (id) => `${baseUrl}/user/${id}`;
export const communityUrl = () => `${baseUrl}/community`;
export const updatePassUrl = () => `${baseUrl}/updatePassword`;

// post
export const addPostUrl = () => `${baseUrl}/post`;
export const publicPostsUrl = () => `${baseUrl}/publicPost`;
export const privatePostsUrl = () => `${baseUrl}/loggedInPosts`;
export const singlePostUrl = (id) => `${baseUrl}/post/${id}`;
export const singlePostEditUrl = (id) => `${baseUrl}/post-edit/${id}`;
export const singlePublicPostUrl = (id) => `${baseUrl}/publicPost/${id}`;
export const myPostsUrl = () => `${baseUrl}/my-posts`;
export const myDraftsUrl = () => `${baseUrl}/my-drafts`;

// feedback
export const feedbackUrl = () => `${baseUrl}/feedback`;
