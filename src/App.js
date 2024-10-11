import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginSignup from "./pages/LoginSignup";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginSignup isLogin={true} />} />
                <Route path="/signup" element={<LoginSignup isLogin={false} />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
