import React, {useState} from 'react';
import './LoginSignup.scss';
import {loginUser, registerUser} from "../service/AuthService";
import Alert from "../components/Alert";
import {useNavigate} from "react-router-dom";


const LoginSignup = ({isLogin}) => {
    return (
        <div className="container">
            <div className={`column left ${isLogin ? 'login' : 'signup'}`}>
                {isLogin ? <h1>Welcome Again!</h1> : <SignupForm/>}
            </div>
            <div className={`column right ${isLogin ? 'login' : 'signup'}`}>
                {isLogin ? <LoginForm/> : <h1>Join With Us</h1>}
            </div>
        </div>
    );
};

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [alertMessage, setAlertMessage] = useState(''); // Alert message state
    const [alertType, setAlertType] = useState(''); // 'success' or 'error'
    const [loading, setLoading] = useState(false);

    // Clear form after submission
    const clearForm = () => {
        setFormData({
            email: "",
            password: "",
        });
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form behavior (page refresh)
        setAlertMessage('');
        setAlertType('');
        setLoading(true);

        try {
            // Pass the formData object to the loginUser function
            const response = await loginUser(formData);

            // Store the token in localStorage
            localStorage.setItem("token", response.token);

            // Display success message
            setAlertMessage(response.message || "Login successful!");
            setAlertType("success");

            // Clear form after successful login
            clearForm();

            // Redirect to another page, e.g., dashboard
            window.location.href = "/dashboard";
        } catch (error) {
            // Display error message
            setAlertMessage(error.message || "Login failed.");
            setAlertType("error");
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };

    return (
        <>
            {/* Alert Component */}
            <Alert
                message={alertMessage}
                type={alertType}
                onClose={() => setAlertMessage('')}
            />

            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Please enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Please enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="signup-text">
                    Don't have an account? <span onClick={() => window.location.href = "/signup"}>Sign Up</span>
                </p>
            </form>
        </>
    );
};



const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const [alertMessage, setAlertMessage] = useState(""); // Alert message state
    const [alertType, setAlertType] = useState(""); // 'success' or 'error'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const clearForm = () => {
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlertMessage(""); // Reset alert message
        setAlertType("");

        if (formData.password !== formData.confirmPassword) {
            setAlertMessage("Passwords do not match!");
            setAlertType("error");
            return;
        }

        try {
            const response = await registerUser(formData);
            localStorage.setItem("user", JSON.stringify(response));
            setAlertMessage(response.message);
            setAlertType("success");
            clearForm();
            navigate("/login");
        } catch (error) {
            setAlertMessage(error.message);
            setAlertType("error");
        }
    };

    return (
        <>
            {/* Alert Component */}
            <Alert
                message={alertMessage}
                type={alertType}
                onClose={() => setAlertMessage('')}
            />

            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Please enter username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Please enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Please enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Please confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit">Sign Up</button>
                <p className="login-text">
                    Already have an account? <span onClick={() => window.location.href = "/login"}>Login</span>
                </p>
            </form>
        </>
    );
};

export default LoginSignup;
