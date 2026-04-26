import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import '../styles/Auth.css';
import '../styles/Registration.css';

export default function Registration() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/verify-email');
  };

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
            required
          />
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
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
