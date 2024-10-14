import axios from "axios";
import {API_ENDPOINTS} from "../const/API_ENDPOINTS";

// Register a new user
const registerUser = async (user) => {
    try {
        console.log(API_ENDPOINTS.REGISTER)
        const response = await axios.post(API_ENDPOINTS.REGISTER, {
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            name: user.username,
            role: "USER"
        });
        return response.data;
    } catch (error) {
        console.log(error.response);  // Log the full error response
        throw error.response?.data || "Registration failed";
    }
};


// Login an existing user
const loginUser = async (credential) => {
    try {
        console.log(credential.email);
        console.log(credential.password);
        const response = await axios.post(API_ENDPOINTS.LOGIN, {
            email:credential.email,
            password:credential.password
        });
        console.log(response);
        return response.data;
    } catch (error) {
        // Handle error appropriately
        throw error.response?.data || "Login failed";
    }
};

export { registerUser ,loginUser };
