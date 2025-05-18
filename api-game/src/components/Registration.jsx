import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Auth.css";

const Registration = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validatePassword = (password) => {
        return password.length >= 8 && /[!@#$%^&*]/.test(password);
    };

    const handleRegister = () => {
        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long and contain one of those symbols !@#$%^&*");
            return;
        }
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Registration successful!");
        navigate("/login"); // redirect to login page
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Registration;
