const baseUrl = "http://192.168.1.7:3303";

export const rootUrl = () => baseUrl;
// user
export const loginUrl = () => `${baseUrl}/login`;
export const registerUrl = () => `${baseUrl}/register`;
export const logoutUrl = () => `${baseUrl}/logout`;
export const singleUserUrl = (id) => `${baseUrl}/user/${id}`;

// post
export const addPostUrl = () => `${baseUrl}/post`;
export const publicPostsUrl = () => `${baseUrl}/publicPost`;
export const privatePostsUrl = () => `${baseUrl}/loggedInPosts`;
export const singlePostUrl = (id) => `${baseUrl}/post/${id}`;
export const singlePublicPostUrl = (id) => `${baseUrl}/publicPost/${id}`;
