import React from 'react';
import './LoginSignup.scss';

const LoginSignup = ({ isLogin }) => {
    return (
        <div className="container">
            <div className={`column left ${isLogin ? 'login' : 'signup'}`}>
                {isLogin ? <h1>Welcome Again!</h1> : <SignupForm />}
            </div>
            <div className={`column right ${isLogin ? 'login' : 'signup'}`}>
                {isLogin ? <LoginForm /> : <h1>Join With Us</h1>}
            </div>
        </div>
    );
};

const LoginForm = () => (
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
            Don't have an account? <span onClick={() => window.location.href = "/signup"}>Sign Up</span>
        </p>
    </form>
);

const SignupForm = () => (
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
            Already have an account? <span onClick={() => window.location.href = "/login"}>Login</span>
        </p>
    </form>
);

export default LoginSignup;
