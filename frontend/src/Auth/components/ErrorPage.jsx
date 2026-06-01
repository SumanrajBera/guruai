import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import '../styles/Auth.css';
import '../styles/ErrorPage.css';
import '../styles/Login.css'; // Importing login styles for title/subtitle consistency

const ErrorPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, []);

    return (
        <div className="auth-wrapper">
            <div className="auth-container error-content">
                <h1 className="login-title">GuruAI</h1>
                <p className="login-subtitle">Neural Path Not Found</p>

                <div className="error-illustration">
                    <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="80" stroke="var(--color-outline)" strokeWidth="2" strokeDasharray="8 8" />
                        <path d="M70 80C70 74.4772 74.4772 70 80 70H120C125.523 70 130 74.4772 130 80V120C130 125.523 125.523 130 120 130H80C74.4772 130 70 125.523 70 120V80Z" fill="var(--color-surface-low)" stroke="var(--color-primary)" strokeWidth="4"/>
                        <circle cx="90" cy="95" r="4" fill="var(--color-primary)" />
                        <circle cx="110" cy="95" r="4" fill="var(--color-primary)" />
                        <path d="M85 115C85 115 90 108 100 108C110 108 115 115 115 115" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>
                
                <h2 className="error-code">404</h2>
                <h3 className="error-title">Deep Space Lost</h3>
                <p className="error-message">
                    Even our advanced models couldn't locate this page. It might have been uninstalled from the system.
                </p>

                <div className="error-actions">
                    <Button onClick={() => navigate('/')} fullWidth>
                        Return to Portal
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
