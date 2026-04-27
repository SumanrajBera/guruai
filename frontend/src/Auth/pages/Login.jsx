import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import '../styles/Auth.css';
import '../styles/Login.css';
import useAuth from '../hooks/auth';

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setidentifier] = useState()
  const [password, setPassword] = useState()
  const { loginUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(identifier, password)
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container login-content">
        <h1 className="login-title">GuruAI</h1>
        <p className="login-subtitle">Welcome back to the intelligent companion</p>

        <form onSubmit={handleLogin} className="login-form">
          <Input
            id="email"
            label="Email Address or Username"
            type="text"
            placeholder="name@example.com or johndoe"
            onChange={(e) => setidentifier(e.target.value)}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* <div className="login-forgot">
            <a href="#">Forgot password?</a>
          </div> */}

          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}
