import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import '../styles/Auth.css';
import '../styles/EmailVerification.css';
import useAuth from '../hooks/auth';

export default function EmailVerification() {
  const navigate = useNavigate()
  const { verfiyEmail } = useAuth()
  const { identifier } = useParams()
  function resendEmail() {
    verfiyEmail(identifier)
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', theme);
  }, [])

  return (
    <div className="auth-wrapper">
      <div className="auth-container verification-content">
        <div className="verification-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>

        <h1 className="verification-title">Check your email</h1>

        <p className="verification-text">
          Your account has not been verified yet. We've sent a verification link to your email address. Please click the link to activate your account.
        </p>

        <Button onClick={() => { resendEmail() }} fullWidth>
          Resend Verification Email
        </Button>

        <div className="verification-footer">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
