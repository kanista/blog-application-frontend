import React, { useState } from 'react';
import './LoginSignup.scss';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin); // Toggle between login and signup
    };

    return (
        <div className="container">
            <div className={`column left ${isLogin ? 'login' : 'signup'}`}>
                {isLogin ? <h1>Welcome Again!</h1> : <SignupForm toggleForm={toggleForm} />}
            </div>
            <div className={`column right ${isLogin ? 'login' : 'signup'}`}>
                {isLogin ?  <LoginForm toggleForm={toggleForm} /> : <h1>Join With Us</h1>}
            </div>
        </div>
    );
};

const LoginForm = ({ toggleForm }) => (
    <form>
        <h2>Login</h2>
        <label>Email</label>
        <input
            type="email"
            placeholder="Please enter email"
            required
            onInvalid={(e) => e.target.setCustomValidity('Please enter a valid email')}
            onInput={(e) => e.target.setCustomValidity('')}
        />
        <label>Password</label>
        <input
            type="password"
            placeholder="Please enter password"
            required
            onInvalid={(e) => e.target.setCustomValidity('Password is required')}
            onInput={(e) => e.target.setCustomValidity('')}
        />
        <button type="submit">Login</button>
        <p className="signup-text">
            Don't have an account? <span onClick={toggleForm}>Sign Up</span>
        </p>
    </form>
);

const SignupForm = ({toggleForm}) => (
    <form>
        <h2>Sign Up</h2>
        <label>User Name</label>
        <input
            type="text"
            placeholder="Please enter username"
            required
            onInvalid={(e) => e.target.setCustomValidity('Username is required')}
            onInput={(e) => e.target.setCustomValidity('')}
        />
        <label>Email</label>
        <input
            type="email"
            placeholder="Please enter email"
            required
            onInvalid={(e) => e.target.setCustomValidity('Please enter a valid email')}
            onInput={(e) => e.target.setCustomValidity('')}
        />
        <label>Password</label>
        <input
            type="password"
            placeholder="Please enter password"
            required
            onInvalid={(e) => e.target.setCustomValidity('Password is required')}
            onInput={(e) => e.target.setCustomValidity('')}
        />
        <label>Confirm Password</label>
        <input
            type="password"
            placeholder="Please confirm password"
            required
            onInvalid={(e) => e.target.setCustomValidity('Passwords must match')}
            onInput={(e) => e.target.setCustomValidity('')}
        />
        <button type="submit">Sign Up</button>
        <p className="login-text">
            Already have an account? <span onClick={toggleForm}>Login</span>
        </p>
    </form>
);

export default LoginSignup;
