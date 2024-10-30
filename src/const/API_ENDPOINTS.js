const BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    GET_ALL_BLOGS: `${BASE_URL}/api/posts/posts`,
    GET_ALL_COMMENTS:(id)=> `${BASE_URL}/api/comments/post/${id}`,
    CREATE_COMMENT: (postId)=> `${BASE_URL}/api/comments/post/${postId}`,
};