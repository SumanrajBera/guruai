import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import '../styles/Auth.css';
import '../styles/Registration.css';
import useAuth from '../hooks/auth'
import { useEffect } from 'react';

export default function Registration() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(username, email, password)
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', theme);
  }, [])

  return (
    <div className="auth-wrapper">
      <div className="auth-container register-content">
        <h1 className="register-title">Join GuruAI</h1>
        <p className="register-subtitle">Create your account and start exploring</p>

        <form onSubmit={handleRegister} className="register-form">
          <Input
            id="name"
            label="Username"
            type="text"
            placeholder="JaneDoe"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
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

          <div className="register-form-action">
            <Button type="submit" fullWidth>
              Register
            </Button>
          </div>
        </form>

        <div className="register-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
