const baseUrl = "http://localhost:3303";

export const loginUrl = () => `${baseUrl}/login`;
export const registerUrl = () => `${baseUrl}/register`;
export const logoutUrl = () => `${baseUrl}/logout`;
export const addPostUrl = () => `${baseUrl}/post`;
export const publicPostsUrl = () => `${baseUrl}/publicPost`;
export const privatePostsUrl = () => `${baseUrl}/loggedInPosts`;
export const singlePostUrl = (id) => `${baseUrl}/post/${id}`;
export const singlePublicPostUrl = (id) => `${baseUrl}/publicPost/${id}`;
