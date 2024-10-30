import axios from "axios";
import { API_ENDPOINTS } from "../const/API_ENDPOINTS";

// Common header generator for requests
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

// Fetch all blog posts
const getAllBlogs = async () => {
    try {
        console.log(getHeaders());
        const response = await axios.get(API_ENDPOINTS.GET_ALL_BLOGS, {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error.response?.data;  // Return the error details if any
    }
};

const getCommentsByPostId = async (postId) => {
    try {
        console.log(getHeaders());
        const response = await axios.get(API_ENDPOINTS.GET_ALL_COMMENTS(postId), {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error.response?.data;  // Return the error details if any
    }
};

const addCommentToPost=async (postId,body)=>{
    try {
        console.log(getHeaders());
        const response = await axios.post(API_ENDPOINTS.CREATE_COMMENT(postId), {
            body: body
        },
        {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error.response?.data;  // Return the error details if any
    }
}

export { getAllBlogs, getCommentsByPostId , addCommentToPost};
